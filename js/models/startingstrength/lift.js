"use strict";
Ext.ns('biglifts.stores.ss');

Ext.define('biglifts.models.startingstrength.Lift', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'weight', type: 'float'},
            {name: 'increase', type: 'float'},
            {name: 'order', type: 'integer'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'ss-lift-proxy'
        }
    }
});

Ext.define('biglifts.models.startingstrength.LiftStore', {
    extend: 'Ext.data.Store',
    adjustUnits: function () {
        var me = this;

        util.withLoadedStore(biglifts.stores.GlobalSettings, function () {
            var units = biglifts.stores.GlobalSettings.getUnits();
            var newLifts = biglifts.models.startingstrength.lifts.standard[units];
            _.each(newLifts, function (lift) {
                var record = me.findRecord('name', lift.name);
                if (record) {
                    record.set('increase', lift.increase);
                }
            });
            me.sync();
        });
    },
    config: {
        model: 'biglifts.models.startingstrength.Lift',
        listeners: {
            load: function () {
                var me = this;
                util.withLoadedStore(biglifts.stores.GlobalSettings, function () {
                    if (me.getCount() === 0) {
                        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').setupLifts('standard');
                    }
                });
            }
        },
        sorters: [
            {
                property: 'name',
                direction: 'ASC'
            }
        ]
    }
});

biglifts.stores.ss.Lifts = Ext.create('biglifts.models.startingstrength.LiftStore');
biglifts.stores.push(biglifts.stores.ss.Lifts);

util.whenApplicationReady(function () {
    biglifts.stores.GlobalSettings.addListener('beforesync', biglifts.stores.ss.Lifts.adjustUnits, biglifts.stores.ss.Lifts);
});