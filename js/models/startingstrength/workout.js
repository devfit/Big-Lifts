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
    addWarmup:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.ss.Lifts, function () {
            util.withNoFilters(me, function () {
                biglifts.stores.ss.Lifts.each(function (lift) {
                    _.each(['A', 'B'], function (name) {
                        me.filter('name', name);
                        me.filter('lift_id', lift.get('id'));
                        var liftName = lift.get('name').replace(/\s/g, "").toLowerCase();
                        var newSets = _.filter(biglifts.models.startingstrength.workouts.standard[liftName], function (s) {
                            return s.name === name && s.warmup === true
                        });

                        _.each(newSets, function (s) {
                            s.lift_id = lift.get('id');
                            me.add(s);
                        });

                        me.clearFilter();
                    });
                });
            });
            me.sync();
        });
    },
    addWorkSets:function () {
        var liftStore = biglifts.stores.ss.Lifts;
        var me = this;

        util.withLoadedStore(liftStore, function () {
            var squat = liftStore.findRecord('name', 'Squat');
            var bench = liftStore.findRecord('name', 'Bench');
            var deadlift = liftStore.findRecord('name', 'Deadlift');
            var press = liftStore.findRecord('name', 'Press');
            var powerClean = liftStore.findRecord('name', 'Power Clean');

            me.add({lift_id:squat.get('id'), name:'A', sets:3, reps:5, percentage:100, warmup:false, order:4});
            me.add({lift_id:squat.get('id'), name:'B', sets:3, reps:5, percentage:100, warmup:false, order:4});
            me.add({lift_id:bench.get('id'), name:'A', sets:3, reps:5, percentage:100, warmup:false, order:4});
            me.add({lift_id:deadlift.get('id'), name:'A', sets:1, reps:5, percentage:100, warmup:false, order:3});
            me.add({lift_id:press.get('id'), name:'B', sets:3, reps:5, percentage:100, warmup:false, order:4});
            me.add({lift_id:powerClean.get('id'), name:'B', sets:5, reps:3, percentage:100, warmup:false, order:4});

            me.sync();
        });
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
                        var liftOrders = ['Squat', 'Bench', 'Deadlift', 'Press', 'Power Clean'];
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