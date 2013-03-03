describe("Starting Strength log", function () {
    beforeEach(function () {
        localStorage.clear();
        this.log = emptyStore(reloadStore(biglifts.stores.ss.Log));
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

    describe("getUniqueWorkoutIds", function () {
        it("should remove duplicates and return the set of unique workoutIds", function () {
            this.log.add({workout_id: 1, name: 'Squat'});
            this.log.add({workout_id: 1, name: 'Press'});
            this.log.sync();
            expect(this.log.getUniqueWorkoutIdsFromModels([this.log.first(),this.log.last()])).toEqual([1]);
        });

        it("should return 1 if there is a log entry with a 0 id", function () {
            this.log.add({workout_id:0});
            this.log.sync();
            expect(this.log.getNewWorkoutId()).toEqual(1);
        });
    });
});