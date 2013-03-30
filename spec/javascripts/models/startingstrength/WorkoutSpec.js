(function () {
    var MODULE_NAME = "Starting Strength workout";
    module(MODULE_NAME);

    var lifts;
    var workouts;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            lifts = reloadStore(emptyStore(biglifts.stores.ss.Lifts));
            reloadStore(emptyStore(biglifts.stores.GlobalSettings));
            equal(lifts.getCount(), 5);

            workouts = reloadStore(emptyStore(biglifts.stores.ss.WorkoutStore));
        }
    });

    test("should load default workouts", function () {
        equal(workouts.getCount(), 29);
        workouts.filter('name', 'A');
        equal(workouts.getCount(), 14);
        workouts.filter('name', 'B');
        equal(workouts.getCount(), 15);
    });

    test("should set the work set for default workouts to 100%", function () {
        workouts.filter('warmup', false);
        workouts.each(function (w) {
            equal(w.get('percentage'), 100);
        });
    });

    test('should order by SS lift order, and warmup defined order', function () {
        workouts.filter('name', 'A');
        var squat = lifts.findRecord('name', 'Squat');
        workouts.filter('lift_id', squat.get('id'));

        equal(workouts.getCount(), 5);
        for (var i = 0; i < 5; i++) {
            equal(workouts.getAt(i).get('lift_id'), squat.get('id'));
            equal(workouts.getAt(i).get('order'), i);
        }
    });

    test('should set group order for non warmup lifts', function () {
        workouts.filter('warmup', false);
        equal(workouts.getCount(), 6);
        workouts.each(function (w) {
            notEqual(w.get('groupOrder'), null);
        });
    });

    test('should get work set for lift', function () {
        lifts = emptyStore(lifts);
        workouts = emptyStore(workouts);

        lifts.add({name: '1'});
        var lift2 = lifts.add({name: '2'})[0];
        lifts.sync();

        workouts.add({name: 'A', lift_id: lifts.findRecord('name', '1').get('id')});
        workouts.add({name: 'B', lift_id: lift2.get('id'), warmup: true});
        var workset = workouts.add({name: 'B', lift_id: lift2.get('id'), warmup: false})[0];
        workouts.sync();

        equal(workset, workouts.workSetsByLiftId[lift2.get('id')]);
    });

    test('should sort by group order in the store', function () {
        workouts.filter('name', 'A');
        workouts.filter('warmup', false);
        equal(workouts.getCount(), 3);

        var squat = biglifts.stores.ss.WorkoutStore.workSetsByLiftId[lifts.findRecord('name', 'Squat').get('id')];
        var deadlift = biglifts.stores.ss.WorkoutStore.workSetsByLiftId[lifts.findRecord('name', 'Deadlift').get('id')];

        squat.set('groupOrder', 2);
        deadlift.set('groupOrder', 0);

        workouts.sync();
        equal(workouts.first(), deadlift);
    });
})();