"use strict";
Ext.ns("biglifts.ss.more");
biglifts.ss.more.getTextForValues = function (values) {
    var textFn = Ext.getCmp('ss-more-info-list').listItems[values.index].textFn;
    return values.text ? values.text : textFn();
};

Ext.define('biglifts.views.ss.MoreInfoList', {
    extend:'biglifts.views.MoreInfoList',
    showSettings:function () {
        Ext.getCmp('ss-more').setActiveItem(Ext.getCmp('ss-settings-form'));
    },
    bindListeners:function () {
        this.addListener('itemtap', this.listItemTapped, this);
    },
    destroyListeners:function () {
        this.removeListener('itemtap', this.listItemTapped, this);
    },
    config:{
        id:'ss-more-info-list',
        itemTpl:'{[biglifts.ss.more.getTextForValues(values)]}',
        listeners:{
            initialize:function () {
                var me = this;
                var listIndex = 0;
                me.listItems = [
                    {model:{index:listIndex++, text:null}, handler:Ext.bind(me.selectRoutine, me), textFn:function () {
                        return '<span class="text">Setup...</span><span class="disclosure"></span>';
                    }}
                ];

                me.listItems.push({model:{index:listIndex++, text:'<span class="text">Settings</span><span class="disclosure"></span>'},
                    handler:Ext.bind(me.showSettings, me)});
                me.listItems.push({model:{index:listIndex++, text:'<span class="text">Feedback...</span><span class="disclosure"></span>'},
                    handler:Ext.bind(me.feedback, me)});
                me.listItems.push({model:{index:listIndex++, text:'<span class="text">Reset</span><span class="warning"></span>'},
                    handler:Ext.bind(me.showReset, me)});

                var listData = [];
                for (var i = 0; i < me.listItems.length; i++) {
                    listData.push(me.listItems[i].model);
                }

                Ext.define('SsMoreList', {
                    extend:'Ext.data.Model',
                    config:{
                        fields:[
                            {name:'index', type:'int'},
                            {name:'text', type:'string'}
                        ]
                    }
                });
                me.setStore(Ext.create('Ext.data.Store', {
                    model:'SsMoreList',
                    data:listData
                }));
            },
            painted:function () {
                if (!this._painted) {
                    this._painted = true;
                    this.bindListeners();
                }
            },
            destroy:function () {
                this.destroyListeners();
            }
        }
    }
});
