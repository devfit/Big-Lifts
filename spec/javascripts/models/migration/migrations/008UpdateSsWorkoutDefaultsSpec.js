describe("SS Workout Migration", function () {
    beforeEach(function () {
        this.routines = reloadStore(biglifts.stores.Routine);
        this.routines.add({name:'5/3/1'});
        this.routines.sync();

        reloadStore(biglifts.stores.GlobalSettings);
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);

        this.workouts = reloadStore(biglifts.stores.ss.WorkoutStore);
        this.workouts.removeAll();
        this.workouts.addWorkSets();
        this.workouts.sync();

        equal(this.workouts.getCount(),6);
    });

    test("should set default warmup to false, percentage to 100", function () {
        var squat = this.lifts.findRecord('name', 'Squat');
        var squatId = this.workouts.findBy(function (w) {
            return w.get('name') === 'A' && w.get('lift_id') == squat.get('id') && w.get('warmup') === false;
        });
        var squatWorkout = this.workouts.getAt(squatId);

        squatWorkout.set('percentage', null);
        squatWorkout.set('warmup', null);
        this.workouts.sync();

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        equal(squatWorkout.get('percentage'),100);
        equal(squatWorkout.get('warmup'),false);
    });

    test("should add warmup sets to squat and adjust the work set order", function () {
        var squat = this.lifts.findRecord('name', 'Squat');
        var workSet = this.workouts.findRecord('lift_id', squat.get('id'));
        workSet.set('order', 0);
        this.workouts.sync();

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        this.workouts.filter('lift_id', squat.get('id'));
        this.workouts.filter('name', 'A');
        equal(this.workouts.getCount(),5);
        equal(workSet.get('order'),4);
    });

    test("should add warmup sets to deadlift and adjust the work set order", function () {
        var deadlift = this.lifts.findRecord('name', 'Deadlift');
        var workSet = this.workouts.findRecord('lift_id', deadlift.get('id'));
        workSet.set('order', 0);
        this.workouts.sync();

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        this.workouts.filter('lift_id', deadlift.get('id'));
        this.workouts.filter('name', 'A');
        equal(this.workouts.getCount(),4);
        equal(workSet.get('order'),3);
    });
});