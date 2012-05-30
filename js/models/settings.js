"use strict";
Ext.ns('wendler.defaults', 'wendler.stores.recovery', 'wendler.settings.options');

Ext.define('Settings', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'id', type:'string'},
            {name:'showWarmupSets', type:'integer'},
            {name:'units', type:'string'},
            {name:'roundingValue', type:'string'},
            {name:'roundingType', type:'string'},
            {name:'useTrainingMax', type:'integer', defaultValue:1},
            {name:'trainingMaxPercentage', type:'integer', defaultValue:90},
            {name:'exportEmail', type:'string', defaultValue:''},
            {name:'lockPortrait', type:'integer', defaultValue:0},
            {name:'dateFormat', type:'string', defaultValue:'MM/dd/yyyy'}
        ],
        proxy:{
            type:'localstorage',
            id:'settings-proxy'
        }
    }
});

wendler.defaults.settings = {
    'showWarmupSets':1,
    units:'lbs',
    'roundingValue':'5',
    'roundingType':'normal',
    'useTrainingMax':1,
    'trainingMaxPercentage':90,
    'exportEmail':'',
    'lockPortrait':false
};

wendler.stores.recovery.setupDefaultSettings = function () {
    util.withNoFilters(wendler.stores.Settings, function () {
        if (wendler.stores.Settings.getCount() == 0) {
            wendler.stores.Settings.add(wendler.defaults.settings);
            wendler.stores.Settings.sync();
        }
    });
};

wendler.stores.Settings = Ext.create('Ext.data.Store', {
    model:'Settings',
    listeners:{
        load:function () {
            wendler.stores.recovery.setupDefaultSettings();
        }
    }
});
wendler.stores.push(wendler.stores.Settings);

wendler.settings.options.units = [
    {text:'lbs', value:'lbs'},
    {text:'kg', value:'kg'}
];

wendler.settings.options.roundingValues = [
    {text:'1', value:'1'},
    {text:'2.5', value:'2.5'},
    {text:'5', value:'5'},
    {text:'Closest 5', value:'closest5'}
];

wendler.settings.options.roundingType = [
    {text:'Up', value:'up'},
    {text:'Normal', value:'normal'},
    {text:'Down', value:'down'}
];

wendler.settings.options.dateFormats = [
    {text:"Month/Day/Year", value:"MM/dd/yyyy"},
    {text:"Day/Month/Year", value:"dd/MM/yyyy"}
];