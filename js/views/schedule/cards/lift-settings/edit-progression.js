"use strict";
Ext.define("biglifts.views.EditProgression", {
    extend: 'Ext.form.Panel',
    returnToLiftSettings: function () {
        this.currentProgression.set(this.getValues());
        biglifts.stores.lifts.LiftProgression.sync();
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'));
    },
    showEditLiftProgression: function (progression) {
        this.currentProgression = progression;
        Ext.get('edit-progression-title').setHtml('Week ' + progression.get('week') + ", Set " + progression.get('set'));
        this.setRecord(this.currentProgression);
        Ext.getCmp('lift-schedule').setActiveItem(this);
    },
    config: {
        id: 'edit-progression',
        listeners: {
            painted: function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.returnToLiftSettings, this));
            },
            initialize: function () {
                var me = this;
                me.add([
                    {
                        id: 'edit-progression-toolbar',
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Edit',
                        items: [
                            {
                                xtype: 'button',
                                ui: 'back',
                                text: 'Back',
                                handler: Ext.bind(me.returnToLiftSettings, me)
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        cls: 'fieldset-title-no-margin',
                        style: 'margin-top: 0px',
                        title: "<div id='edit-progression-title'>Week 1, Set 1</div>",
                        defaults: {
                            labelWidth: '50%'
                        },
                        items: [
                            {
                                xtype: 'numberfield',
                                name: 'reps',
                                label: 'Reps'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'AMRAP',
                                name: 'amrap'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Warmup',
                                name: 'warmup'
                            },
                            {
                                xtype: 'numberfield',
                                name: 'percentage',
                                label: 'Percentage'
                            }
                        ]
                    }
                ]);
            }
        }
    }
});