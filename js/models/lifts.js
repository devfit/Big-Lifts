"use strict";
Ext.ns('biglifts.stores.lifts');

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
    setupDefaultLifts:function () {
        var me = this;
        util.withNoFilters(me, function () {
            if (me.getCount() === 0) {
                me.add(me.DEFAULT_LIFTS);
                me.sync();
            }
        });
    },
    liftModelMigration:function () {
        var me = this;
        var liftOrdersBroken = this.liftOrdersAreBroken();
        me.each(function (r) {
            if (!r.data.propertyName) {
                var propertyName = me.sanitizePropertyName(r.data.name);
                r.set('propertyName', propertyName);
            }

            if (r.data.cycleIncrease === 0) {
                var defaultModel = _.find(me.DEFAULT_LIFTS, function (d) {
                    return d.data.propertyName === r.data.propertyName
                });
                var cycleIncrease = defaultModel.data.cycleIncrease;
                r.set('cycleIncrease', cycleIncrease);
            }

            if (liftOrdersBroken) {
                r.set('order', r.data.id);
            }
        });

        me.sync();
    },
    liftOrdersAreBroken:function () {
        var orders = _.uniq(_.map(this.getRange(), function (r) {
            return r.data.order;
        }));

        return orders.length !== this.getCount() || _.include(orders, -1);
    },
    sanitizePropertyName:function (propertyName) {
        return propertyName.toLowerCase().replace(/[^a-z\d]/g, '');
    },
    config:{
        model:'Lift',
        listeners:{
            load:function () {
                this.setupDefaultLifts();
                this.liftModelMigration();
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

biglifts.stores.lifts.Lifts = Ext.create('Lifts');
biglifts.stores.push(biglifts.stores.lifts.Lifts);