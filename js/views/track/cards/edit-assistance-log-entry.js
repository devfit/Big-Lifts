"use strict";
Ext.ns('biglifts.views.log.cards', 'biglifts.logEntry');

biglifts.logEntry.currentAssistanceRecord = null;

biglifts.logEntry.setupAssistanceLogEntry = function (assistanceRecord) {
    biglifts.logEntry.currentAssistanceRecord = assistanceRecord;
    Ext.getCmp('log').setActiveItem(Ext.getCmp('edit-assistance-log-entry'), {type:'slide', direction:'left'});
    Ext.getCmp('edit-assistance-log-entry-toolbar').setTitle(assistanceRecord.get('movement'));

    Ext.getCmp('edit-assistance-log-entry').setRecord(assistanceRecord);
    biglifts.components.notesEditor.displayNotes('edit-assistance-log-notes', assistanceRecord.data.notes);
};

biglifts.logEntry.updateAssistanceLogEntry = function () {
    var values = Ext.getCmp('edit-assistance-log-entry').getValues();

    biglifts.logEntry.currentAssistanceRecord.set(values);
    biglifts.stores.assistance.ActivityLog.sync();
};

biglifts.logEntry.editAssistanceNotes = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('assistance-log-notes-editor'));
    Ext.getCmp('assistance-log-notes-editor')._setNotes(biglifts.logEntry.currentAssistanceRecord.get('notes'));
};

biglifts.logEntry.deleteAssistanceLogEntry = function () {
    biglifts.stores.assistance.ActivityLog.remove(biglifts.logEntry.currentAssistanceRecord);
    biglifts.stores.assistance.ActivityLog.sync();
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
};

biglifts.logEntry.returnAndUpdate = function () {
    biglifts.logEntry.updateAssistanceLogEntry();
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

biglifts.views.log.cards.EditAssistanceLogEntry = {
    id:'edit-assistance-log-entry',
    xtype:'formpanel',
    scroll:'vertical',
    _listenersBound:false,
    listeners:{
        painted:function () {
            if (!this._painted) {
                this._painted = true;
                Ext.get('edit-assistance-log-notes').addListener('tap', biglifts.logEntry.editAssistanceNotes);
            }
        },
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.logEntry.returnAndUpdate);
        }
    },
    items:[
        {
            id:'edit-assistance-log-entry-toolbar',
            docked:'top',
            xtype:'toolbar',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:biglifts.logEntry.returnAndUpdate
                },
                {xtype:'spacer'},
                {
                    id:'assistance-log-delete-button',
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:biglifts.logEntry.deleteAssistanceLogEntry
                }
            ]
        },
        {
            id:'edit-assistance-log-fieldset',
            cls:'fieldset-title-no-margin',
            style:'margin-bottom: 7px;',
            xtype:'fieldset',
            items:[
                {
                    label:'Sets',
                    xtype:'numberfield',
                    name:'sets'
                },
                {
                    label:'Reps',
                    xtype:'numberfield',
                    name:'reps'
                },
                {
                    label:'Weight',
                    xtype:'numberfield',
                    name:'weight'
                }
            ]
        },
        {
            xtype:'panel',
            bodyPadding:0,
            layout:'fit',
            html:'<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                '<div id="edit-assistance-log-notes" class="log-notes"></div>'
        }
    ]
};