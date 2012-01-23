"use strict";
Ext.ns('wendler.views.log.cards', 'wendler.controller.logEntry');

wendler.controller.logEntry.backToLogList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.controller.logEntry.updateLogEntry = function () {

};

wendler.controller.logEntry.setupLogEntry = function (logRecord) {
    Ext.getCmp('log').setActiveItem('edit-log-entry', {type:'slide', direction:'left'});
    var logTitle = logRecord.data.liftName + " " + wendler.controller.log.formatDate(logRecord.data.date);
    Ext.get('log-entry-field-title').setHTML(logTitle);

    var values = {
        weight: logRecord.data.weight,
        reps: logRecord.data.reps,
        units: logRecord.data.units
    };
    Ext.getCmp('edit-log-entry').setValues(values);
};

wendler.views.log.cards.EditLogEntry = {
    id:'edit-log-entry',
    xtype:'formpanel',
    style:'padding-top:0px',
    bodyStyle:'padding-top:0px',
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.controller.logEntry.backToLogList);
        }
    },
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Edit Entry',
            items:[
                {
                    text:'Cancel',
                    ui:'back',
                    handler:wendler.controller.logEntry.backToLogList
                },
                {xtype:'spacer'},
                {
                    text:'Save',
                    ui:'action',
                    handler:wendler.controller.logEntry.updateLogEntry
                }
            ]
        }
    ],
    items:[
        {
            xtype:'fieldset',
            title:'<div id="log-entry-field-title"></div>',
            style:'margin-top: 0px; margin-bottom: 7px;',
            items:[
                {
                    xtype:'numberfield',
                    label:'Weight',
                    name:'weight'
                },
                {
                    xtype:'numberfield',
                    label:'Reps',
                    name:'reps'
                },
                {
                    xtype:'selectfield',
                    label:'Units',
                    name:'units',
                    options:wendler.settings.options.units
                }
            ]
        },
        {
            xtype:'button',
            text:'Delete',
            ui:'decline'
        }
    ]
};