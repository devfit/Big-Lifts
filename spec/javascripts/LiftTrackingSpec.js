describe("The lift tracking screen", function () {
    describe("All lifts completed checking", function () {
        it("should return true if all lifts are completed", function () {
            biglifts.stores.lifts.LiftCompletion.removeAll();
            biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
            biglifts.stores.lifts.Lifts.add({propertyName:'squat', enabled:true});
            expect(biglifts.liftSchedule.liftTracking.allLiftsAreCompleted()).toEqual(true);
        });

        it("should return false if all lifts are not completed", function () {
            biglifts.stores.lifts.LiftCompletion.removeAll();
            biglifts.stores.lifts.Lifts.add({propertyName:'squat', enabled:true});
            biglifts.stores.lifts.Lifts.add({propertyName:'bench', enabled:true});
            biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
            biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'bench', week:2, completed:false});
            expect(biglifts.liftSchedule.liftTracking.allLiftsAreCompleted()).toEqual(false);
        });

        it("should return true if all enabled lifts are ignored", function () {
            biglifts.stores.lifts.LiftCompletion.removeAll();
            biglifts.stores.lifts.Lifts.removeAll();

            biglifts.stores.lifts.Lifts.add({name:'bench',propertyName:'squat',enabled:true});
            biglifts.stores.lifts.Lifts.add({name:'bench',propertyName:'bench',enabled:false});

            biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'squat', week:1, completed:true});
            biglifts.stores.lifts.LiftCompletion.add({liftPropertyName:'bench', week:2, completed:false});

            expect(biglifts.liftSchedule.liftTracking.allLiftsAreCompleted()).toEqual(true);
        });
    })
});