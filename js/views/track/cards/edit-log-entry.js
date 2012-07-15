"use strict";
Ext.ns('wendler.views.log.cards', 'wendler.logEntry');

wendler.logEntry.backToLogList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.logEntry.updateLogEntry = function () {
    var values = Ext.getCmp('edit-log-entry').getValues();
    values['timestamp'] = values['timestamp'].getTime();

    wendler.logEntry.currentRecord.set(values);
    wendler.logEntry.currentRecord.save();
    wendler.stores.LiftLog.sync();
};

wendler.logEntry.deleteLogEntry = function () {
    wendler.stores.LiftLog.remove(wendler.logEntry.currentRecord);
    wendler.stores.LiftLog.sync();
    wendler.logEntry.backToLogList();
};

wendler.logEntry.currentRecord = null;
wendler.logEntry.setupLogEntry = function (logRecord) {
    wendler.logEntry.currentRecord = logRecord;
    Ext.getCmp('log').setActiveItem('edit-log-entry', {type:'slide', direction:'left'});
    Ext.getCmp('edit-log-entry-toolbar').setTitle(logRecord.data.liftName);

    var formValues = _.clone(logRecord.data);
    formValues['estimatedOneRepMax'] = util.formulas.estimateOneRepMax(logRecord.data.weight, logRecord.data.reps);
    formValues['timestamp'] = new Date(logRecord.data.timestamp);
    Ext.getCmp('edit-log-entry').setValues(formValues);
    wendler.logEntry.displayNotes(logRecord.data.notes);
};

wendler.logEntry.displayNotes = function (notes) {
    var displayableNotes = null;
    if (notes === "") {
        displayableNotes = "<div class='notes-empty-text'>Tap to edit</div>";
    }
    else {
        displayableNotes = displayableNotes = wendler.components.notesEditor.sanitizeForDisplay(notes);
    }
    Ext.get('edit-log-notes').setHtml(displayableNotes);
};

wendler.logEntry.updateOneRepMax = function () {
    var formValues = Ext.getCmp('edit-log-entry').getValues();
    var newOneRepSetter = {
        estimatedOneRepMax:util.formulas.estimateOneRepMax(formValues.weight, formValues.reps)
    };
    Ext.getCmp('edit-log-entry').setValues(newOneRepSetter);
};

wendler.logEntry.editNotes = function () {
    Ext.get('edit-log-notes').addCls('tapped');
    Ext.getCmp('log-notes-editor')._setNotes(wendler.logEntry.currentRecord.get('notes'));
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-notes-editor'), {type:'slide', direction:'left'});
};

wendler.logEntry.getExtDateFormat = function () {
    var dateFormat = wendler.stores.Settings.first().get('dateFormat');
    dateFormat = dateFormat.toLowerCase().replace('dd', 'd').replace('mm', 'm').replace('yyyy', 'Y');
    return dateFormat;
};

wendler.logEntry.updateDateFormat = function () {
    Ext.getCmp('edit-log-fieldset').removeAll(true);
    Ext.getCmp('edit-log-fieldset').add(wendler.views.log.cards.generateEditLogEntryFieldsetItems());
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
};

wendler.views.log.cards.generateEditLogEntryFieldsetItems = function () {
    return [
        {
            xtype:'datepickerfield',
            dateFormat:wendler.logEntry.getExtDateFormat(),
            label:'Date',
            name:'timestamp',
            labelWidth:'45%',
            listeners:{
                change:wendler.logEntry.updateLogEntry
            }
        },
        {
            xtype:'numberfield',
            label:'Cycle',
            name:'cycle',
            labelWidth:'45%',
            listeners:{
                change:wendler.logEntry.updateLogEntry
            }
        },
        {
            xtype:'numberfield',
            label:'Weight',
            name:'weight',
            labelWidth:'45%',
            listeners:{
                change:function () {
                    wendler.logEntry.updateOneRepMax();
                    wendler.logEntry.updateLogEntry();
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
                    wendler.logEntry.updateOneRepMax();
                    wendler.logEntry.updateLogEntry();
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
                    wendler.logEntry.updateLogEntry();
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
                change:wendler.logEntry.updateLogEntry
            }
        }
    ];
};

wendler.views.log.cards.EditLogEntry = {
    id:'edit-log-entry',
    xtype:'formpanel',
    scroll:'vertical',
    style:'padding-top:0px',
    bodyStyle:'padding-top:0px',
    _listenersBound: false,
    listeners:{
        painted: function(){
            if( !this._listenersBound )
            {
                Ext.get('edit-log-notes').addListener('tap', wendler.logEntry.editNotes);
                this._listenersBound = true;
            }
        },
        initialize:function () {
            Ext.getCmp('edit-log-fieldset').add(wendler.views.log.cards.generateEditLogEntryFieldsetItems());
        },
        show:function () {
            if (Ext.get('edit-log-notes')) {
                Ext.get('edit-log-notes').removeCls('tapped');
            }
            wendler.navigation.setBackFunction(wendler.logEntry.backToLogList);
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
                    handler:wendler.logEntry.backToLogList
                },
                {xtype:'spacer'},
                {
                    id:'delete-log-entry-button',
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:wendler.logEntry.deleteLogEntry
                }
            ]
        },
        {
            id:'edit-log-fieldset',
            xtype:'fieldset',
            style:'margin-top: 7px; margin-bottom: 7px;'
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