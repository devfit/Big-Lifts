"use strict";
new Ext.form.FormPanel({
    title: 'Settings',
    id: 'settings-form',
    scroll: 'vertical',
    dockedItems:[
        {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Settings'
        }
    ],
    listeners: {
        afterlayout: wendler.settings.controller.reloadForm
    },
    items:[
        {
            xtype: 'fieldset',
            style: 'margin-top: 0',
            defaults: {
                labelWidth: '50%',
                listeners:{
                    change:function() {
                        var settingsForm = Ext.getCmp('settings-form');
                        if (!settingsForm.hasBeenLoaded) {
                            return;
                        }

                        var settingsRecord = wendler.stores.Settings.first();
                        settingsRecord.set(settingsForm.getValues());
                        settingsRecord.save();
                    }
                }
            },
            items:[
                {
                    xtype: 'togglefield',
                    name: 'show-warmup-sets',
                    label: "Show warmup sets"
                },
                {
                    xtype: 'selectfield',
                    name: 'units',
                    label: "Units",
                    options: wendler.settings.options.units
                },
                {
                    xtype: 'selectfield',
                    name: 'rounding-value',
                    label: 'Round To (lbs)',
                    options: wendler.settings.options.roundingValues
                },
                {
                    xtype: 'selectfield',
                    name: 'rounding-type',
                    label: 'Rounding Type',
                    options: wendler.settings.options.roundingType
                },
                {
                    xtype: 'togglefield',
                    name: 'use-training-max',
                    label: 'Use 90% training max'
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Set lift percentages'
        },
        {
            xtype: 'spacer',
            height: 15
        },
        {
            xtype: 'button',
            ui: 'decline',
            text: 'Reset',
            handler: wendler.settings.controller.resetToDefaults
        }
    ]
});