Ext.define('biglifts.models.Log531Syncer', {
    LOG_URL:'http://biglifts.herokuapp.com/log',
    getAndSync:function () {
        var me = this;
        me.syncRemoteLog(function () {
            me.postLog();
        });
    },
    postLog:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Users, function () {
            async.forEachSeries(me.getFormattedLog(), Ext.bind(me.saveWorkout, me));
        });
    },
    saveWorkout:function (workout, callback) {
        Ext.Ajax.request({
            url:this.LOG_URL,
            method:'POST',
            headers:this.buildAuthHeaders(),
            jsonData:workout,
            success:function (response) {
                callback(null);
            },
            failure:function (response) {
                callback(null);
            },
            scope:this
        });
    },
    syncRemoteLog:function (callback) {
        Ext.Ajax.request({
            url:this.LOG_URL,
            method:'GET',
            headers:this.buildAuthHeaders(),
            success:function (response) {
                this.mergeRemoteLogs(JSON.parse(response.responseText));
                callback(null);
            },
            failure:function () {
            },
            scope:this
        });
    },
    mergeRemoteLogs:function (workouts) {
        var DATE_FORMAT = "MM/dd/yyyy";
        _.each(workouts, function (workout) {
            var log = workout.logs[0];
            var dateAsString = new Date(log.timestamp).toString(DATE_FORMAT);
            var matchingDate = biglifts.stores.LiftLog.findBy(function (l) {
                return new Date(l.get('timestamp')).toString(DATE_FORMAT) === dateAsString;
            });

            if (matchingDate === -1) {
                log.liftName = log.name;
                log.cycle = log.specific_workout.cycle;
                log.week = log.specific_workout.week;
                log.expectedReps = log.specific_workout.expected_reps;
                biglifts.stores.LiftLog.addLogEntry(log);
            }
        });
    },
    getFormattedLog:function () {
        var me = this;
        var data = [];
        biglifts.stores.LiftLog.each(function (l) {
            data.push(me.buildFormattedWorkout(l));
        });
        return data;
    },
    buildFormattedWorkout:function (log_entry) {
        return {
            workout_id:log_entry.get('workout_id'), logs:[
                {
                    sets:1,
                    reps:log_entry.get('reps'),
                    name:log_entry.get('liftName'),
                    weight:log_entry.get('weight'),
                    notes:log_entry.get('notes'),
                    date:log_entry.get('timestamp'),
                    specific:{
                        type:'5/3/1',
                        data:{
                            cycle:log_entry.get('cycle'),
                            expected_reps:log_entry.get('expectedReps'),
                            week:log_entry.get('week')
                        }
                    }
                }
            ]};
    },
    buildAuthHeaders:function () {
        var user = biglifts.stores.Users.first();
        if (user) {
            var username = user.get('username');
            var password = user.get('password');
            var key = Base64.encode(username + ":" + password);
            return {Authorization:"Basic " + key};
        }
        else {
            return {};
        }
    }
});