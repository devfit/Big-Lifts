Ext.define('biglifts.migrations.AddWorkoutIdToLog', {
    run:function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.withLoadedStore(biglifts.stores.LiftLog, function () {
                    var i = 0;
                    biglifts.stores.LiftLog.each(function (l) {
                        l.set('workout_id', i++);
                    });
                    biglifts.stores.LiftLog.sync();
                });
            }
        });
    }
});