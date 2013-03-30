(function () {
    var MODULE_NAME = "SS Workout Migration";
    module(MODULE_NAME);
    var lifts;
    var workouts;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.Routine)).setup531();

            reloadStore(emptyStore(biglifts.stores.GlobalSettings));
            lifts = reloadStore(emptyStore(biglifts.stores.ss.Lifts));

            workouts = reloadStore(emptyStore(biglifts.stores.ss.WorkoutStore));
            workouts.each(function(w){
               if(w.get('warmup')){
                   workouts.remove(w);
               }
            });
        }
    });

    test("should set default warmup to false, percentage to 100", function () {
        var squat = lifts.findRecord('name', 'Squat');
        var squatId = workouts.findBy(function (w) {
            return w.get('name') === 'A' && w.get('lift_id') == squat.get('id') && w.get('warmup') === false;
        });
        var squatWorkout = workouts.getAt(squatId);

        squatWorkout.set('percentage', null);
        squatWorkout.set('warmup', null);
        workouts.sync();

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        equal(squatWorkout.get('percentage'), 100);
        equal(squatWorkout.get('warmup'), false);
    });

    test("should add warmup sets to squat and adjust the work set order", function () {
        var squat = lifts.findRecord('name', 'Squat');
        var workSet = workouts.findRecord('lift_id', squat.get('id'));
        workSet.set('order', 0);
        workouts.sync();

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        workouts.filter('lift_id', squat.get('id'));
        workouts.filter('name', 'A');
        equal(workouts.getCount(), 5);
        equal(workSet.get('order'), 4);
    });

    test("should add warmup sets to deadlift and adjust the work set order", function () {
        var deadlift = lifts.findRecord('name', 'Deadlift');
        var workSet = workouts.findRecord('lift_id', deadlift.get('id'));
        workSet.set('order', 0);
        workouts.sync();

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        workouts.filter('lift_id', deadlift.get('id'));
        workouts.filter('name', 'A');
        equal(workouts.getCount(), 4);
        equal(workSet.get('order'), 3);
    });
})();