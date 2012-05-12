"use strict";
Ext.ns('wendler.stores.defaults');
Ext.define('BarWeight', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'id', type:'integer'},
            {name:'weight', type:'float'},
            {name:'useCustomPlates', type:'boolean', defaultValue: false}
        ],
        proxy:{
            type:'localstorage',
            id:'barweight-proxy'
        }
    }
});

wendler.stores.BarWeight = Ext.create('Ext.data.Store', {
    model:'BarWeight',
    listeners:{
        load:function (store) {
            if (store.getCount() === 0) {
                var settings = wendler.stores.Settings.first();
                if (settings.get('units') === 'lbs') {
                    store.add({weight:45});
                }
                else {
                    store.add({weight:20.4});
                }

                store.sync();
            }
        }
    }
});
wendler.stores.BarWeight.load();
util.filebackup.watchStoreSync(wendler.stores.BarWeight);

Ext.define('Plates', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'id', type:'integer'},
            {name:'weightInLbs', type:'float'},
            {name:'count', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'plates-proxy'
        }
    }
});

wendler.stores.defaults.defaultPlates = [
    {weightInLbs: 45, count: 6},
    {weightInLbs: 35, count: 6},
    {weightInLbs: 25, count: 6},
    {weightInLbs: 15, count: 6},
    {weightInLbs: 10, count: 6},
    {weightInLbs: 5, count: 6},
    {weightInLbs: 2.5, count: 6}
];

wendler.stores.Plates = Ext.create('Ext.data.Store', {
    model:'Plates',
    listeners:{
        load:function (store) {
            if (store.getCount() === 0) {
                store.add(wendler.stores.defaults.defaultPlates);
                store.sync();
            }
        }
    }
});
wendler.stores.Plates.load();
util.filebackup.watchStoreSync(wendler.stores.Plates);
util.cloudbackup.watchStoreSync(wendler.stores.Plates);