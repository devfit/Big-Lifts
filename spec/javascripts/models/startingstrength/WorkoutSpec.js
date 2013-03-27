(function () {
    var MODULE_NAME = "Starting Strength workout";
    module(MODULE_NAME);

    var lifts;
    var workouts;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            lifts = reloadStore(biglifts.stores.ss.Lifts);
            reloadStore(emptyStore(biglifts.stores.GlobalSettings));
            equal(lifts.getCount(), 5);

            workouts = emptyStore(reloadStore(biglifts.stores.ss.WorkoutStore));
        }
    });

    test("should load default workouts", function () {
        equal(workouts.getCount(), 0);
        workouts.load();
        equal(workouts.getCount(), 29);
        workouts.filter('name', 'A');
        equal(workouts.getCount(), 14);
        workouts.filter('name', 'B');
        equal(workouts.getCount(), 15);
    });

    test("should set the work set for default workouts to 100%", function () {
        workouts.load();
        workouts.filter('warmup', false);
        workouts.each(function (w) {
            equal(w.get('percentage'), 100);
        });
    });

    test('should order by SS lift order, and warmup defined order', function () {
        workouts.load();
        biglifts.stores.ss.Lifts.fireEvent('load');
        workouts.filter('name', 'A');
        var squat = lifts.findRecord('name', 'Squat');
        workouts.filter('lift_id', squat.get('id'));

        equal(workouts.getCount(), 5);
        for (var i = 0; i < 5; i++) {
            equal(workouts.getAt(i).get('lift_id'), squat.get('id'));
            equal(workouts.getAt(i).get('order'), i);
        }
    });
})();