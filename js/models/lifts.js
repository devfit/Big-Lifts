"use strict";
Ext.ns('wendler.stores.lifts', 'wendler.defaults');
Ext.ns('wendler.stores.migrations', 'wendler.models.Lift', 'wendler.stores.recovery');

wendler.models.Lift.uniquePropertyNameValidation = function (propertyName) {
    return wendler.stores.lifts.Lifts.find('propertyName', propertyName, 0,
        false, true, true) == -1;
};

wendler.stores.recovery.setupDefaultLifts = function () {
    util.withNoFilters(wendler.stores.lifts.Lifts, function () {
        if (wendler.stores.lifts.Lifts.getCount() == 0) {
            wendler.stores.lifts.Lifts.add(wendler.stores.lifts.Lifts.DEFAULT_LIFTS);
            wendler.stores.lifts.Lifts.sync();
        }
    });
};

Ext.define('Lift', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'name', type:'string'},
            {name:'propertyName', type:'string'},
            {name:'max', type:'float'},
            {name:'cycleIncrease', type:'float'},
            {name:'order', type:'int', defaultValue:-1},
            {name:'enabled', type:'boolean', defaultValue:true},
            {name:'customBarWeight', type:'int', defaultValue:null}
        ],
        validations:[
            {field:'propertyName', type:'custom', message:'nonunique',
                fn:wendler.models.Lift.uniquePropertyNameValidation},
            {field:'propertyName', type:'presence'},
            {field:'max', type:'presence'},
            {field:'cycleIncrease', type:'presence'}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-proxy'
        }
    }
});

wendler.stores.migrations.liftModelMigration = function () {
    var liftOrdersBroken = wendler.stores.migrations.liftOrdersAreBroken();

    wendler.stores.lifts.Lifts.each(function (r) {
        if (!r.data.propertyName) {
            var propertyName = wendler.models.Lift.sanitizePropertyName(r.data.name);
            r.set('propertyName', propertyName);
            r.save();
        }

        if (r.data.cycleIncrease === 0) {
            var defaultModel = _.find(wendler.stores.lifts.Lifts.DEFAULT_LIFTS, function (d) {
                return d.data.propertyName === r.data.propertyName
            });
            var cycleIncrease = defaultModel.data.cycleIncrease;
            r.set('cycleIncrease', cycleIncrease);
            r.save();
        }

        if (liftOrdersBroken) {
            r.set('order', r.data.id);
            r.save();
        }
    });
};

wendler.stores.migrations.liftOrdersAreBroken = function () {
    var orders = _.uniq(_.map(wendler.stores.lifts.Lifts.getRange(), function (r) {
        return r.data.order;
    }));

    return orders.length != wendler.stores.lifts.Lifts.getCount() ||
        _.include(orders, -1);
};

wendler.models.Lift.sanitizePropertyName = function (propertyName) {
    return propertyName.toLowerCase().replace(/[^a-z\d]/g, '');
};

Ext.define('Lifts', {
    extend:'Ext.data.Store',
    getUniqueLiftNames:function () {
        var liftNameSet = {};
        this.each(function (r) {
            liftNameSet[r.get('name')] = 1;
        });
        return _.keys(liftNameSet);
    },
    DEFAULT_LIFTS:[
        Ext.create('Lift', {name:'Squat', max:200, propertyName:'squat', cycleIncrease:10, order:0}),
        Ext.create('Lift', {name:'Deadlift', max:300, propertyName:'deadlift', cycleIncrease:10, order:1}),
        Ext.create('Lift', {name:'Press', max:150, propertyName:'press', cycleIncrease:5, order:2}),
        Ext.create('Lift', {name:'Bench', max:175, propertyName:'bench', cycleIncrease:5, order:3})
    ],
    config:{
        model:'Lift',
        listeners:{
            load:function () {
                wendler.stores.recovery.setupDefaultLifts();
                wendler.stores.migrations.liftModelMigration();
                wendler.stores.lifts.EnabledLifts.load();
            },
            beforesync:function () {
                wendler.stores.lifts.EnabledLifts.fireEvent('beforesync');
            },
            write:function () {
                wendler.stores.lifts.EnabledLifts.load();
            }
        },
        sorters:[
            {
                property:'order',
                direction:'ASC'
            }
        ]
    }
});

wendler.stores.lifts.Lifts = Ext.create('Lifts');
wendler.stores.lifts.EnabledLifts = Ext.create('Ext.data.Store', {
    model:'Lift',
    listeners:{
        beforesync:function () {
            this.filter({property:'enabled', value:true});
        }
    },
    sorters:[
        {
            property:'order',
            direction:'ASC'
        }
    ]
});
wendler.stores.push(wendler.stores.lifts.Lifts);

wendler.stores.lifts.adjustCycleIncreaseForKg = function () {
    var lbToKg = {10:5, 5:2.5};
    wendler.stores.lifts.Lifts.each(function (r) {
        var newKgIncrease = lbToKg[r.data.cycleIncrease];
        if (typeof(newKgIncrease) !== 'undefined') {
            r.set('cycleIncrease', lbToKg[r.data.cycleIncrease]);
            r.save();
        }
    });
};