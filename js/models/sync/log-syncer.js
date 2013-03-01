Ext.define('biglifts.models.Log531Syncer', {
    LOG_URL: 'http://biglifts.herokuapp.com/log',
    getAndSync: function () {
        var me = this;
        biglifts.stores.Users.withUser(function () {
            me.syncRemoteLog(function () {
                me.postLog();
            });
        });
    },
    postLog: function () {
        var me = this;
        biglifts.stores.Users.withUser(function () {
            async.forEachSeries(me.getFormattedLog(), Ext.bind(me.saveWorkout, me));
        });
    },
    deleteRecord: function (record, callback) {
        var me = this;
        biglifts.stores.Users.withUser(function () {
            Ext.Ajax.request({
                url: me.LOG_URL + "/" + record.get('workout_id'),
                method: 'DELETE',
                headers: Ext.create('biglifts.models.HeadersBuilder').buildAuthHeaders(),
                success: function (response) {
                    callback(null);
                },
                failure: function (response) {
                    callback(null);
                },
                scope: this
            });
        });
    },
    saveWorkout: function (workout, callback) {
        Ext.Ajax.request({
            url: this.LOG_URL,
            method: 'POST',
            headers: Ext.create('biglifts.models.HeadersBuilder').buildAuthHeaders(),
            jsonData: workout,
            success: function (response) {
                callback(null);
            },
            failure: function (response) {
                callback(null);
            },
            scope: this
        });
    },
    authorizationChanged: function () {
        biglifts.stores.Users.recreateUser(function () {
            util.whenApplicationReady(function () {
                Ext.Msg.confirm('User Changed', 'User authentication failed. Update username/password?', function (text) {
                    if (text === "yes") {
                        Ext.getCmp('app').setActiveItem(Ext.getCmp('setup'));
                        Ext.getCmp('setup').setActiveItem(Ext.getCmp('user-setup'));
                    }
                });
            });
        });
    },
    syncRemoteLog: function (callback) {
        Ext.Ajax.request({
            url: this.LOG_URL,
            method: 'GET',
            headers: Ext.create('biglifts.models.HeadersBuilder').buildAuthHeaders(),
            success: function (response) {
                this.mergeRemoteLogs(JSON.parse(response.responseText));
                callback(null);
            },
            failure: function (response) {
                if (response.status === 401) {
                    this.authorizationChanged();
                }
            },
            scope: this
        });
    },
    mergeRemoteLogs: function (workouts) {
        var DATE_FORMAT = "MM/dd/yyyy";
        _.each(workouts, function (workout) {
            if (workout["name"] !== '5/3/1') {
                return;
            }

            var log = workout.logs[0];
            var dateAsString = new Date(log.date).toString(DATE_FORMAT);
            var matchingEntry = biglifts.stores.LiftLog.findBy(function (l) {
                return new Date(l.get('timestamp')).toString(DATE_FORMAT) === dateAsString
                    && l.get('liftName') === log.name;
            });

            if (matchingEntry === -1) {
                log.liftName = log.name;
                log.cycle = log.specific_workout.cycle;
                log.week = log.specific_workout.week;
                log.expectedReps = log.specific_workout.expected_reps;
                log.timestamp = log.date;
                biglifts.stores.LiftLog.addLogEntry(log);
            }
        });
    },
    getFormattedLog: function () {
        var me = this;
        var data = [];
        biglifts.stores.LiftLog.each(function (l) {
            data.push(me.buildFormattedWorkout(l));
        });
        return data;
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