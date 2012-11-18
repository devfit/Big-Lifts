"use strict";
Ext.ns('biglifts.views.log.cards');

Ext.define("biglifts.views.EditLogEntry", {
    extend:'Ext.form.Panel',
    xtype:'editlogentry',
    updateNotes:function (newNotes) {
        this.currentRecord.set('notes', newNotes);
        biglifts.stores.LiftLog.sync();
        biglifts.components.notesEditor.displayNotes('edit-log-notes', newNotes);
    },
    setupLogEntry:function (logRecord) {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('edit-log-entry'), {type:'slide', direction:'left'});
        this.currentRecord = logRecord;

        Ext.getCmp('edit-log-entry-toolbar').setTitle(logRecord.data.liftName);
        var formValues = _.clone(logRecord.data);
        formValues['estimatedOneRepMax'] = util.formulas.estimateOneRepMax(logRecord.data.weight, logRecord.data.reps);
        formValues['timestamp'] = new Date(logRecord.data.timestamp);

        this.setValues(formValues);
        biglifts.components.notesEditor.displayNotes('edit-log-notes', logRecord.data.notes);
    },
    updateOneRepMax:function () {
        var formValues = this.getValues();
        formValues.estimatedOneRepMax = util.formulas.estimateOneRepMax(formValues.weight, formValues.reps);
        this.setValues(formValues);
    },
    updateLogEntry:function () {
        var values = this.getValues();
        values['timestamp'] = values['timestamp'].getTime();
        this.currentRecord.set(values);
        biglifts.stores.LiftLog.sync();
    },
    rebuildEditLogFieldset:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Settings, function () {
            me.editLogFieldset.removeAll(true);
            me.editLogFieldset.add([
                {
                    id:'edit-log-date',
                    xtype:'datepickerfield',
                    dateFormat:biglifts.stores.Settings.getExtDateFormat(),
                    label:'Date',
                    name:'timestamp',
                    labelWidth:'45%'
                },
                {
                    xtype:'numberfield',
                    label:'Cycle',
                    name:'cycle',
                    labelWidth:'45%'
                },
                {
                    xtype:'numberfield',
                    label:'Weight',
                    name:'weight',
                    labelWidth:'45%',
                    listeners:{
                        change:Ext.bind(me.updateOneRepMax, me)
                    }
                },
                {
                    xtype:'numberfield',
                    label:'Reps',
                    name:'reps',
                    labelWidth:'50%',
                    listeners:{
                        change:Ext.bind(me.updateOneRepMax, me)
                    }
                },
                {
                    xtype:'numberfield',
                    label:'Expected Reps',
                    name:'expectedReps',
                    labelWidth:'50%'
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
                    labelWidth:'45%'
                }
            ]);
        });
    },
    deleteLogEntry:function () {
        biglifts.stores.LiftLog.remove(this.currentRecord);
        biglifts.stores.LiftLog.sync();
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
    },
    editNotes:function () {
        Ext.get('edit-log-notes').addCls('tapped');
        Ext.getCmp('log-notes-editor')._setNotes(this.currentRecord.get('notes'));
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-notes-editor'), {type:'slide', direction:'left'});
    },
    returnFromEditLogEntry:function () {
        this.updateLogEntry();
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
    },
    config:{
        scroll:'vertical',
        style:'padding-top:0px',
        bodyStyle:'padding-top:0px',
        listeners:{
            painted:function () {
                if (!this._painted) {
                    biglifts.stores.Settings.addListener('beforesync', Ext.bind(this.rebuildEditLogFieldset, this));
                    Ext.get('edit-log-notes').addListener('tap', Ext.bind(this.editNotes, this));
                    this._painted = true;
                }
            },
            initialize:function () {
                var me = this;
                me.add(
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
                                handler:Ext.bind(me.returnFromEditLogEntry, me)
                            },
                            {xtype:'spacer'},
                            {
                                id:'delete-log-entry-button',
                                ui:'decline',
                                iconMask:true,
                                iconCls:'trash',
                                handler:Ext.bind(me.deleteLogEntry, me)
                            }
                        ]
                    });
                me.editLogFieldset = me.add({
                    id:'edit-log-fieldset',
                    xtype:'fieldset',
                    cls:'fieldset-title-no-margin',
                    style:'margin-bottom: 7px;'
                });

                this.rebuildEditLogFieldset();

                me.add({
                    xtype:'panel',
                    bodyPadding:0,
                    layout:'fit',
                    html:'<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                        '<div id="edit-log-notes" class="log-notes"></div>'
                });
            },
            show:function () {
                if (Ext.get('edit-log-notes')) {
                    Ext.get('edit-log-notes').removeCls('tapped');
                }
                biglifts.navigation.setBackFunction(Ext.bind(this.returnFromEditLogEntry, this));
            }
        }
    }
});

biglifts.views.log.cards.EditLogEntry = {
    id:'edit-log-entry',
    xtype:'editlogentry'
};