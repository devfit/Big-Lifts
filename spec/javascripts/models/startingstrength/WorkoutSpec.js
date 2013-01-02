describe("Starting Strength workout", function () {
    beforeEach(function () {
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);
        biglifts.stores.GlobalSettings.removeAll();
        biglifts.stores.GlobalSettings.setupDefaultSettings();
        expect(this.lifts.getCount()).toEqual(5);

        this.workouts = reloadStore(biglifts.stores.ss.WorkoutStore);
        this.workouts.removeAll();
        this.workouts.sync();
    });

    it("should load default workouts", function () {
        expect(this.workouts.getCount()).toEqual(0);
        this.workouts.load();
        expect(this.workouts.getCount()).toEqual(29);
        this.workouts.filter('name', 'A');
        expect(this.workouts.getCount()).toEqual(14);
        this.workouts.filter('name', 'B');
        expect(this.workouts.getCount()).toEqual(15);
    });

    it('should order by SS lift order, and warmup defined order', function () {
        this.workouts.load();
        this.workouts.filter('name', 'A');

        var squat = this.lifts.findRecord('name', 'Squat');
        for (var i = 0; i < 5; i++) {
            expect(this.workouts.getAt(i).get('lift_id')).toEqual(squat.get('id'));
        }
    });
});