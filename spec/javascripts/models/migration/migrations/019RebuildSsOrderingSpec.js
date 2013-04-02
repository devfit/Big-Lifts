(function () {
    var MODULE_NAME = "RebuildSsOrdering";
    module(MODULE_NAME);

    var migration;
    var workouts;

    QUnit.testStart(function (detail) {
        if (detail.module === MODULE_NAME) {
            migration = Ext.create('biglifts.migrations.RebuildSsWorkouts');
            reloadStore(emptyStore(biglifts.stores.ss.Lifts));
            workouts = reloadStore(emptyStore(biglifts.stores.ss.WorkoutStore));
        }
    });

    test('should rebuild workouts', function () {
        workouts.remove(workouts.first());
        workouts.first().set('order', 999);
        workouts.sync();

        migration.run();

        equal(workouts.getCount(), 29);
        equal(workouts.findRecord('order', 999), null);
    });
})();