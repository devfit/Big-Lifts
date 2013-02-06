Ext.define('biglifts.models.Log531Syncer', {
    LOG_URL:'http://biglifts.herokuapp.com/log',
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