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
            {name:'reps', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'ss-workout-proxy'
        }
    }
});

Ext.define('biglifts.models.startingstrength.WorkoutStore', {
    extend:'Ext.data.Store',
    config:{
        model:'biglifts.models.startingstrength.Workout',
        listeners:{
            load:function () {
                var me = this;
                if (this.getCount() === 0) {
                    var liftStore = biglifts.stores.ss.Lifts;
                    util.withLoadedStore(liftStore, function () {
                        var squat = liftStore.findRecord('name', 'Squat');
                        var bench = liftStore.findRecord('name', 'Bench');
                        var deadlift = liftStore.findRecord('name', 'Deadlift');
                        var press = liftStore.findRecord('name', 'Press');
                        var powerClean = liftStore.findRecord('name', 'Power Clean');

                        me.add({lift_id:squat.get('id'), name:'A', sets:3, reps:5});
                        me.add({lift_id:bench.get('id'), name:'A', sets:3, reps:5});
                        me.add({lift_id:deadlift.get('id'), name:'A', sets:1, reps:5});

                        me.add({lift_id:squat.get('id'), name:'B', sets:3, reps:5});
                        me.add({lift_id:press.get('id'), name:'B', sets:3, reps:5});
                        me.add({lift_id:powerClean.get('id'), name:'B', sets:5, reps:3});

                        me.sync();
                    });
                }
            }
        },
        sorters:[
            {
                property:'name',
                direction:'ASC'
            }
        ]
    }
});

biglifts.stores.ss.WorkoutStore = Ext.create('biglifts.models.startingstrength.WorkoutStore');
biglifts.stores.push(biglifts.stores.ss.WorkoutStore);