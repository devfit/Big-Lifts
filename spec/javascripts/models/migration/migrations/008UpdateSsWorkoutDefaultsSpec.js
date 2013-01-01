describe("SS Workout Migration", function () {
    beforeEach(function () {
        this.routines = reloadStore(biglifts.stores.Routine);
        this.routines.add({name: '5/3/1'});
        this.routines.sync();

        this.lifts = biglifts.stores.ss.Lifts;
        this.lifts.removeAll();
        this.lifts.sync();
        expect(this.lifts.getCount()).toEqual(0);

        this.lifts.load();
        biglifts.stores.GlobalSettings.load();
        expect(this.lifts.getCount()).toEqual(5);

        this.workouts = reloadStore(biglifts.stores.ss.WorkoutStore);
        this.workouts.removeAll();
        this.workouts.addWorkSets();
        this.workouts.sync();
        expect(this.workouts.getCount()).toEqual(6);
    });

    it("should set default warmup to false, percentage to 100", function () {
        var squat = this.lifts.findRecord('name', 'Squat');
        var squatId = this.workouts.findBy(function (w) {
            return w.get('name') === 'A' && w.get('lift_id') == squat.get('id') && w.get('warmup') === false;
        });
        var squatWorkout = this.workouts.getAt(squatId);

        squatWorkout.set('percentage', null);
        squatWorkout.set('warmup', null);
        this.workouts.sync();

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        expect(squatWorkout.get('percentage')).toEqual(100);
        expect(squatWorkout.get('warmup')).toEqual(false);
    });

    it("should add warmup sets to squat and adjust the work set order", function () {
        var squat = this.lifts.findRecord('name', 'Squat');
        var workSet = this.workouts.findRecord('lift_id', squat.get('id'));

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        this.workouts.filter('lift_id', squat.get('id'));
        this.workouts.filter('name', 'A');
        expect(this.workouts.getCount()).toEqual(5);
        expect(workSet.get('order')).toEqual(4);
    });

    it("should add warmup sets to deadlift and adjust the work set order", function () {
        var deadlift = this.lifts.findRecord('name', 'Deadlift');
        var workSet = this.workouts.findRecord('lift_id', deadlift.get('id'));

        Ext.create('biglifts.migrations.UpdateSsDefaults').run();

        this.workouts.filter('lift_id', deadlift.get('id'));
        this.workouts.filter('name', 'A');
        expect(this.workouts.getCount()).toEqual(4);
        expect(workSet.get('order')).toEqual(3);
    });
});