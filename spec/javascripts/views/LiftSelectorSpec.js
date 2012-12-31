describe("The lift selector", function () {
    var liftStore = biglifts.stores.lifts.Lifts;
    var liftCompletionStore = biglifts.stores.lifts.LiftCompletion;

    beforeEach(function(){
        liftStore.removeAll();

        liftStore.add({propertyName:'squat', enabled: true});
        liftStore.add({propertyName:'press', enabled: true});
        liftStore.sync();

        this.liftSelector = Ext.create('biglifts.views.LiftSelector');
    });

    it("should determine the starting week correctly", function () {
        liftCompletionStore.removeAll();
        liftCompletionStore.add({liftPropertyName:'squat', week:1, completed:true});
        liftCompletionStore.add({liftPropertyName:'press', week:1, completed:true});
        liftCompletionStore.add({liftPropertyName:'squat', week:2, completed:false});

        expect(this.liftSelector.getStartingWeek()).toEqual(2);
    });

    it("should return the last week as the starting week if all lifts are completed", function () {
        liftCompletionStore.removeAll();
        liftCompletionStore.add({liftPropertyName:'squat', week:1, completed:true});
        liftCompletionStore.add({liftPropertyName:'press', week:1, completed:true});
        liftCompletionStore.add({liftPropertyName:'squat', week:2, completed:true});

        expect(this.liftSelector.getStartingWeek()).toEqual(2);
    });

    it("should ignored disabled lifts when determining the starting week", function () {
        liftStore.removeAll();
        liftStore.sync();
        liftCompletionStore.removeAll();
        liftCompletionStore.sync();

        liftStore.clearFilter(true);
        liftStore.add({propertyName:'squat', enabled: true});
        liftStore.add({propertyName:'press', enabled: false});
        liftStore.sync();

        liftCompletionStore.add({liftPropertyName:'squat', week:1, completed:true});
        liftCompletionStore.add({liftPropertyName:'press', week:1, completed:false});
        liftCompletionStore.add({liftPropertyName:'squat', week:2, completed:true});
        liftCompletionStore.sync();
        expect(this.liftSelector.getStartingWeek()).toEqual(2);
    });
});