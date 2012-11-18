"use strict";
Ext.ns('biglifts.stores.lifts', 'biglifts.defaults');
Ext.ns('biglifts.stores.migrations', 'biglifts.models.Lift', 'biglifts.stores.recovery');

biglifts.models.Lift.uniquePropertyNameValidation = function (propertyName) {
    return biglifts.stores.lifts.Lifts.find('propertyName', propertyName, 0,
        false, true, true) == -1;
};

biglifts.stores.recovery.setupDefaultLifts = function () {
    util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
        if (biglifts.stores.lifts.Lifts.getCount() == 0) {
            biglifts.stores.lifts.Lifts.add(biglifts.stores.lifts.Lifts.DEFAULT_LIFTS);
            biglifts.stores.lifts.Lifts.sync();
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

biglifts.stores.migrations.liftModelMigration = function () {
    var liftOrdersBroken = biglifts.stores.migrations.liftOrdersAreBroken();

    biglifts.stores.lifts.Lifts.each(function (r) {
        if (!r.data.propertyName) {
            var propertyName = biglifts.models.Lift.sanitizePropertyName(r.data.name);
            r.set('propertyName', propertyName);
        }

        if (r.data.cycleIncrease === 0) {
            var defaultModel = _.find(biglifts.stores.lifts.Lifts.DEFAULT_LIFTS, function (d) {
                return d.data.propertyName === r.data.propertyName
            });
            var cycleIncrease = defaultModel.data.cycleIncrease;
            r.set('cycleIncrease', cycleIncrease);
        }

        if (liftOrdersBroken) {
            r.set('order', r.data.id);
        }
    });

    biglifts.stores.lifts.Lifts.sync();
};

biglifts.stores.migrations.liftOrdersAreBroken = function () {
    var orders = _.uniq(_.map(biglifts.stores.lifts.Lifts.getRange(), function (r) {
        return r.data.order;
    }));

    return orders.length != biglifts.stores.lifts.Lifts.getCount() ||
        _.include(orders, -1);
};

biglifts.models.Lift.sanitizePropertyName = function (propertyName) {
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
    adjustCycleIncreaseForKg:function () {
        var lbToKg = {10:5, 5:2.5};
        this.each(function (r) {
            var newKgIncrease = lbToKg[r.data.cycleIncrease];
            if (typeof(newKgIncrease) !== 'undefined') {
                r.set('cycleIncrease', lbToKg[r.data.cycleIncrease]);
            }
        });
        this.sync();
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
                biglifts.stores.recovery.setupDefaultLifts();
                biglifts.stores.migrations.liftModelMigration();
            }
        },
        sorters:[
            {
                property:'order',
                direction:'ASC'
            }
        ]
    }
})
;

biglifts.stores.lifts.Lifts = Ext.create('Lifts');
biglifts.stores.push(biglifts.stores.lifts.Lifts);