Ext.define('biglifts.models.Log531Syncer', {
    postLog:function () {
        var logData = this.getFormattedLog();
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
                    date:l.get('timestamp')
                }
            ]};
            data.push(logEntry);
        });
        return data;
    }
});