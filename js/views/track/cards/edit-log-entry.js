"use strict";
Ext.ns('wendler.views.log.cards', 'wendler.controller.logEntry');

wendler.controller.logEntry.backToLogList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.controller.logEntry.updateLogEntry = function () {
    var values = Ext.getCmp('edit-log-entry').getValues();
    wendler.controller.logEntry.currentRecord.set(values);
    wendler.controller.logEntry.currentRecord.save();
    wendler.stores.LiftLog.sync();
    wendler.controller.logEntry.backToLogList();
};

wendler.controller.logEntry.deleteLogEntry = function () {
    wendler.stores.LiftLog.remove(wendler.controller.logEntry.currentRecord);
    wendler.stores.LiftLog.sync();
    wendler.controller.logEntry.backToLogList();
};

wendler.controller.logEntry.currentRecord = null;
wendler.controller.logEntry.setupLogEntry = function (logRecord) {
    wendler.controller.logEntry.currentRecord = logRecord;
    Ext.getCmp('log').setActiveItem('edit-log-entry', {type:'slide', direction:'left'});

    var logTitle = logRecord.data.liftName + " " + wendler.controller.log.formatDate(logRecord.data.date) + " - Cycle " + logRecord.data.cycle;
    Ext.get('log-entry-field-title').setHTML(logTitle);

    var formValues = logRecord.data;
    formValues['estimatedOneRepMax'] = util.formulas.estimateOneRepMax(logRecord.data.weight, logRecord.data.reps);
    Ext.getCmp('edit-log-entry').setValues(formValues);
};

wendler.controller.logEntry.updateOneRepMax = function () {
    var formValues = Ext.getCmp('edit-log-entry').getValues();
    var newOneRepSetter = {
        estimatedOneRepMax:util.formulas.estimateOneRepMax(formValues.weight, formValues.reps)
    };
    Ext.getCmp('edit-log-entry').setValues(newOneRepSetter);
};

wendler.views.log.cards.EditLogEntry = {
    id:'edit-log-entry',
    xtype:'formpanel',
    scroll:'vertical',
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
            title:'Log Entry',
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
                    name:'weight',
                    labelWidth:'50%',
                    listeners:{
                        change:wendler.controller.logEntry.updateOneRepMax
                    }
                },
                {
                    xtype:'numberfield',
                    label:'Reps',
                    name:'reps',
                    labelWidth:'50%',
                    listeners:{
                        change:wendler.controller.logEntry.updateOneRepMax
                    }
                },
                {
                    xtype:'numberfield',
                    disabled:true,
                    disabledCls:'disabledVisible',
                    label:'Estimated 1RM',
                    name:'estimatedOneRepMax',
                    labelWidth:'50%'
                },
                {
                    xtype:'selectfield',
                    label:'Units',
                    name:'units',
                    options:wendler.settings.options.units,
                    labelWidth:'50%'
                },
                {
                    xtype:'textareafield',
                    label:'Notes',
                    name:'notes'
                }
            ]
        },
        {
            id:'delete-log-entry-button',
            xtype:'button',
            text:'Delete',
            ui:'decline',
            handler:wendler.controller.logEntry.deleteLogEntry
        }
    ]
};