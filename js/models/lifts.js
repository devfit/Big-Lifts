"use strict";
Ext.ns('wendler.stores.lifts', 'wendler.defaults');
Ext.ns('wendler.stores.migrations', 'wendler.models.Lift', 'wendler.stores.recovery');

wendler.models.Lift.uniquePropertyNameValidation = function (propertyName) {
    var liftIsUnique = wendler.stores.lifts.Lifts.find('propertyName', propertyName, 0,
        false, true, true) == -1;

    return liftIsUnique;
};

wendler.stores.recovery.setupDefaultLifts = function () {
    util.withNoFilters(wendler.stores.lifts.Lifts, function () {
        if (wendler.stores.lifts.Lifts.getCount() == 0) {
            wendler.stores.lifts.Lifts.add(wendler.defaults.lifts);
            wendler.stores.lifts.Lifts.sync();
        }
    });
};

Ext.define('Lift', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'id', type:'integer'},
            {name:'name', type:'string'},
            {name:'propertyName', type:'string'},
            {name:'max', type:'float'},
            {name:'cycleIncrease', type:'float'},
            {name:'order', type:'int', defaultValue:-1}
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

wendler.defaults.lifts = [
    Ext.ModelMgr.create({name:'Squat', max:200, propertyName:'squat', cycleIncrease:10, order:0}, 'Lift'),
    Ext.ModelMgr.create({name:'Deadlift', max:300, propertyName:'deadlift', cycleIncrease:10, order:1}, 'Lift'),
    Ext.ModelMgr.create({name:'Press', max:150, propertyName:'press', cycleIncrease:5, order:2}, 'Lift'),
    Ext.ModelMgr.create({name:'Bench', max:175, propertyName:'bench', cycleIncrease:5, order:3}, 'Lift')
];

wendler.stores.migrations.liftModelMigration = function () {
    var liftOrdersBroken = wendler.stores.migrations.liftOrdersAreBroken();

    wendler.stores.lifts.Lifts.each(function (r) {
        if (!r.data.propertyName) {
            var propertyName = wendler.models.Lift.sanitizePropertyName(r.data.name);
            r.set('propertyName', propertyName);
            r.save();
        }

        if (r.data.cycleIncrease === 0) {
            var defaultModel = _.find(wendler.defaults.lifts, function (d) {
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

wendler.stores.lifts.Lifts = Ext.create('Ext.data.Store', {
    model:'Lift',
    listeners:{
        load:function () {
            wendler.stores.recovery.setupDefaultLifts();
            wendler.stores.migrations.liftModelMigration();
        }
    },
    sorters:[
        {
            property:'order',
            direction:'ASC'
        }
    ]
});
wendler.stores.lifts.Lifts.load();
util.filebackup.watchStoreSync(wendler.stores.lifts.Lifts);

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