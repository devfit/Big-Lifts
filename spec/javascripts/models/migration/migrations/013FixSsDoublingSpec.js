describe("Fix Ss Doubling", function () {
    beforeEach(function () {
        this.routines = reloadStore(biglifts.stores.Routine);
        this.routines.add({name:'5/3/1'});
        this.routines.sync();
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);
        this.workouts = reloadStore(emptyStore(reloadStore(biglifts.stores.ss.WorkoutStore)));
        this.migration = Ext.create('biglifts.migrations.FixSsDoubling');
    });

    var setupBadData = function(){
        this.workouts.each(function (w) {
            var clone = _.clone(w.data);
            clone.id = undefined;
            this.workouts.add(clone);
        }, this);
        this.workouts.sync();

        equal(this.workouts.getCount(),58);
    };

    test('should get the expected workout counts', function(){
        equal(this.migration.getTemplateWorkoutCounts(),[29,28]);
    });

    test("should detect a bad ss workout configuration", function () {
        equal(this.workouts.getCount(),29);
        setupBadData.apply(this);
        equal(this.migration.hasBadData(),true);
    });

    test("should correct a bad ss configuration", function () {
        equal(this.workouts.getCount(),29);
        setupBadData.apply(this);
        this.migration.run();
        equal(this.workouts.getCount(),29);
    });
});