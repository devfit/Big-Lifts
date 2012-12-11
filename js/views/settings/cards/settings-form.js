Ext.ns('biglifts.settings.controller', 'biglifts.views');
biglifts.settings.controller.resetToDefaults = function () {
    biglifts.stores.w.Settings.first().set(biglifts.stores.w.Settings.DEFAULT_SETTINGS);
    biglifts.stores.w.Settings.sync();
    Ext.getCmp('settings-form').setRecord(Ext.create('biglifts.models.w.Settings', biglifts.stores.w.Settings.DEFAULT_SETTINGS));
};

biglifts.settings.controller.reloadForm = function () {
    Ext.getCmp('settings-form').setRecord(biglifts.stores.w.Settings.first());
    Ext.getCmp('settings-form').hasBeenLoaded = true;
};

biglifts.settings.controller.updateSettings = function (field, newValue, oldValue) {
    var settingsForm = Ext.getCmp('settings-form');
    if (!settingsForm.hasBeenLoaded) {
        return;
    }

    if (oldValue === 'lbs' && newValue === 'kg') {
        biglifts.stores.lifts.Lifts.adjustCycleIncreaseForKg();
    }

    var settingsRecord = biglifts.stores.w.Settings.first();
    var settingsFormValues = settingsForm.getValues();
    for (var property in settingsFormValues) {
        if (settingsRecord.get(property) !== settingsFormValues[property]) {
            settingsRecord.set(property, settingsFormValues[property]);
        }
    }
    biglifts.stores.w.Settings.sync();
    biglifts.stores.w.Settings.fireEvent("beforesync");
};

biglifts.views.SettingsForm = {
    xtype: 'formpanel',
    id: 'settings-form',
    listeners: {
        initialize: biglifts.settings.controller.reloadForm
    },
    scroll: 'vertical',
    items: [
        {
            xtype: 'fieldset',
            style: 'margin-top: 0; margin-bottom: 0',
            defaults: {
                labelWidth: '50%',
                listeners: {
                    change: biglifts.settings.controller.updateSettings
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
                },
                {
                    xtype: 'selectfield',
                    name: 'dateFormat',
                    label: 'Date Format',
                    labelWidth: '39%',
                    options: biglifts.settings.options.dateFormats
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
            handler: biglifts.settings.controller.resetToDefaults
        }
    ]
};
