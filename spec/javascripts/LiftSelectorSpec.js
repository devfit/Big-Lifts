describe("The lift selector", function () {
    beforeEach(function(){
        wendler.stores.lifts.Lifts.removeAll();

        wendler.stores.lifts.Lifts.add({propertyName:'squat', enabled: true});
        wendler.stores.lifts.Lifts.add({propertyName:'press', enabled: true});
    });

    it("should determine the starting week correctly", function () {
        wendler.stores.lifts.LiftCompletion.removeAll();
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'press', week:1, completed:true});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:2, completed:false});

        expect(wendler.liftSchedule.liftSelector.getStartingWeek()).toEqual(2);
    });

    it("should return the last week as the starting week if all lifts are completed", function () {
        wendler.stores.lifts.LiftCompletion.removeAll();
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'press', week:1, completed:true});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:2, completed:true});

        expect(wendler.liftSchedule.liftSelector.getStartingWeek()).toEqual(2);
    });

    it("should ignored disabled lifts when determining the starting week", function () {
        wendler.stores.lifts.LiftCompletion.removeAll();
        wendler.stores.lifts.Lifts.removeAll();

        wendler.stores.lifts.Lifts.add({propertyName:'squat', enabled: true});
        wendler.stores.lifts.Lifts.add({propertyName:'press', enabled: false});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'press', week:1, completed:false});
        wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:2, completed:true});

        expect(wendler.liftSchedule.liftSelector.getStartingWeek()).toEqual(2);
    });
});