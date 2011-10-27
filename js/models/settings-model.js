"use strict";
Ext.ns('wendler', 'wendler.defaults', 'wendler.stores', 'wendler.settings.options');

Ext.regModel('Settings', {
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'show-warmup-sets', type: 'integer'},
        {name: 'units', type: 'string'},
        {name: 'rounding-value', type: 'string'},
        {name: 'rounding-type', type: 'string'},
        {name: 'use-training-max', type: 'integer'}
    ],
    proxy: {
        type: 'localstorage',
        id: 'settings-proxy'
    }
});

wendler.defaults.settings = {
    'show-warmup-sets': 1,
    units: 'lbs',
    'rounding-value': 5,
    'rounding-type': 'normal',
    'use-training-max': 1
};

wendler.stores.Settings = new Ext.data.Store({
    model: 'Settings',
    listeners: {
        load: function() {
            if (this.getCount() == 0) {
                this.add(wendler.defaults.settings);
                this.sync();
            }
        }
    },
    autoLoad: true,
    autoSave: true
});


wendler.settings.options.units = [
    {text: 'lbs', value: 'lbs'},
    {text: 'kg', value: 'kg'}
];

wendler.settings.options.roundingValues = [
    {text: '1', value: 1},
    {text: '2.5', value: 2.5},
    {text: '5',  value: 5}
];

wendler.settings.options.roundingType = [
    {text: 'Up', value: 'up'},
    {text: 'Normal', value: 'normal'},
    {text: 'Down', value: 'down'}
];