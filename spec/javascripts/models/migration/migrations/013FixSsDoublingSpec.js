(function () {
    var MODULE_NAME = "Fix Ss Doubling";
    module(MODULE_NAME);
    var lifts;
    var workouts;
    var migration;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.Routine)).setup531();
            lifts = reloadStore(biglifts.stores.ss.Lifts);
            workouts = reloadStore(emptyStore(reloadStore(biglifts.stores.ss.WorkoutStore)));
            migration = Ext.create('biglifts.migrations.FixSsDoubling');
        }
    });

    var setupBadData = function () {
        workouts.each(function (w) {
            var clone = _.clone(w.data);
            clone.id = undefined;
            workouts.add(clone);
        }, this);
        workouts.sync();

        equal(workouts.getCount(), 58);
    };

    test('should get the expected workout counts', function () {
        deepEqual(migration.getTemplateWorkoutCounts(), [29, 28]);
    });

    test("should detect a bad ss workout configuration", function () {
        equal(workouts.getCount(), 29);
        setupBadData.apply(this);
        equal(migration.hasBadData(), true);
    });

    test("should correct a bad ss configuration", function () {
        equal(workouts.getCount(), 29);
        setupBadData.apply(this);
        migration.run();
        equal(workouts.getCount(), 29);
    });
})();
