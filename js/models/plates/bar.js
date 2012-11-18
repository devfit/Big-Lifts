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

Ext.define("BarWeightStore", {
    extend:"Ext.data.Store",
    DEFAULT_BAR_WEIGHT_LBS:45,
    DEFAULT_BAR_WEIGHT_KG:20.4,
    loadDefaultBarWeight:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Settings, function () {
            var settings = biglifts.stores.Settings.first();
            if (settings.get('units') === 'lbs') {
                me.add({weight:me.DEFAULT_BAR_WEIGHT_LBS});
            }
            else {
                me.add({weight:me.DEFAULT_BAR_WEIGHT_KG});
            }
            me.sync();
        });
    },
    config:{
        model:'BarWeight',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.loadDefaultBarWeight();
                }
            }
        }
    }
});

biglifts.stores.BarWeight = Ext.create('BarWeightStore');
biglifts.stores.push(biglifts.stores.BarWeight);