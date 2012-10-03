"use strict";
Ext.ns('wendler.views.log.cards', 'wendler.logEntry');

wendler.logEntry.currentAssistanceRecord = null;

wendler.logEntry.setupAssistanceLogEntry = function (assistanceRecord) {
    wendler.logEntry.currentAssistanceRecord = assistanceRecord;
    Ext.getCmp('log').setActiveItem('edit-assistance-log-entry', {type:'slide', direction:'left'});
    Ext.getCmp('edit-assistance-log-entry-toolbar').setTitle(assistanceRecord.get('movement'));

    Ext.getCmp('edit-assistance-log-entry').setValues(assistanceRecord.data);
    wendler.components.notesEditor.displayNotes('edit-assistance-log-notes', assistanceRecord.data.notes);
};

wendler.logEntry.updateAssistanceLogEntry = function () {
    var values = Ext.getCmp('edit-assistance-log-entry').getValues();

    wendler.logEntry.currentAssistanceRecord.set(values);
    wendler.logEntry.currentAssistanceRecord.save();
    wendler.stores.assistance.ActivityLog.sync();
};

wendler.logEntry.editAssistanceNotes = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('assistance-log-notes-editor'));
    Ext.getCmp('assistance-log-notes-editor')._setNotes(wendler.logEntry.currentAssistanceRecord.get('notes'));
};

wendler.logEntry.deleteAssistanceLogEntry = function () {
    wendler.stores.assistance.ActivityLog.remove(wendler.logEntry.currentAssistanceRecord);
    wendler.stores.assistance.ActivityLog.sync();
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
};

wendler.views.log.cards.EditAssistanceLogEntry = {
    id:'edit-assistance-log-entry',
    xtype:'formpanel',
    scroll:'vertical',
    _listenersBound:false,
    listeners:{
        painted:function () {
            Ext.get('edit-assistance-log-notes').addListener('tap', wendler.logEntry.editAssistanceNotes);
        },
        show:function () {
            wendler.navigation.setBackFunction(wendler.logEntry.backToLogList);
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
                    handler:wendler.logEntry.backToLogList
                },
                {xtype:'spacer'},
                {
                    id:'assistance-log-delete-button',
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:wendler.logEntry.deleteAssistanceLogEntry
                }
            ]
        },
        {
            id:'edit-assistance-log-fieldset',
            cls:'fieldset-title-no-margin',
            style:'margin-bottom: 7px;',
            xtype:'fieldset',
            defaults:{
                listeners:{
                    change:wendler.logEntry.updateAssistanceLogEntry
                }
            },
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