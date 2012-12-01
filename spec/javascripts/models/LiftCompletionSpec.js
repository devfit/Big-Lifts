describe("Lift Completion Model and Store", function () {
    beforeEach(function(){
        localStorage.clear();
        this.liftCompletion = biglifts.stores.lifts.LiftCompletion;
        this.lifts = biglifts.stores.lifts.Lifts;
    });

    it("should remove lift completions that no longer have associated lifts", function () {
        this.liftCompletion.add({liftPropertyName:'squat'});
        this.liftCompletion.add({liftPropertyName:'squat2'});
        this.lifts.add({propertyName:'squat'});

        expect(this.liftCompletion.getCount()).toEqual(2);

        biglifts.stores.migrations.removeDeadLiftCompletions();
        this.lifts.load();

        expect(this.liftCompletion.getCount()).toEqual(1);
    });
});