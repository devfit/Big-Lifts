describe("Lift Progressions", function () {
    it("should set the amrap property properly during migration", function () {
        var store = Ext.create('Ext.data.Store', {
            model:'LiftProgression'
        });

        store.add({week:1, set:1, percentage: 50, reps: 5});
        store.add({week:1, set:2, percentage: 50, reps: 5});
        store.add({week:1, set:3, percentage: 50, reps: 5});
        store.add({week:1, set:4, percentage: 50, reps: 5});
        store.add({week:1, set:5, percentage: 50, reps: 5});
        store.add({week:1, set:6, percentage: 50, reps: 5});
        store.add({week:2, set:1, percentage: 50, reps: 5});

        wendler.liftProgressions.setupAmrapForSixthSet(store);
        expect(store.getAt(0).get('amrap')).toEqual(false);
        expect(store.getAt(5).get('amrap')).toEqual(true);
        expect(store.getAt(6).get('amrap')).toEqual(false);
    });
});