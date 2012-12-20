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