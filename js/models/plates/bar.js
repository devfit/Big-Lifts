"use strict";
Ext.ns('wendler.stores.defaults');
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

wendler.stores.defaults.loadDefaultBarWeight = function (store) {
    var settings = wendler.stores.Settings.first();
    if (settings.get('units') === 'lbs') {
        store.add({weight:45});
    }
    else {
        store.add({weight:20.4});
    }

    store.sync();
};

wendler.stores.BarWeight = Ext.create('Ext.data.Store', {
    model:'BarWeight',
    listeners:{
        load:function (store) {
            if (store.getCount() === 0) {
                util.withLoadedStore(wendler.stores.Settings, function () {
                    wendler.stores.defaults.loadDefaultBarWeight(store);
                });
            }
        }
    }
});
wendler.stores.push(wendler.stores.BarWeight);