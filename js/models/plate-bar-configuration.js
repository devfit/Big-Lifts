"use strict";
Ext.ns('wendler.stores');
Ext.define('BarWeight', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'id', type:'integer'},
            {name:'weight', type:'float'}
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
                if (settings.units === 'lbs') {
                    console.log("Using lbs");
                    store.add({weight:45});
                }
                else {
                    console.log("Using kg");
                    store.add({weight:20.4});
                }

                store.sync();
            }
        }
    }
});
wendler.stores.BarWeight.load();
util.filebackup.watchStoreSync(wendler.stores.BarWeight);