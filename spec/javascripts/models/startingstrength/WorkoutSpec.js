describe("Starting Strength workout", function () {
    beforeEach(function () {
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);
        biglifts.stores.GlobalSettings.removeAll();
        biglifts.stores.GlobalSettings.setupDefaultSettings();
        expect(this.lifts.getCount(),5);

        this.workouts = reloadStore(biglifts.stores.ss.WorkoutStore);
        this.workouts.removeAll();
        this.workouts.sync();
    });

    test("should load default workouts", function () {
        expect(this.workouts.getCount(),0);
        this.workouts.load();
        expect(this.workouts.getCount(),29);
        this.workouts.filter('name', 'A');
        expect(this.workouts.getCount(),14);
        this.workouts.filter('name', 'B');
        expect(this.workouts.getCount(),15);
    });

    test("should set the work set for default workouts to 100%", function () {
        this.workouts.load();
        this.workouts.filter('warmup', false);
        this.workouts.each(function (w) {
            expect(w.get('percentage'),100);
        });
    });

    test('should order by SS lift order, and warmup defined order', function () {
        this.workouts.load();
        biglifts.stores.ss.Lifts.fireEvent('load');
        this.workouts.filter('name', 'A');
        var squat = this.lifts.findRecord('name', 'Squat');
        this.workouts.filter('lift_id', squat.get('id'));

        expect(this.workouts.getCount(),5);
        for (var i = 0; i < 5; i++) {
            expect(this.workouts.getAt(i).get('lift_id'),squat.get('id'));
            expect(this.workouts.getAt(i).get('order'),i);
        }
    });
});