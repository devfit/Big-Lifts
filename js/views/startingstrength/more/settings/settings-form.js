"use strict";
Ext.define('biglifts.views.ss.SettingsForm', {
    extend: 'Ext.form.Panel',
    backToMore: function () {
        Ext.getCmp('ss-more').setActiveItem(Ext.getCmp('ss-more-info-list'));
    },
    reloadForm: function () {
        this.setValues(biglifts.stores.GlobalSettings.first().data);
        this.hasBeenLoaded = true;
    },
    resetToDefaults: function () {
        biglifts.stores.GlobalSettings.setupDefaultSettings();
        this.setValues(this.setValues(biglifts.stores.GlobalSettings.first().data));
    },
    updateSettings: function (field, newValue, oldValue) {
        var settingsForm = Ext.getCmp('ss-settings-form');
        if (!settingsForm.hasBeenLoaded) {
            return;
        }

        var globalSettings = biglifts.stores.GlobalSettings.first();
        var settingsFormValues = settingsForm.getValues();
        for (var property in settingsFormValues) {
            if (biglifts.stores.GlobalSettings.hasField(property)) {
                globalSettings.set(property, settingsFormValues[property]);
            }
        }

        biglifts.stores.GlobalSettings.sync();
        biglifts.stores.GlobalSettings.fireEvent('beforesync');
    },
    config: {
        id: 'ss-settings-form',
        scroll: 'vertical',
        listeners: {
            initialize: function () {
                var me = this;
                me.add([
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Settings',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Back',
                                ui: 'back',
                                handler: Ext.bind(me.backToMore, me)
                            }
                        ]
                    },
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
                                xtype: 'selectfield',
                                name: 'units',
                                label: "Units",
                                options: biglifts.settings.options.units
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
                this.reloadForm();
                biglifts.navigation.setBackFunction(Ext.bind(this.backToMore, this));
            }
        }
    }
});
