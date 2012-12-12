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
            {name: 'increase', type: 'float'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'ss-lift-proxy'
        }
    }
});

Ext.define('biglifts.models.startingstrength.LiftStore', {
    extend: 'Ext.data.Store',
    DEFAULT_LIFTS_LB: [
        {
            name: 'Squat',
            weight: 200,
            increase: 10
        },
        {
            name: 'Bench',
            weight: 135,
            increase: 5
        },
        {
            name: 'Deadlift',
            weight: 225,
            increase: 5
        },
        {
            name: 'Press',
            weight: 100,
            increase: 5
        },
        {
            name: 'Power Clean',
            weight: 135,
            increase: 5
        }
    ],
    DEFAULT_LIFTS_KG: [
        {
            name: 'Squat',
            weight: 100,
            increase: 5
        },
        {
            name: 'Bench',
            weight: 70,
            increase: 2
        },
        {
            name: 'Deadlift',
            weight: 110,
            increase: 2
        },
        {
            name: 'Press',
            weight: 50,
            increase: 2
        },
        {
            name: 'Power Clean',
            weight: 70,
            increase: 2
        }
    ],
    changeUnitsTo: function (units) {
        var me = this;
        var newLifts = units === "lbs" ? this.DEFAULT_LIFTS_LB : this.DEFAULT_LIFTS_KG;
        _.each(newLifts, function (lift) {
            me.findRecord('name', lift.name).set('increase', lift.increase);
        });
        me.sync();
    },
    config: {
        model: 'biglifts.models.startingstrength.Lift',
        listeners: {
            load: function () {
                var me = this;
                if (me.getCount() === 0) {
                    util.withLoadedStoreAndMigrations(biglifts.stores.GlobalSettings, function () {
                        if (biglifts.stores.GlobalSettings.getUnits() === 'lbs') {
                            me.add(me.DEFAULT_LIFTS_LB);
                            me.sync();
                        }
                        else {
                            me.add(me.DEFAULT_LIFTS_KG);
                            me.sync();
                        }
                    });
                }
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