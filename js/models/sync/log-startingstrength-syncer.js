Ext.define('biglifts.models.LogStartingStrengthSyncer', {
    extend: 'biglifts.models.LogSyncer',
    store: biglifts.stores.ss.Log,
    workoutName: 'StartingStrength',
    mergeRemoteLogs: function (workouts) {
        var DATE_FORMAT = "MM/dd/yyyy";
        var me = this;
        _.each(workouts, function (workout) {
            if (workout["name"] !== 'StartingStrength') {
                return;
            }

            var log = workout.logs[0];
            var dateAsString = new Date(log.date).toString(DATE_FORMAT);
            var matchingEntry = me.store.findBy(function (l) {
                return new Date(l.get('timestamp')).toString(DATE_FORMAT) === dateAsString;
            });

            if (matchingEntry === -1) {
                var newWorkoutId = biglifts.stores.ss.Log.getNewWorkoutId();
                _.each(workout.logs, function (log) {
                    log.timestamp = log.date;
                    log.workout_id = newWorkoutId;
                    log.synced = true;
                    biglifts.stores.ss.Log.add(log);
                });
            }
            else {
                util.withNoFilters(me.store, function () {
                    me.store.filter(function (l) {
                        return new Date(l.get('timestamp')).toString(DATE_FORMAT) === dateAsString;
                    });
                    me.store.each(function (l) {
                        l.set('synced', true);
                        l.save();
                    });
                });
            }
        });

        biglifts.stores.ss.Log.sync();
        biglifts.stores.ss.Log.fireEvent('beforesync');
    },
    getFormattedLog: function () {
        var me = this;

        var models = [];
        me.store.each(function (m) {
            models.push(m);
        });

        var data = [];
        _.each(me.store.getUniqueWorkoutIdsFromModels(models), function (workout_id) {
            data.push(me.buildFormattedWorkout(workout_id));
        });
        return data;
    },
    buildFormattedWorkout: function (workout_id) {
        var logs = [];
        util.withNoFilters(biglifts.stores.ss.Log, function () {
            biglifts.stores.ss.Log.filter('workout_id', workout_id);

            biglifts.stores.ss.Log.each(function (l) {
                logs.push({
                    name: l.get('name'),
                    weight: l.get('weight'),
                    sets: l.get('sets'),
                    reps: l.get('reps'),
                    units: l.get('units'),
                    date: l.get('timestamp')
                });
            });

            biglifts.stores.ss.Log.clearFilter();
        });

        return {
            workout_id: workout_id,
            name: 'StartingStrength',
            logs: logs
        };
    }
});