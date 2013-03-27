(function () {
    var MODULE_NAME = "Fix Power Clean Percentage migration";
    module(MODULE_NAME);

    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.Routine)).setup531();
            reloadStore(emptyStore(biglifts.stores.ss.Lifts));
            reloadStore(emptyStore(biglifts.stores.ss.WorkoutStore));
        }
    });

    test("should set the power clean work set to 100", function () {
        var migration = Ext.create('biglifts.migrations.FixPowerCleanPercentage');
        var p = migration.getWorkSetPowerClean();
        p.set('percentage', 85);
        p.save();
        biglifts.stores.ss.WorkoutStore.sync();

        migration.run();

        equal(p.get('percentage'), 100);
    });
})();
