"use strict";
Ext.ns('wendler.views.log.cards', 'wendler.controller.logEntry');

wendler.controller.logEntry.backToLogList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.controller.logEntry.updateLogEntry = function () {
    var values = Ext.getCmp('edit-log-entry').getValues();
    values['timestamp'] = values['timestamp'].getTime();

    wendler.controller.logEntry.currentRecord.set(values);
    wendler.controller.logEntry.currentRecord.save();
    wendler.stores.LiftLog.sync();
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
    Ext.getCmp('edit-log-entry-toolbar').setTitle(logRecord.data.liftName);

    var formValues = _.clone(logRecord.data);
    formValues['estimatedOneRepMax'] = util.formulas.estimateOneRepMax(logRecord.data.weight, logRecord.data.reps);
    formValues['timestamp'] = new Date(logRecord.data.timestamp);
    Ext.getCmp('edit-log-entry').setValues(formValues);
    wendler.controller.logEntry.displayNotes(logRecord.data.notes);
};

wendler.controller.logEntry.displayNotes = function (notes) {
    var displayableNotes = null;
    if (notes === "") {
        displayableNotes = "<div class='notes-empty-text'>Tap to edit</div>";
    }
    else {
        displayableNotes = displayableNotes = wendler.controller.components.notesEditor.sanitizeForDisplay(notes);
    }
    Ext.get('edit-log-notes').setHtml(displayableNotes);
};

wendler.controller.logEntry.updateOneRepMax = function () {
    var formValues = Ext.getCmp('edit-log-entry').getValues();
    var newOneRepSetter = {
        estimatedOneRepMax:util.formulas.estimateOneRepMax(formValues.weight, formValues.reps)
    };
    Ext.getCmp('edit-log-entry').setValues(newOneRepSetter);
};

wendler.controller.logEntry.editNotes = function () {
    Ext.get('edit-log-notes').addCls('tapped');
    Ext.getCmp('log-notes-editor')._setNotes(wendler.controller.logEntry.currentRecord.get('notes'));
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-notes-editor'), {type:'slide', direction:'left'});
};

wendler.views.log.cards.EditLogEntry = {
    id:'edit-log-entry',
    xtype:'formpanel',
    scroll:'vertical',
    style:'padding-top:0px',
    bodyStyle:'padding-top:0px',
    listeners:{
        painted:function () {
            Ext.get('edit-log-notes').addListener('tap', wendler.controller.logEntry.editNotes);
        },
        show:function () {
            if (Ext.get('edit-log-notes')) {
                Ext.get('edit-log-notes').removeCls('tapped');
            }
            wendler.navigation.setBackFunction(wendler.controller.logEntry.backToLogList);
        }
    },
    items:[
        {
            docked:'top',
            id:'edit-log-entry-toolbar',
            xtype:'toolbar',
            title:'',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.controller.logEntry.backToLogList
                },
                {xtype:'spacer'},
                {
                    id:'delete-log-entry-button',
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:wendler.controller.logEntry.deleteLogEntry
                }
            ]
        },
        {
            xtype:'fieldset',
            style:'margin-top: 7px; margin-bottom: 7px;',
            items:[
                {
                    xtype:'datepickerfield',
                    label:'Date',
                    name:'timestamp',
                    labelWidth:'45%',
                    listeners:{
                        change:wendler.controller.logEntry.updateLogEntry
                    }
                },
                {
                    xtype:'numberfield',
                    label:'Cycle',
                    name:'cycle',
                    labelWidth:'45%',
                    listeners:{
                        change:wendler.controller.logEntry.updateLogEntry
                    }
                },
                {
                    xtype:'numberfield',
                    label:'Weight',
                    name:'weight',
                    labelWidth:'45%',
                    listeners:{
                        change:function () {
                            wendler.controller.logEntry.updateOneRepMax();
                            wendler.controller.logEntry.updateLogEntry();
                        }
                    }
                },
                {
                    xtype:'numberfield',
                    label:'Reps',
                    name:'reps',
                    labelWidth:'50%',
                    listeners:{
                        change:function () {
                            wendler.controller.logEntry.updateOneRepMax();
                            wendler.controller.logEntry.updateLogEntry();
                        }
                    }
                },
                {
                    xtype:'numberfield',
                    label:'Expected Reps',
                    name:'expectedReps',
                    labelWidth:'50%',
                    listeners:{
                        change:function () {
                            wendler.controller.logEntry.updateLogEntry();
                        }
                    }
                },
                {
                    xtype:'numberfield',
                    cls:'one-rep-max-estimate',
                    readOnly:true,
                    label:'Estimated 1RM',
                    name:'estimatedOneRepMax',
                    labelWidth:'50%'
                },
                {
                    xtype:'selectfield',
                    label:'Units',
                    name:'units',
                    options:wendler.settings.options.units,
                    labelWidth:'45%',
                    listeners:{
                        change:wendler.controller.logEntry.updateLogEntry
                    }
                }
            ]
        },
        {
            xtype:'panel',
            bodyPadding:0,
            layout:'fit',
            html:'<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                '<div id="edit-log-notes" class="log-notes"></div>'
        }
    ]
};