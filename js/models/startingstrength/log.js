Ext.define('biglifts.models.startingstrength.Log', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'weight', type: 'float'},
            {name: 'sets', type: 'int'},
            {name: 'reps', type: 'int'},
            {name: 'units', type: 'string'},
            {name: 'timestamp', type: 'int'},
            {name: 'workout_id', type: 'int'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'ss-workout-log'
        }
    }
});

Ext.define('biglifts.models.startingstrength.LogStore', {
    extend: 'Ext.data.Store',
    getNewWorkoutId: function () {
        var max = this.max('workout_id');
        return _.isUndefined(max) ? 0 : max + 1;
    },
    getUniqueWorkoutIdsFromModels: function (models) {
        var uniqueWorkoutIds = [];
        _.each(models, function (model) {
            if (_.indexOf(uniqueWorkoutIds, model.get('workout_id')) === -1) {
                uniqueWorkoutIds.push(model.get('workout_id'));
            }
        });

        return uniqueWorkoutIds;
    },
    config: {
        model: 'biglifts.models.startingstrength.Log',
        listeners: {
            addrecords: function (s, records) {
                var me = this;
                _.each(this.getUniqueWorkoutIdsFromModels(records), function (workout_id) {
                    me.syncer.saveWorkout(me.syncer.buildFormattedWorkout(workout_id));
                });
            },
            load: function () {
                this.syncer = Ext.create('biglifts.models.LogStartingStrengthSyncer');

                var me = this;
                me.syncer.getAndSync();

                biglifts.stores.Users.addListener('beforesync', function () {
                    me.syncer.getAndSync();
                });
            },
            removerecords: function (s, models) {
                var me = this;
                var tasks = [];

                _.each(this.getUniqueWorkoutIdsFromModels(models), function (workout_id) {
                    tasks.push(function (callback) {
                        me.syncer.deleteRecord(workout_id, callback);
                    });
                });

                async.series(tasks, function () {
                    me.syncer.postLog();
                });
            }
        }
    }
});

biglifts.stores.ss.Log = Ext.create('biglifts.models.startingstrength.LogStore');
biglifts.stores.push(biglifts.stores.ss.Log);