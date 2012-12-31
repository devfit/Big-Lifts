"use strict";
Ext.ns('biglifts.views.log.cards');

Ext.define("biglifts.views.EditAssistanceLogEntry", {
    extend: 'Ext.form.Panel',
    xtype: 'editassistancelogentry',
    returnAndUpdate: function () {
        this.updateAssistanceLogEntry();
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
    },
    deleteAssistanceLogEntry: function () {
        biglifts.stores.assistance.ActivityLog.remove(this.currentAssistanceRecord);
        biglifts.stores.assistance.ActivityLog.sync();
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
    },
    editAssistanceNotes: function () {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('assistance-log-notes-editor'));
        Ext.getCmp('assistance-log-notes-editor')._setNotes(this.currentAssistanceRecord.get('notes'));
    },
    updateAssistanceLogEntry: function () {
        this.currentAssistanceRecord.set(this.getValues());
        biglifts.stores.assistance.ActivityLog.sync();
    },
    updateNotes: function (notes) {
        biglifts.components.notesEditor.displayNotes('edit-assistance-log-notes', notes);
        this.currentAssistanceRecord.set('notes', notes);
        biglifts.stores.assistance.ActivityLog.sync();
    },
    setupAssistanceLogEntry: function (assistanceRecord) {
        this.currentAssistanceRecord = assistanceRecord;
        Ext.getCmp('log').setActiveItem(this);
        Ext.getCmp('edit-assistance-log-entry-toolbar').setTitle(assistanceRecord.get('movement'));

        this.setRecord(assistanceRecord);
        biglifts.components.notesEditor.displayNotes('edit-assistance-log-notes', assistanceRecord.data.notes);
    },
    config: {
        scroll: 'vertical',
        listeners: {
            painted: function () {
                biglifts.navigation.setBackFunction(this.returnAndUpdate);
                if (!this._painted) {
                    this._painted = true;
                    Ext.get('edit-assistance-log-notes').addListener('tap', this.editAssistanceNotes, this);
                }
            },
            initialize: function () {
                var me = this;
                me.add([
                    {
                        id: 'edit-assistance-log-entry-toolbar',
                        docked: 'top',
                        xtype: 'toolbar',
                        items: [
                            {
                                text: 'Back',
                                ui: 'back',
                                handler: Ext.bind(me.returnAndUpdate, me)
                            },
                            {xtype: 'spacer'},
                            {
                                id: 'assistance-log-delete-button',
                                ui: 'decline',
                                iconMask: true,
                                iconCls: 'trash',
                                handler: Ext.bind(me.deleteAssistanceLogEntry, me)
                            }
                        ]
                    },
                    {
                        id: 'edit-assistance-log-fieldset',
                        cls: 'fieldset-title-no-margin',
                        style: 'margin-bottom: 7px;',
                        xtype: 'fieldset',
                        items: [
                            {
                                label: 'Sets',
                                xtype: 'numberfield',
                                name: 'sets'
                            },
                            {
                                label: 'Reps',
                                xtype: 'numberfield',
                                name: 'reps'
                            },
                            {
                                label: 'Weight',
                                xtype: 'numberfield',
                                name: 'weight'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        bodyPadding: 0,
                        layout: 'fit',
                        html: '<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                            '<div id="edit-assistance-log-notes" class="log-notes"></div>'
                    }
                ]);
            }
        }
    }
});

biglifts.views.log.cards.EditAssistanceLogEntry = {
    id: 'edit-assistance-log-entry',
    xtype: 'editassistancelogentry'
};