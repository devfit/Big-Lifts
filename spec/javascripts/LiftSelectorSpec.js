describe("The lift selector", function () {
    beforeEach(function(){
        biglifts.stores.lifts.Lifts.removeAll();

        biglifts.stores.lifts.Lifts.add({propertyName:'squat', enabled: true});
        biglifts.stores.lifts.Lifts.add({propertyName:'press', enabled: true});
    });

    it("should determine the starting week correctly", function () {
        biglifts.stores.lifts.LiftCompletion.removeAll();
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'press', week:1, completed:true});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:2, completed:false});

        expect(biglifts.liftSchedule.liftSelector.getStartingWeek()).toEqual(2);
    });

    it("should return the last week as the starting week if all lifts are completed", function () {
        biglifts.stores.lifts.LiftCompletion.removeAll();
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'press', week:1, completed:true});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:2, completed:true});

        expect(biglifts.liftSchedule.liftSelector.getStartingWeek()).toEqual(2);
    });

    it("should ignored disabled lifts when determining the starting week", function () {
        biglifts.stores.lifts.LiftCompletion.removeAll();
        biglifts.stores.lifts.Lifts.removeAll();

        biglifts.stores.lifts.Lifts.add({propertyName:'squat', enabled: true});
        biglifts.stores.lifts.Lifts.add({propertyName:'press', enabled: false});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'press', week:1, completed:false});
        biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:2, completed:true});

        expect(biglifts.liftSchedule.liftSelector.getStartingWeek()).toEqual(2);
    });
});