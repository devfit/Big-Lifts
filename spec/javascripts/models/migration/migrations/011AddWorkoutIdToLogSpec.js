describe("Add Workout Id to Log", function () {
    beforeEach(function () {
        this.routines = reloadStore(biglifts.stores.Routine);
        this.routines.add({name:'5/3/1'});
        this.routines.sync();
        reloadStore(biglifts.stores.LiftLog);
        biglifts.stores.LiftLog.removeAll();
        biglifts.stores.LiftLog.sync();
    });

    it("should add workout ids to existing log entries", function () {
        biglifts.stores.LiftLog.add({liftName:'Squat'});
        biglifts.stores.LiftLog.sync();
        expect(biglifts.stores.LiftLog.first().get('workout_id')).toEqual(null);

        Ext.create('biglifts.migrations.AddWorkoutIdToLog').run();

        expect(biglifts.stores.LiftLog.first().get('workout_id')).toEqual(0);
    });
});