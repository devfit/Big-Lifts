"use strict";
Ext.ns('wendler.stores.defaults', 'wendler.stores.plates');
Ext.define('BarWeight', {
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
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
                if (wendler.stores.Settings.getCount() > 0) {
                    wendler.stores.defaults.loadDefaultBarWeight(store);
                }
                else {
                    wendler.stores.Settings.addListener('load', function () {
                        wendler.stores.defaults.loadDefaultBarWeight(store);
                    });
                }
            }
        }
    }
});
wendler.stores.push(wendler.stores.BarWeight);

Ext.define('Plates', {
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'weight', type:'float'},
            {name:'weightInLbs', type:'float'},
            {name:'units', type:'string'},
            {name:'count', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'plates-proxy'
        }
    }
});

wendler.stores.defaults.defaultPlates = [
    {weight:45, count:6},
    {weight:35, count:6},
    {weight:25, count:6},
    {weight:10, count:6},
    {weight:5, count:6},
    {weight:2.5, count:6}
];

wendler.stores.plates.migrateWeightInLbsToWeightAndUnits = function (store) {
    store.each(function (record) {
        var weightInLbs = record.get('weightInLbs');
        if (!_.isUndefined(weightInLbs) && !_.isNull(weightInLbs)) {
            record.set('weight', weightInLbs);
            record.set('weightInLbs', null);
            record.save();
        }
    });
    store.sync();
};

wendler.stores.Plates = Ext.create('Ext.data.Store', {
    model:'Plates',
    listeners:{
        load:function (store) {
            if (store.getCount() === 0) {
                store.add(wendler.stores.defaults.defaultPlates);
                store.sync();
            }
            else {
                wendler.stores.plates.migrateWeightInLbsToWeightAndUnits(this);
            }
        }
    }
});
wendler.stores.push(wendler.stores.Plates);