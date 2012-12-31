"use strict";
Ext.define('biglifts.views.531.MoreInfoList', {
    extend: "biglifts.views.MoreInfoList",
    showSettings: function () {
        Ext.getCmp('more').setActiveItem(Ext.getCmp('settings'));
    },
    showOneRepCalculator: function () {
        Ext.getCmp('more').setActiveItem(Ext.getCmp('one-rep-max-calculator'));
    },
    config: {
        id: 'more-info-list',
        itemTpl: new Ext.XTemplate('{[this.getTextForValues(values)]}', {
            getTextForValues: function (values) {
                var textFn = Ext.getCmp('more-info-list').listItems[values.index].textFn;
                return values.text ? values.text : textFn();
            }
        }),
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

                if (biglifts.toggles.Assistance) {
                    this.listItems.push({model: {index: listIndex++, text: '<span class="text">1RM Calculator</span><span class="disclosure"></span>'},
                        handler: Ext.bind(this.showOneRepCalculator, this)});
                }

                this.listItems.push({model: {index: listIndex++, text: '<span class="text">Settings</span><span class="disclosure"></span>'},
                    handler: Ext.bind(this.showSettings, this)});
                this.listItems.push({model: {index: listIndex++, text: '<span class="text">Feedback...</span><span class="disclosure"></span>'},
                    handler: Ext.bind(this.feedback, this)});
                this.listItems.push({model: {index: listIndex++, text: '<span class="text">Reset</span><span class="disclosure"></span>'},
                    handler: Ext.bind(this.showReset, this)});

                var listData = [];
                for (var i = 0; i < this.listItems.length; i++) {
                    listData.push(this.listItems[i].model);
                }

                Ext.define('MoreList', {
                    extend: 'Ext.data.Model',
                    config: {
                        fields: [
                            {name: 'index', type: 'int'},
                            {name: 'text', type: 'string'}
                        ]
                    }
                });
                this.setStore(Ext.create('Ext.data.Store', {
                    model: 'MoreList',
                    data: listData
                }));

                this.addListener('itemtap', Ext.bind(this.listItemTapped, this));
            }
        }
    }
});
