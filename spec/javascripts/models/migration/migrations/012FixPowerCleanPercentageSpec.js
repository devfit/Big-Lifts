describe("Fix Power Clean Percentage migration", function () {
    beforeEach(function () {
        this.routines = reloadStore(biglifts.stores.Routine);
        this.routines.add({name:'5/3/1'});
        this.routines.sync();
        reloadStore(biglifts.stores.ss.Lifts);
        reloadStore(biglifts.stores.ss.WorkoutStore);
    });

    it("should set the power clean work set to 100", function () {
        var migration = Ext.create('biglifts.migrations.FixPowerCleanPercentage');
        var p = migration.getWorkSetPowerClean();
        p.set('percentage', 85);
        p.save();
        biglifts.stores.ss.WorkoutStore.sync();

        migration.run();

        expect(p.get('percentage')).toEqual(100);
    });
});