(function () {
    var MODULE_NAME = "Add Workout Id to Log";
    module(MODULE_NAME);
    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.Routine)).setup531();
            emptyStore(reloadStore(biglifts.stores.LiftLog));
        }
    });

    test("should add workout ids to existing log entries", function () {
        biglifts.stores.LiftLog.add({liftName: 'Squat'});
        biglifts.stores.LiftLog.sync();
        equal(biglifts.stores.LiftLog.first().get('workout_id'), null);

        Ext.create('biglifts.migrations.AddWorkoutIdToLog').run();

        equal(biglifts.stores.LiftLog.first().get('workout_id'), 0);
    });
})();