"use strict";
Ext.define("biglifts.views.EditAssistanceLogEntry", {
    extend:'Ext.form.Panel',
    returnAndUpdate:function () {
        var values = this.getValues();
        values['timestamp'] = values['timestamp'].getTime();

        this.currentAssistanceRecord.set(values);
        biglifts.stores.assistance.ActivityLog.sync();
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
    },
    deleteAssistanceLogEntry:function () {
        biglifts.stores.assistance.ActivityLog.remove(this.currentAssistanceRecord);
        biglifts.stores.assistance.ActivityLog.sync();
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
    },
    editAssistanceNotes:function () {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('assistance-log-notes-editor'));
        Ext.getCmp('assistance-log-notes-editor')._setNotes(this.currentAssistanceRecord.get('notes'));
    },
    updateNotes:function (notes) {
        biglifts.components.notesEditor.displayNotes('edit-assistance-log-notes', notes);
        this.currentAssistanceRecord.set('notes', notes);
        biglifts.stores.assistance.ActivityLog.sync();
    },
    setupAssistanceLogEntry:function (assistanceRecord) {
        this.currentAssistanceRecord = assistanceRecord;
        Ext.getCmp('log').setActiveItem(this);
        this.logEntryToolbar.setTitle(assistanceRecord.get('movement'));

        var formValues = _.clone(assistanceRecord.data);
        formValues['timestamp'] = new Date(assistanceRecord.get('timestamp'));

        this.setValues(formValues);
        biglifts.components.notesEditor.displayNotes('edit-assistance-log-notes', assistanceRecord.data.notes);
    },
    config:{
        scroll:'vertical',
        listeners:{
            painted:function () {
                biglifts.navigation.setBackFunction(this.returnAndUpdate);
                if (!this._painted) {
                    this._painted = true;
                    Ext.get('edit-assistance-log-notes').addListener('tap', this.editAssistanceNotes, this);
                }
            },
            initialize:function () {
                var me = this;
                me.logEntryToolbar = me.add({
                    docked:'top',
                    xtype:'toolbar',
                    items:[
                        {
                            text:'Back',
                            ui:'back',
                            handler:Ext.bind(me.returnAndUpdate, me)
                        },
                        {xtype:'spacer'},
                        {
                            id:'assistance-log-delete-button',
                            ui:'decline',
                            iconMask:true,
                            iconCls:'trash',
                            handler:Ext.bind(me.deleteAssistanceLogEntry, me)
                        }
                    ]
                });

                me.logFieldset = me.add({
                    cls:'fieldset-title-no-margin',
                    style:'margin-bottom: 7px;',
                    xtype:'fieldset',
                    items:[
                        {
                            id:'assistance-log-date',
                            xtype:'datepickerfield',
                            dateFormat:biglifts.stores.GlobalSettings.getExtDateFormat(),
                            label:'Date',
                            name:'timestamp',
                            labelWidth:'45%'
                        },
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
                });

                me.add({
                    xtype:'panel',
                    bodyPadding:0,
                    layout:'fit',
                    html:'<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                        '<div id="edit-assistance-log-notes" class="log-notes"></div>'
                });
            }
        }
    }
});