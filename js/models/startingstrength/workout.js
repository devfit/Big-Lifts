"use strict";
Ext.ns('biglifts.stores.ss');

Ext.define('biglifts.models.startingstrength.Workout', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'lift_id', type: 'string'},
            {name: 'sets', type: 'integer'},
            {name: 'reps', type: 'integer'},
            {name: 'percentage', type: 'float'},
            {name: 'warmup', type: 'boolean'},
            {name: 'order', type: 'integer'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'ss-workout-proxy'
        }
    }
});

Ext.define('biglifts.models.startingstrength.WorkoutStore', {
    extend: 'Ext.data.Store',
    WARMUPS: {
        //https://docs.google.com/spreadsheet/ccc?key=0AmWyzQPqnP1wcGxsU1FwNlpITmFBT1AzRVI0WENQSXc&hl=en#gid=0
        squat: [
            {sets: 2, reps: 5, name: 'A', percentage: 0, warmup: true},
            {sets: 1, reps: 5, name: 'A', percentage: 40, warmup: true},
            {sets: 1, reps: 3, name: 'A', percentage: 60, warmup: true},
            {sets: 1, reps: 2, name: 'A', percentage: 80, warmup: true},
            {sets: 2, reps: 5, name: 'B', percentage: 0, warmup: true},
            {sets: 1, reps: 5, name: 'B', percentage: 40, warmup: true},
            {sets: 1, reps: 3, name: 'B', percentage: 60, warmup: true},
            {sets: 1, reps: 2, name: 'B', percentage: 80, warmup: true}
        ],
        bench: [
            {sets: 2, reps: 5, name: 'A', percentage: 0, warmup: true},
            {sets: 1, reps: 5, name: 'A', percentage: 50, warmup: true},
            {sets: 1, reps: 3, name: 'A', percentage: 70, warmup: true},
            {sets: 1, reps: 2, name: 'A', percentage: 90, warmup: true}
        ],
        deadlift: [
            {sets: 2, reps: 5, name: 'A', percentage: 40, warmup: true},
            {sets: 1, reps: 3, name: 'A', percentage: 60, warmup: true},
            {sets: 1, reps: 2, name: 'A', percentage: 85, warmup: true}
        ],
        press: [
            {sets: 2, reps: 5, name: 'B', percentage: 0, warmup: true},
            {sets: 1, reps: 5, name: 'B', percentage: 55, warmup: true},
            {sets: 1, reps: 3, name: 'B', percentage: 70, warmup: true},
            {sets: 1, reps: 2, name: 'B', percentage: 85, warmup: true}
        ],
        powerclean: [
            {sets: 2, reps: 5, name: 'B', percentage: 0, warmup: true},
            {sets: 1, reps: 5, name: 'B', percentage: 55, warmup: true},
            {sets: 1, reps: 3, name: 'B', percentage: 70, warmup: true},
            {sets: 1, reps: 2, name: 'B', percentage: 85, warmup: true}
        ]
    },
    addWarmup: function (callback) {
        var me = this;
        util.withLoadedStore(biglifts.stores.ss.Lifts, function () {
            util.withNoFilters(me, function () {
                biglifts.stores.ss.Lifts.each(function (lift) {
                    _.each(['A', 'B'], function (name) {
                        me.filter('name', name);
                        me.filter('lift_id', lift.get('id'));
                        var liftName = lift.get('name').replace(/\s/g, "").toLowerCase();
                        var newSets = _.filter(me.WARMUPS[liftName], function (s) {
                            return s.name === name
                        });
                        var i = 0;
                        _.each(newSets, function (s) {
                            s.order = i++;
                            s.lift_id = lift.get('id');
                            me.add(s);
                        });
                        me.clearFilter();
                    });
                });
            });
            me.sync();
            callback();
        });
    },
    addWorkSets: function () {
        var liftStore = biglifts.stores.ss.Lifts;
        var me = this;
        util.withLoadedStore(liftStore, function () {
            var squat = liftStore.findRecord('name', 'Squat');
            var bench = liftStore.findRecord('name', 'Bench');
            var deadlift = liftStore.findRecord('name', 'Deadlift');
            var press = liftStore.findRecord('name', 'Press');
            var powerClean = liftStore.findRecord('name', 'Power Clean');

            me.add({lift_id: squat.get('id'), name: 'A', sets: 3, reps: 5, percentage: 100, warmup: false, order: 0});
            me.add({lift_id: squat.get('id'), name: 'B', sets: 3, reps: 5, percentage: 100, warmup: false, order: 0});
            me.add({lift_id: bench.get('id'), name: 'A', sets: 3, reps: 5, percentage: 100, warmup: false, order: 1});
            me.add({lift_id: deadlift.get('id'), name: 'A', sets: 1, reps: 5, percentage: 100, warmup: false, order: 2});
            me.add({lift_id: press.get('id'), name: 'B', sets: 3, reps: 5, percentage: 100, warmup: false, order: 1});
            me.add({lift_id: powerClean.get('id'), name: 'B', sets: 5, reps: 3, percentage: 100, warmup: false, order: 2});

            me.sync();
        });
    },
    config: {
        model: 'biglifts.models.startingstrength.Workout',
        listeners: {
            load: function () {
                var me = this;
                if (me.getCount() === 0) {
                    me.addWarmup(function () {
                        me.addWorkSets();
                    });
                }
            }
        },
        sorters: [
            {
                sorterFn: function (c1, c2) {
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