describe("Starting Strength workout", function () {
    beforeEach(function () {
        localStorage.clear();
        this.workoutStore = Ext.create('biglifts.models.startingstrength.WorkoutStore');
    });

    it("should load default workouts", function () {
        expect(this.workoutStore.getCount()).toEqual(0);
        this.workoutStore.load();
        expect(this.workoutStore.getCount()).toEqual(6);
        this.workoutStore.filter('name', 'A');
        expect(this.workoutStore.getCount()).toEqual(3);
        this.workoutStore.filter('name','B');
        expect(this.workoutStore.getCount()).toEqual(3);
    });
});