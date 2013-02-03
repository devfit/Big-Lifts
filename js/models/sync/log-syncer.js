Ext.define('biglifts.models.Log531Syncer', {
    LOG_URL:'http://localhost:3000/log',
    postLog:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Users, function () {
            Ext.Ajax.request({
                url:me.LOG_URL,
                method:'POST',
                headers:me.buildAuthHeaders(),
                params:me.getFormattedLog(),
                success:function (response) {
                    console.log("SUCCESS");
                },
                failure:function (response) {
//                    console.log("FAILURE");
                },
                scope:me
            });
        });
    },
    getFormattedLog:function () {
        var data = [];
        biglifts.stores.LiftLog.each(function (l) {
            var logEntry = {workout_id:l.get('workout_id'), logs:[
                {
                    sets:1,
                    reps:l.get('reps'),
                    name:l.get('liftName'),
                    weight:l.get('weight'),
                    notes:l.get('notes'),
                    date:l.get('timestamp'),
                    specific:{
                        type:'5/3/1',
                        data:{
                            cycle:l.get('cycle'),
                            expectedReps:l.get('expectedReps'),
                            week:l.get('week')
                        }
                    }
                }
            ]};
            data.push(logEntry);
        });
        return data;
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