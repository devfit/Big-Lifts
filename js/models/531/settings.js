"use strict";
Ext.ns('biglifts.defaults', 'biglifts.stores.recovery', 'biglifts.settings.options', 'biglifts.stores.w');

Ext.define('Settings', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'showWarmupSets', type: 'integer'},
            {name: 'units', type: 'string'},
            {name: 'roundingValue', type: 'string'},
            {name: 'roundingType', type: 'string'},
            {name: 'useTrainingMax', type: 'integer', defaultValue: 1},
            {name: 'trainingMaxPercentage', type: 'integer', defaultValue: 90},
            {name: 'exportEmail', type: 'string', defaultValue: ''},
            {name: 'lockPortrait', type: 'integer', defaultValue: 0},
            {name: 'dateFormat', type: 'string', defaultValue: 'MM/dd/yyyy'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'settings-proxy'
        }
    }
});

biglifts.defaults.settings = {
    'showWarmupSets': 1,
    units: 'lbs',
    'roundingValue': '5',
    'roundingType': 'normal',
    'useTrainingMax': 1,
    'trainingMaxPercentage': 90,
    'exportEmail': '',
    'lockPortrait': false
};

biglifts.stores.recovery.setupDefaultSettings = function () {
    util.withNoFilters(biglifts.stores.w.Settings, function () {
        if (biglifts.stores.w.Settings.getCount() == 0) {
            biglifts.stores.w.Settings.add(biglifts.defaults.settings);
            biglifts.stores.w.Settings.sync();
        }
    });
};

biglifts.settings.lockPortrait = function (shouldLockPortrait) {
    if (window.ScreenLock) {
        window.ScreenLock.lockPortrait(shouldLockPortrait === 1);
    }
};

Ext.define("SettingsStore", {
    extend: "Ext.data.Store",
    getExtDateFormat: function () {
        var dateFormat = this.first().get('dateFormat');
        return dateFormat.toLowerCase().replace('dd', 'd').replace('mm', 'm').replace('yyyy', 'Y');
    },
    config: {
        model: 'Settings',
        listeners: {
            load: function () {
                biglifts.stores.recovery.setupDefaultSettings();
                biglifts.settings.lockPortrait(this.first().get('lockPortrait'));
            }
        }
    }
});
biglifts.stores.w.Settings = Ext.create('SettingsStore');
biglifts.stores.push(biglifts.stores.w.Settings);

biglifts.settings.options.units = [
    {text: 'lbs', value: 'lbs'},
    {text: 'kg', value: 'kg'}
];

biglifts.settings.options.roundingValues = [
    {text: '0.25', value: '0.25'},
    {text: '0.75', value: '0.75'},
    {text: '0.5', value: '0.5'},
    {text: '1', value: '1'},
    {text: '2.5', value: '2.5'},
    {text: '5', value: '5'},
    {text: 'Closest 5', value: 'closest5'}
];

biglifts.settings.options.roundingType = [
    {text: 'Up', value: 'up'},
    {text: 'Normal', value: 'normal'},
    {text: 'Down', value: 'down'}
];

biglifts.settings.options.dateFormats = [
    {text: "Month/Day/Year", value: "MM/dd/yyyy"},
    {text: "Day/Month/Year", value: "dd/MM/yyyy"}
];