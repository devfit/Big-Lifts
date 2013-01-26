"use strict";
Ext.ns('biglifts.stores.ss');

Ext.define('biglifts.models.startingstrength.Workout', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'name', type:'string'},
            {name:'lift_id', type:'string'},
            {name:'sets', type:'integer'},
            {name:'reps', type:'integer'},
            {name:'percentage', type:'float'},
            {name:'warmup', type:'boolean'},
            {name:'order', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'ss-workout-proxy'
        }
    }
});

Ext.define('biglifts.models.startingstrength.WorkoutStore', {
    extend:'Ext.data.Store',
    addWorkoutLifts:function (isWarmup, template) {
        var me = this;
        util.withLoadedStore(biglifts.stores.ss.Lifts, function () {
            biglifts.stores.ss.Lifts.each(function (lift) {
                _.each(['A', 'B'], function (name) {
                    var liftName = lift.get('name').replace(/\s/g, "").toLowerCase();
                    var newSets = _.filter(biglifts.models.startingstrength.workouts[template][liftName], function (s) {
                        return s.name === name && s.warmup === isWarmup
                    });

                    _.each(newSets, function (s) {
                        s.lift_id = lift.get('id');
                        me.add(s);
                    });
                });
            });
            me.sync();
        });
    },
    addWarmup:function () {
        this.addWorkoutLifts(true, 'standard');
    },
    addWorkSets:function () {
        this.addWorkoutLifts(false, 'standard');
    },
    config:{
        model:'biglifts.models.startingstrength.Workout',
        listeners:{
            load:function () {
                var me = this;
                if (me.getCount() === 0) {
                    me.addWarmup();
                    me.addWorkSets();
                }
            }
        },
        sorters:[
            {
                sorterFn:function (c1, c2) {
                    if (c2.get('name') !== c1.get('name')) {
                        return c2.get('name') === 'B' ? 1 : -1;
                    }

                    var lift1 = biglifts.stores.ss.Lifts.findRecord('id', c1.get('lift_id'));
                    var lift2 = biglifts.stores.ss.Lifts.findRecord('id', c2.get('lift_id'));

                    if (lift1 === lift2) {
                        return c1.get('order') - c2.get('order');
                    }
                    else {
                        var liftOrders = ['Squat', 'Bench', 'Press', 'Deadlift', 'Power Clean'];
                        var lift1index = _.indexOf(liftOrders, lift1.get('name'));
                        var lift2index = _.indexOf(liftOrders, lift2.get('name'));

                        return lift1index - lift2index;
                    }
                }
            }
        ]
    }
});

biglifts.stores.ss.WorkoutStore = Ext.create('biglifts.models.startingstrength.WorkoutStore');
biglifts.stores.push(biglifts.stores.ss.WorkoutStore);