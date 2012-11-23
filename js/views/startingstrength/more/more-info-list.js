"use strict";
Ext.ns("biglifts.ss.more");
biglifts.ss.more.getTextForValues = function (values) {
    var textFn = Ext.getCmp('ss-more-info-list').listItems[values.index].textFn;
    return values.text ? values.text : textFn();
};

Ext.define('biglifts.views.ss.MoreInfoList', {
    extend:'Ext.dataview.List',
    selectRoutine:function () {
        Ext.getCmp('app').setActiveItem(Ext.getCmp('routine-chooser'));
    },
    getVersionOsInfo:function () {
        var appVersion = "v" + biglifts.version;
        var os = Ext.os.is.Android ? "Android" : "iOS";
        var phoneVersion = window.device.version;
        return appVersion + "-" + os + " " + phoneVersion;
    },
    feedback:function () {
        var proText = biglifts.premium ? " Pro" : "";
        var subject = "Big Lifts" + proText + ": Feedback";
        location.href = util.email.buildEmailLink("biglifts@stefankendall.com", subject
            + this.getVersionOsInfo());
    },
    listItemTapped:function (c, index) {
        this.deselect(index);
        var handler = this.listItems[index].handler;
        if (typeof(handler) !== 'undefined') {
            handler.call();
        }
    },
    hardReset:function () {
        Ext.Msg.confirm('WARNING', 'Reset ALL data and settings?', function (text) {
            if (text === 'yes') {
                util.filebackup.deleteAllStoreFiles(function () {
                    localStorage.clear();
                    location.href = "index.html";
                });
            }
        });
    },
    config:{
        id:'ss-more-info-list',
        cls:'start-page',
        itemTpl:'{[biglifts.more.getTextForValues(values)]}',
        itemCls:'more-info-row',
        listeners:{
            initialize:function () {
                var listIndex = 0;
                this.listItems = [
                    {model:{index:listIndex++, text:null}, handler:Ext.bind(this.selectRoutine, this), textFn:function () {
                        return '<span class="text">Routine: <span id="routine-text">' +
                            biglifts.stores.Routine.first().get("name") +
                            '</span></span><span class="disclosure"></span>';
                    }}
                ];

                this.listItems.push({model:{index:listIndex++, text:'<span class="text">Feedback...</span><span class="disclosure"></span>'},
                    handler:Ext.bind(this.feedback, this)});
                this.listItems.push({model:{index:listIndex++, text:'<span class="text">Reset</span><span class="warning"></span>'},
                    handler:Ext.bind(this.hardReset, this)});

                var listData = [];
                for (var i = 0; i < this.listItems.length; i++) {
                    listData.push(this.listItems[i].model);
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
                this.setStore(Ext.create('Ext.data.Store', {
                    model:'SsMoreList',
                    data:listData
                }));

                this.addListener('itemtap', Ext.bind(this.listItemTapped, this));
            },
            painted:function () {
                biglifts.navigation.unbindBackEvent()
            }
        },
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                title:'More'
            }
        ]
    }
});
