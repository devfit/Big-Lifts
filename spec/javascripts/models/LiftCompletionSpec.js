describe("Lift Completion Model and Store", function () {
    var store = biglifts.stores.lifts.LiftCompletion;
    beforeEach(function(){
        store.removeAll();
        biglifts.stores.lifts.Lifts.removeAll();
    });

    it("should remove lift completions that no longer have associated lifts", function () {
        store.add({liftPropertyName:'squat'});
        store.add({liftPropertyName:'squat2'});
        biglifts.stores.lifts.Lifts.add({propertyName:'squat'});

        expect(store.getCount()).toEqual(2);

        biglifts.stores.migrations.removeDeadLiftCompletions();
        biglifts.stores.lifts.Lifts.load();

        expect(store.getCount()).toEqual(1);
    });
});