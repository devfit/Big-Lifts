describe("The lift tracking screen", function () {
    describe("All lifts completed checking", function () {
        beforeEach(function () {
            this.liftCompletion = biglifts.stores.lifts.LiftCompletion;
            this.liftTracking = Ext.create('biglifts.views.LiftTracking');
        });

        it("should return true if all lifts are completed", function () {
            this.liftCompletion.removeAll();
            this.liftCompletion.add({liftPropertyName: 'squat', week: 1, completed: true});
            biglifts.stores.lifts.Lifts.add({propertyName: 'squat', enabled: true});
            expect(this.liftTracking.allLiftsAreCompleted()).toBe(true);
        });

        it("should return false if all lifts are not completed", function () {
            this.liftCompletion.removeAll();
            biglifts.stores.lifts.Lifts.add({propertyName: 'squat', enabled: true});
            biglifts.stores.lifts.Lifts.add({propertyName: 'bench', enabled: true});
            this.liftCompletion.add({liftPropertyName: 'squat', week: 1, completed: true});
            this.liftCompletion.add({liftPropertyName: 'bench', week: 2, completed: false});
            expect(this.liftTracking.allLiftsAreCompleted()).toBe(false);
        });

        it("should return true if all enabled lifts are ignored", function () {
            this.liftCompletion.removeAll();
            biglifts.stores.lifts.Lifts.removeAll();

            biglifts.stores.lifts.Lifts.add({name: 'bench', propertyName: 'squat', enabled: true});
            biglifts.stores.lifts.Lifts.add({name: 'bench', propertyName: 'bench', enabled: false});

            this.liftCompletion.add({liftPropertyName: 'squat', week: 1, completed: true});
            this.liftCompletion.add({liftPropertyName: 'bench', week: 2, completed: false});

            expect(this.liftTracking.allLiftsAreCompleted()).toBe(true);
        });
    })
});