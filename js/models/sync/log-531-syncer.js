Ext.define('biglifts.models.Log531Syncer', {
    extend: 'biglifts.models.LogSyncer',
    store: biglifts.stores.LiftLog,
    workoutName: '5/3/1',
    mergeRemoteLogs: function (workouts) {
        var DATE_FORMAT = "MM/dd/yyyy";
        var me = this;
        _.each(workouts, function (workout) {
            if (workout["name"] !== '5/3/1') {
                return;
            }

            var log = workout.logs[0];
            var dateAsString = new Date(log.date).toString(DATE_FORMAT);
            var matchingEntry = me.store.findBy(function (l) {
                return new Date(l.get('timestamp')).toString(DATE_FORMAT) === dateAsString
                    && l.get('liftName') === log.name;
            });

            if (matchingEntry === -1) {
                log.liftName = log.name;
                log.cycle = log.specific_workout.cycle;
                log.week = log.specific_workout.week;
                log.expectedReps = log.specific_workout.expected_reps;
                log.timestamp = log.date;
                me.store.addLogEntry(log);
            }
        });
    },
    buildFormattedWorkout: function (log_entry) {
        return {
            workout_id: log_entry.get('workout_id'),
            name: '5/3/1',
            logs: [
                {
                    sets: 1,
                    reps: log_entry.get('reps'),
                    name: log_entry.get('liftName'),
                    weight: log_entry.get('weight'),
                    notes: log_entry.get('notes'),
                    date: log_entry.get('timestamp'),
                    specific: {
                        type: '5/3/1',
                        data: {
                            cycle: log_entry.get('cycle'),
                            expected_reps: log_entry.get('expectedReps'),
                            week: log_entry.get('week')
                        }
                    }
                }
            ]};
    }
});