"use strict";
Ext.ns('wendler.defaults', 'wendler.stores.recovery', 'wendler.settings.options');

Ext.regModel('Settings', {
    fields:[
        {name:'id', type:'integer'},
        {name:'show-warmup-sets', type:'integer'},
        {name:'units', type:'string'},
        {name:'rounding-value', type:'string'},
        {name:'rounding-type', type:'string'},
        {name:'use-training-max', type:'integer', defaultValue:1}
    ],
    proxy:{
        type:'localstorage',
        id:'settings-proxy'
    }
});

wendler.defaults.settings = {
    'show-warmup-sets':1,
    units:'lbs',
    'rounding-value':5,
    'rounding-type':'normal',
    'use-training-max':1
};

wendler.stores.recovery.setupDefaultSettings = function () {
    util.withNoFilters(wendler.stores.Settings, function(){
        if (wendler.stores.Settings.getCount() == 0) {
            wendler.stores.Settings.add(wendler.defaults.settings);
            wendler.stores.Settings.sync();
        }
    });
};

wendler.stores.Settings = new Ext.data.Store({
    model:'Settings',
    listeners:{
        load:wendler.stores.recovery.setupDefaultSettings
    }
});
wendler.stores.Settings.load();

wendler.settings.options.units = [
    {text:'lbs', value:'lbs'},
    {text:'kg', value:'kg'}
];

wendler.settings.options.roundingValues = [
    {text:'1', value:1},
    {text:'2.5', value:2.5},
    {text:'5', value:5}
];

wendler.settings.options.roundingType = [
    {text:'Up', value:'up'},
    {text:'Normal', value:'normal'},
    {text:'Down', value:'down'}
];