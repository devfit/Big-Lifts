describe("Lift Completion Model and Store", function () {
    it("should remove lift completions that no longer have associated lifts", function () {
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat'});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat2'});
        wendler.stores.lifts.Lifts.add({propertyName:'squat'});

        expect(wendler.stores.lifts.LiftCompletion.getCount()).toEqual(2);

        wendler.stores.migrations.removeDeadLiftCompletions();
        wendler.stores.lifts.Lifts.fireEvent('load');

        expect(wendler.stores.lifts.LiftCompletion.getCount()).toEqual(1);
    });
});