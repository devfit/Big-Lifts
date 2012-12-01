describe("Starting Strength log", function () {
    beforeEach(function () {
        localStorage.clear();
        this.log = Ext.create('biglifts.models.startingstrength.LogStore');
    });

    describe("getNewWorkoutId", function () {
        it("should return 0 if there are no log entries", function () {
            expect(this.log.getNewWorkoutId()).toEqual(0);
        });

        it("should return 1 if there is a log entry with a 0 id", function () {
            this.log.add({workout_id:0});
            this.log.sync();
            expect(this.log.getNewWorkoutId()).toEqual(1);
        });
    });
});