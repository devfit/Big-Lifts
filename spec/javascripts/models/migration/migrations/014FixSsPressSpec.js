describe("Fix Ss Press", function () {
    beforeEach(function () {
        this.routines = reloadStore(biglifts.stores.Routine);
        this.routines.add({name:'5/3/1'});
        this.routines.sync();
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);
        this.workouts = reloadStore(emptyStore(reloadStore(biglifts.stores.ss.WorkoutStore)));
        this.migration = Ext.create('biglifts.migrations.FixSsPress');
    });

    it('should determine the current template for standard', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Standard');
        expect(this.migration.getTemplateName()).toEqual("standard");
    });

    it('should determine the current template for novice', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');
        expect(this.migration.getTemplateName()).toEqual("novice");
    });

    var findLastPress = function () {
        var lift_id = this.lifts.findRecord('name', 'Press').get('id');
        var index = this.workouts.findBy(function (r) {
            return r.get('lift_id') === lift_id && r.get('order') === 4;
        });
        return this.workouts.getAt(index);
    };

    it('should correct bad press reps', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        var workout = findLastPress.apply(this);
        workout.set('reps', 2);
        workout.save();
        this.workouts.sync();

        this.migration.run();

        var fixedWorkout = findLastPress.apply(this);
        expect(fixedWorkout.get('reps')).toEqual(5);
    });
});