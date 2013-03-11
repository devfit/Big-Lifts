"use strict";
Ext.define('biglifts.views.SettingsForm', {
    extend: 'Ext.form.Panel',
    reloadForm: function () {
        this.setValues(biglifts.stores.w.Settings.getCombinedSettings());
        this.hasBeenLoaded = true;
    },
    bindListeners:function(){
        biglifts.stores.w.Settings.addListener('beforesync', this.reloadForm, this);
        biglifts.stores.GlobalSettings.addListener('beforesync', this.reloadForm, this);
    },
    destroyListeners:function(){
        biglifts.stores.w.Settings.removeListener('beforesync', this.reloadForm, this);
        biglifts.stores.GlobalSettings.removeListener('beforesync', this.reloadForm, this);
    },
    resetToDefaults: function () {
        biglifts.stores.w.Settings.setupDefaultSettings();
        biglifts.stores.GlobalSettings.setupDefaultSettings();
        this.setValues(biglifts.stores.w.Settings.getCombinedSettings());
    },
    updateSettings: function (field, newValue, oldValue) {
        var settingsForm = Ext.getCmp('settings-form');
        if (!settingsForm.hasBeenLoaded) {
            return;
        }
        var settingsFormValues = settingsForm.getValues();
        if (oldValue === 'lbs' && newValue === 'kg') {
            biglifts.stores.lifts.Lifts.adjustCycleIncreaseForKg();
            if (settingsFormValues.roundingValue === "5") {
                settingsFormValues.roundingValue = "2.5";
            }
        }

        var settingsRecord = biglifts.stores.w.Settings.first();
        var globalSettings = biglifts.stores.GlobalSettings.first();

        for (var property in settingsFormValues) {
            if (biglifts.stores.GlobalSettings.hasField(property)) {
                globalSettings.set(property, settingsFormValues[property]);
            }
            if (biglifts.stores.w.Settings.hasField(property)) {
                settingsRecord.set(property, settingsFormValues[property]);
            }
        }

        biglifts.stores.w.Settings.sync();
        biglifts.stores.GlobalSettings.sync();

        biglifts.stores.w.Settings.fireEvent("beforesync");
        biglifts.stores.GlobalSettings.fireEvent('beforesync');
    },
    config: {
        id: 'settings-form',
        scroll: 'vertical',
        listeners: {
            initialize: function () {
                var me = this;
                me.add([
                    {
                        xtype: 'fieldset',
                        style: 'margin-top: 0; margin-bottom: 0',
                        defaults: {
                            labelWidth: '50%',
                            listeners: {
                                change: Ext.bind(me.updateSettings, me)
                            }
                        },
                        items: [
                            {
                                xtype: 'togglefield',
                                name: 'showWarmupSets',
                                label: "Show warmup"
                            },
                            {
                                xtype: 'selectfield',
                                name: 'units',
                                label: "Units",
                                options: biglifts.settings.options.units
                            },
                            {
                                xtype: 'selectfield',
                                name: 'roundingValue',
                                label: 'Round to',
                                options: biglifts.settings.options.roundingValues
                            },
                            {
                                xtype: 'selectfield',
                                name: 'roundingType',
                                label: 'Rounding',
                                options: biglifts.settings.options.roundingType
                            },
                            {
                                xtype: 'togglefield',
                                name: 'useTrainingMax',
                                label: 'Use training max',
                                id: 'use-training-max-toggle'
                            },
                            {
                                xtype: 'numberfield',
                                name: 'trainingMaxPercentage',
                                label: 'Training %'
                            },
                            {
                                xtype: 'togglefield',
                                name: 'lockPortrait',
                                label: 'Lock portrait'
                            }
                        ]
                    },
                    {
                        xtype: 'spacer',
                        height: 5
                    },
                    {
                        xtype: 'button',
                        ui: 'decline',
                        text: 'Reset',
                        handler: Ext.bind(me.resetToDefaults, me)
                    }
                ]);
            },
            painted: function () {
                if (!this._painted) {
                    this._painted = true;
                    this.reloadForm();
                    this.bindListeners();
                }
            },
            destroy:function(){
                this.destroyListeners();
            }
        }
    }
});
