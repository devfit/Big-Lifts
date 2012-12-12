"use strict";
Ext.ns('biglifts.settings.options', 'biglifts.stores.w');

Ext.define('biglifts.models.w.Settings', {
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

Ext.define("biglifts.models.w.SettingsStore", {
    extend: "biglifts.stores.AbstractSettingsStore",
    getCombinedSettings: function () {
        var myData = _.clone(this.first().data);
        var globalData = _.clone(biglifts.stores.GlobalSettings.first().data);
        return _.extend(myData, globalData);
    },
    setupDefaultSettings: function () {
        if( this.getCount() === 0 ){
            this.add(this.DEFAULT_SETTINGS);
        }
        else {
            this.first().set(this.DEFAULT_SETTINGS) ;
        }
        this.sync();
    },
    lockPortrait: function () {
        if (window.ScreenLock) {
            var shouldLockPortrait = this.first().get('lockPortrait');
            window.ScreenLock.lockPortrait(shouldLockPortrait === 1);
        }
    },
    DEFAULT_SETTINGS: {
        'showWarmupSets': 1,
        'roundingValue': '5',
        'roundingType': 'normal',
        'useTrainingMax': 1,
        'trainingMaxPercentage': 90,
        'exportEmail': '',
        'lockPortrait': false
    },
    config: {
        model: 'biglifts.models.w.Settings',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.setupDefaultSettings();
                }
                this.lockPortrait();
            },
            beforesync: function () {
                this.lockPortrait();
            }
        }
    }
});
biglifts.stores.w.Settings = Ext.create('biglifts.models.w.SettingsStore');
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