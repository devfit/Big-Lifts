describe("The lift tracking screen", function () {
    describe("All lifts completed checking", function () {
        it("should return true if all lifts are completed", function () {
            wendler.stores.lifts.LiftCompletion.removeAll();
            wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
            wendler.stores.lifts.Lifts.add({propertyName:'squat', enabled:true});
            expect(wendler.liftSchedule.liftTracking.allLiftsAreCompleted()).toEqual(true);
        });

        it("should return false if all lifts are not completed", function () {
            wendler.stores.lifts.LiftCompletion.removeAll();
            wendler.stores.lifts.Lifts.add({propertyName:'squat', enabled:true});
            wendler.stores.lifts.Lifts.add({propertyName:'bench', enabled:true});
            wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
            wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'bench', week:2, completed:false});
            expect(wendler.liftSchedule.liftTracking.allLiftsAreCompleted()).toEqual(false);
        });

        it("should return true if all enabled lifts are ignored", function () {
            wendler.stores.lifts.LiftCompletion.removeAll();
            wendler.stores.lifts.Lifts.removeAll();

            wendler.stores.lifts.Lifts.add({name:'bench',propertyName:'squat',enabled:true});
            wendler.stores.lifts.Lifts.add({name:'bench',propertyName:'bench',enabled:false});

            wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
            wendler.stores.lifts.LiftCompletion.add({liftPropertyName:'bench', week:2, completed:false});

            expect(wendler.liftSchedule.liftTracking.allLiftsAreCompleted()).toEqual(true);
        });
    })
});