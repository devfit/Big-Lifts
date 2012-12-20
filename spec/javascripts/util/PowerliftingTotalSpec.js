describe("Powerlifting Total", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.lifts.load();
        this.lifts.removeAll();
        this.lifts.sync();

        this.logEntry = biglifts.stores.LiftLog;
        this.logEntry.load();
        this.logEntry.removeAll();
        this.logEntry.sync();
    });

    describe("getTotal", function () {
        it("should return the sum of squat, deadlift, and bench if there are no log entries", function () {
            this.lifts.add({name: "Bench", max: 100});
            this.lifts.add({name: "Squat", max: 200});
            this.lifts.add({name: "Deadlift", max: 300});
            this.lifts.sync();
            util.powerliftingTotal.getTotal(function (total) {
                expect(total).toEqual(600);
            });
        });
    });

    describe("overrideMaxes", function () {
        it("should use the max of both objects", function () {
            var known = {"Squat": 100, "Bench": 150};
            var log = {"Bench": 200};
            expect(util.powerliftingTotal.findMaxes(known, log)).toEqual({"Squat": 100, "Bench": 200});
        });
    });

    describe("getMaxesFromLog", function () {
        it("should find the highest estimated one rep max for each lift", function () {
            biglifts.stores.LiftLog.add({liftName: 'Squat', weight: 100, reps: 5});
            biglifts.stores.LiftLog.add({liftName: 'Squat', weight: 125, reps: 4});
            biglifts.stores.LiftLog.add({liftName: 'Bench', weight: 90, reps: 4});
            biglifts.stores.LiftLog.sync();
            expect(util.powerliftingTotal.getMaxesFromLog()).toEqual({"Squat": util.formulas.estimateOneRepMax(125, 4),
                "Bench": util.formulas.estimateOneRepMax(90, 4), "Deadlift": 0});
        });
    });
});