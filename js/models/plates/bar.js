"use strict";
Ext.ns('biglifts.stores.defaults');
Ext.define('BarWeight', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'weight', type:'float'}
        ],
        proxy:{
            type:'localstorage',
            id:'barweight-proxy'
        }
    }
});

biglifts.stores.defaults.loadDefaultBarWeight = function (store) {
    var settings = biglifts.stores.Settings.first();
    if (settings.get('units') === 'lbs') {
        store.add({weight:45});
    }
    else {
        store.add({weight:20.4});
    }

    store.sync();
};

biglifts.stores.BarWeight = Ext.create('Ext.data.Store', {
    model:'BarWeight',
    listeners:{
        load:function (store) {
            if (store.getCount() === 0) {
                util.withLoadedStore(biglifts.stores.Settings, function () {
                    biglifts.stores.defaults.loadDefaultBarWeight(store);
                });
            }
        }
    }
});
biglifts.stores.push(biglifts.stores.BarWeight);