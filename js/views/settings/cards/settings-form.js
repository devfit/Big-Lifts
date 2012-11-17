Ext.ns('biglifts.settings.controller', 'biglifts.views');
biglifts.settings.controller.resetToDefaults = function () {
    biglifts.stores.Settings.first().set(biglifts.defaults.settings);
    biglifts.stores.Settings.sync();
    Ext.getCmp('settings-form').setRecord(Ext.create('Settings', biglifts.defaults.settings));
};

biglifts.settings.controller.reloadForm = function () {
    Ext.getCmp('settings-form').setRecord(biglifts.stores.Settings.first());
    Ext.getCmp('settings-form').hasBeenLoaded = true;
};

biglifts.settings.controller.updateSettings = function (field, newValue, oldValue) {
    var settingsForm = Ext.getCmp('settings-form');
    if (!settingsForm.hasBeenLoaded) {
        return;
    }

    if (!_.isUndefined(oldValue) && !_.isUndefined(newValue) && _.has(oldValue, 'data') && _.has(newValue, 'data')) {
        if (oldValue.data.value === 'lbs' && newValue.data.value === 'kg') {
            biglifts.stores.lifts.adjustCycleIncreaseForKg();
        }
    }

    var settingsRecord = biglifts.stores.Settings.first();
    var settingsFormValues = settingsForm.getValues();
    for (var property in settingsFormValues) {
        if (settingsRecord.get(property) !== settingsFormValues[property]) {
            settingsRecord.set(property, settingsFormValues[property]);
        }
    }
    settingsRecord.save();
    biglifts.stores.Settings.sync();
    biglifts.stores.Settings.fireEvent("beforesync");

    biglifts.settings.lockPortrait(settingsRecord.get('lockPortrait'));
    biglifts.maxes.barSetup.adjustPlatesForUnits(settingsRecord.get('units'));

    if (!_.isUndefined(field.getName) && field.getName() === 'dateFormat') {
        biglifts.logEntry.updateDateFormat();
    }
};

biglifts.views.SettingsForm = {
    xtype:'formpanel',
    id:'settings-form',
    listeners:{
        initialize:biglifts.settings.controller.reloadForm
    },
    scroll:'vertical',
    items:[
        {
            xtype:'fieldset',
            style:'margin-top: 0; margin-bottom: 0',
            defaults:{
                labelWidth:'50%',
                listeners:{
                    change:biglifts.settings.controller.updateSettings
                }
            },
            items:[
                {
                    xtype:'togglefield',
                    name:'showWarmupSets',
                    label:"Show warmup"
                },
                {
                    xtype:'selectfield',
                    name:'units',
                    label:"Units",
                    options:biglifts.settings.options.units
                },
                {
                    xtype:'selectfield',
                    name:'roundingValue',
                    label:'Round to',
                    options:biglifts.settings.options.roundingValues
                },
                {
                    xtype:'selectfield',
                    name:'roundingType',
                    label:'Rounding',
                    options:biglifts.settings.options.roundingType
                },
                {
                    xtype:'togglefield',
                    name:'useTrainingMax',
                    label:'Use training max',
                    id:'use-training-max-toggle'
                },
                {
                    xtype:'numberfield',
                    name:'trainingMaxPercentage',
                    label:'Training %'
                },
                {
                    xtype:'togglefield',
                    name:'lockPortrait',
                    label:'Lock portrait'
                },
                {
                    xtype:'selectfield',
                    name:'dateFormat',
                    label:'Date Format',
                    labelWidth:'39%',
                    options:biglifts.settings.options.dateFormats
                }
            ]
        },
        {
            xtype:'spacer',
            height:5
        },
        {
            xtype:'button',
            ui:'decline',
            text:'Reset',
            handler:biglifts.settings.controller.resetToDefaults
        }
    ]
};
