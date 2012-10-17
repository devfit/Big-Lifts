describe("Lift Completion Model and Store", function () {
    beforeEach(function(){
        biglifts.stores.lifts.LiftCompletion.removeAll();
        biglifts.stores.lifts.Lifts.removeAll();
    });

    it("should remove lift completions that no longer have associated lifts", function () {
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat'});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat2'});
        biglifts.stores.lifts.Lifts.add({propertyName:'squat'});

        expect(biglifts.stores.lifts.LiftCompletion.getCount()).toEqual(2);

        biglifts.stores.migrations.removeDeadLiftCompletions();
        biglifts.stores.lifts.Lifts.fireEvent('load');

        expect(biglifts.stores.lifts.LiftCompletion.getCount()).toEqual(1);
    });
});