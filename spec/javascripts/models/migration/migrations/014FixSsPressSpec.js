(function () {
    var MODULE_NAME = "Fix Ss Press";
    module(MODULE_NAME);

    var lifts;
    var workouts;
    var migration;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.Routine)).setup531();
            lifts = reloadStore(biglifts.stores.ss.Lifts);
            workouts = reloadStore(emptyStore(reloadStore(biglifts.stores.ss.WorkoutStore)));
            migration = Ext.create('biglifts.migrations.FixSsPress');
        }
    });

    test('should determine the current template for standard', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Standard');
        equal(migration.getTemplateName(), "standard");
    });

    test('should determine the current template for novice', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');
        equal(migration.getTemplateName(), "novice");
    });

    var findLastPress = function () {
        var lift_id = lifts.findRecord('name', 'Press').get('id');
        var index = workouts.findBy(function (r) {
            return r.get('lift_id') === lift_id && r.get('order') === 4;
        });
        return workouts.getAt(index);
    };

    test('should correct bad press reps', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        var workout = findLastPress.apply(this);
        workout.set('reps', 2);
        workout.save();
        workouts.sync();

        migration.run();

        var fixedWorkout = findLastPress.apply(this);
        equal(fixedWorkout.get('reps'), 5);
    });
})();
