"use strict";
Ext.ns("biglifts.ss.more");
biglifts.ss.more.getTextForValues = function (values) {
    var textFn = Ext.getCmp('ss-more-info-list').listItems[values.index].textFn;
    return values.text ? values.text : textFn();
};

Ext.define('biglifts.views.ss.MoreInfoList', {
    extend: 'biglifts.views.MoreInfoList',
    showSettings: function () {
        Ext.getCmp('ss-more').setActiveItem(Ext.getCmp('ss-settings'));
    },
    config: {
        id: 'ss-more-info-list',
        itemTpl: '{[biglifts.ss.more.getTextForValues(values)]}',
        listeners: {
            initialize: function () {
                var listIndex = 0;
                this.listItems = [
                    {model: {index: listIndex++, text: null}, handler: Ext.bind(this.selectRoutine, this), textFn: function () {
                        return '<span class="text">Routine: <span id="routine-text">' +
                            biglifts.stores.Routine.first().get("name") +
                            '</span></span><span class="disclosure"></span>';
                    }}
                ];

                this.listItems.push({model: {index: listIndex++, text: '<span class="text">Settings</span><span class="disclosure"></span>'},
                    handler: Ext.bind(this.showSettings(), this)});

                this.listItems.push({model: {index: listIndex++, text: '<span class="text">Feedback...</span><span class="disclosure"></span>'},
                    handler: Ext.bind(this.feedback, this)});
                this.listItems.push({model: {index: listIndex++, text: '<span class="text">Reset</span><span class="warning"></span>'},
                    handler: Ext.bind(this.hardReset, this)});

                var listData = [];
                for (var i = 0; i < this.listItems.length; i++) {
                    listData.push(this.listItems[i].model);
                }

                Ext.define('SsMoreList', {
                    extend: 'Ext.data.Model',
                    config: {
                        fields: [
                            {name: 'index', type: 'int'},
                            {name: 'text', type: 'string'}
                        ]
                    }
                });
                this.setStore(Ext.create('Ext.data.Store', {
                    model: 'SsMoreList',
                    data: listData
                }));

                this.addListener('itemtap', Ext.bind(this.listItemTapped, this));
            }
        }
    }
});
