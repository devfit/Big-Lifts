"use strict";
Ext.ns('biglifts.views.log.cards', 'biglifts.logEntry');

biglifts.logEntry.backToLogList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

biglifts.logEntry.updateLogEntry = function () {
    var values = Ext.getCmp('edit-log-entry').getValues();
    values['timestamp'] = values['timestamp'].getTime();

    biglifts.logEntry.currentRecord.set(values);
    biglifts.logEntry.currentRecord.save();
    biglifts.stores.LiftLog.sync();
};

biglifts.logEntry.deleteLogEntry = function () {
    biglifts.stores.LiftLog.remove(biglifts.logEntry.currentRecord);
    biglifts.stores.LiftLog.sync();
    biglifts.logEntry.backToLogList();
};

biglifts.logEntry.currentRecord = null;
biglifts.logEntry.setupLogEntry = function (logRecord) {
    biglifts.logEntry.currentRecord = logRecord;
    Ext.getCmp('log').setActiveItem('edit-log-entry', {type:'slide', direction:'left'});
    Ext.getCmp('edit-log-entry-toolbar').setTitle(logRecord.data.liftName);

    var formValues = _.clone(logRecord.data);
    formValues['estimatedOneRepMax'] = util.formulas.estimateOneRepMax(logRecord.data.weight, logRecord.data.reps);
    formValues['timestamp'] = new Date(logRecord.data.timestamp);
    Ext.getCmp('edit-log-entry').setValues(formValues);
    biglifts.components.notesEditor.displayNotes('edit-log-notes', logRecord.data.notes);
};

biglifts.logEntry.updateOneRepMax = function () {
    var formValues = Ext.getCmp('edit-log-entry').getValues();
    var newOneRepSetter = {
        estimatedOneRepMax:util.formulas.estimateOneRepMax(formValues.weight, formValues.reps)
    };
    Ext.getCmp('edit-log-entry').setValues(newOneRepSetter);
};

biglifts.logEntry.editNotes = function () {
    Ext.get('edit-log-notes').addCls('tapped');
    Ext.getCmp('log-notes-editor')._setNotes(biglifts.logEntry.currentRecord.get('notes'));
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-notes-editor'), {type:'slide', direction:'left'});
};

biglifts.logEntry.getExtDateFormat = function () {
    var dateFormat = biglifts.stores.Settings.first().get('dateFormat');
    dateFormat = dateFormat.toLowerCase().replace('dd', 'd').replace('mm', 'm').replace('yyyy', 'Y');
    return dateFormat;
};

biglifts.logEntry.updateDateFormat = function () {
    if (Ext.getCmp('edit-log-fieldset')) {
        Ext.getCmp('edit-log-fieldset').removeAll(true);
        Ext.getCmp('edit-log-fieldset').add(biglifts.views.log.cards.generateEditLogEntryFieldsetItems());
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
    }
};

biglifts.views.log.cards.generateEditLogEntryFieldsetItems = function () {
    return [
        {
            id:'edit-log-date',
            xtype:'datepickerfield',
            dateFormat:biglifts.logEntry.getExtDateFormat(),
            label:'Date',
            name:'timestamp',
            labelWidth:'45%',
            listeners:{
                change:biglifts.logEntry.updateLogEntry
            }
        },
        {
            xtype:'numberfield',
            label:'Cycle',
            name:'cycle',
            labelWidth:'45%',
            listeners:{
                change:biglifts.logEntry.updateLogEntry
            }
        },
        {
            xtype:'numberfield',
            label:'Weight',
            name:'weight',
            labelWidth:'45%',
            listeners:{
                change:function () {
                    biglifts.logEntry.updateOneRepMax();
                    biglifts.logEntry.updateLogEntry();
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
                    biglifts.logEntry.updateOneRepMax();
                    biglifts.logEntry.updateLogEntry();
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
                    biglifts.logEntry.updateLogEntry();
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
            options:biglifts.settings.options.units,
            labelWidth:'45%',
            listeners:{
                change:biglifts.logEntry.updateLogEntry
            }
        }
    ];
};

biglifts.views.log.cards.EditLogEntry = {
    id:'edit-log-entry',
    xtype:'formpanel',
    scroll:'vertical',
    style:'padding-top:0px',
    bodyStyle:'padding-top:0px',
    _listenersBound:false,
    listeners:{
        painted:function () {
            if (!this._listenersBound) {
                Ext.get('edit-log-notes').addListener('tap', biglifts.logEntry.editNotes);
                this._listenersBound = true;
            }
        },
        initialize:function () {
            Ext.getCmp('edit-log-fieldset').add(biglifts.views.log.cards.generateEditLogEntryFieldsetItems());
        },
        show:function () {
            if (Ext.get('edit-log-notes')) {
                Ext.get('edit-log-notes').removeCls('tapped');
            }
            biglifts.navigation.setBackFunction(biglifts.logEntry.backToLogList);
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
                    id:'edit-log-back-button',
                    text:'Back',
                    ui:'back',
                    handler:biglifts.logEntry.backToLogList
                },
                {xtype:'spacer'},
                {
                    id:'delete-log-entry-button',
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:biglifts.logEntry.deleteLogEntry
                }
            ]
        },
        {
            id:'edit-log-fieldset',
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            style:'margin-bottom: 7px;'
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