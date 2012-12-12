"use strict";
Ext.ns('biglifts.stores.defaults');
Ext.define('BarWeight', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'weight', type: 'float'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'barweight-proxy'
        }
    }
});

Ext.define("BarWeightStore", {
    extend: "Ext.data.Store",
    DEFAULT_BAR_WEIGHT_LBS: 45,
    DEFAULT_BAR_WEIGHT_KG: 20.4,
    loadDefaultBarWeight: function () {
        var me = this;
        util.withLoadedStoreAndMigrations(biglifts.stores.GlobalSettings, function () {
            if (biglifts.stores.GlobalSettings.getUnits() === 'lbs') {
                me.add({weight: me.DEFAULT_BAR_WEIGHT_LBS});
            }
            else {
                me.add({weight: me.DEFAULT_BAR_WEIGHT_KG});
            }
            me.sync();
        });
    },
    adjustPlatesForUnits: function (units) {
        util.withLoadedStore(biglifts.stores.BarWeight, function () {
            var barWeight = biglifts.stores.BarWeight.first();
            if (units === 'kg' && barWeight.get('weight') === 45) {
                barWeight.set('weight', biglifts.stores.BarWeight.DEFAULT_BAR_WEIGHT_KG);
            }
            else if (units === 'lb' && barWeight.get('weight') === biglifts.stores.BarWeight.DEFAULT_BAR_WEIGHT_KG) {
                barWeight.set('weight', 45);
            }

            biglifts.stores.BarWeight.sync();
        });
    },
    config: {
        model: 'BarWeight',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.loadDefaultBarWeight();
                }
            }
        }
    }
});

biglifts.stores.BarWeight = Ext.create('BarWeightStore');
biglifts.stores.push(biglifts.stores.BarWeight);
biglifts.stores.GlobalSettings.addListener('beforesync', function () {
    if (this.getCount() !== 0) {
        biglifts.stores.BarWeight.adjustPlatesForUnits(biglifts.stores.GlobalSettings.getUnits());
    }
});