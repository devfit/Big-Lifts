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

        expect(this.workouts.getCount(),58);
    };

    test('should get the expected workout counts', function(){
        expect(this.migration.getTemplateWorkoutCounts(),[29,28]);
    });

    test("should detect a bad ss workout configuration", function () {
        expect(this.workouts.getCount(),29);
        setupBadData.apply(this);
        expect(this.migration.hasBadData(),true);
    });

    test("should correct a bad ss configuration", function () {
        expect(this.workouts.getCount(),29);
        setupBadData.apply(this);
        this.migration.run();
        expect(this.workouts.getCount(),29);
    });
});