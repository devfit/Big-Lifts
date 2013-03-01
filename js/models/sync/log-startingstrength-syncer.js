Ext.define('biglifts.models.LogStartingStrengthSyncer', {
    extend: 'biglifts.models.LogSyncer',
    store: biglifts.stores.ss.CombinedLog,
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
            }
        });
    },
    buildFormattedWorkout: function (combined_log_entry) {
        var workout_id = combined_log_entry.get('workout_id');

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