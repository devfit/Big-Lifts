describe("Lift Progressions", function () {
    it("should set the amrap property properly during migration", function () {
        var store = Ext.create('biglifts.stores.LiftProgressions');

        store.add({week: 1, set: 1, percentage: 50, reps: 5});
        store.add({week: 1, set: 2, percentage: 50, reps: 5});
        store.add({week: 1, set: 3, percentage: 50, reps: 5});
        store.add({week: 1, set: 4, percentage: 50, reps: 5});
        store.add({week: 1, set: 5, percentage: 50, reps: 5});
        store.add({week: 1, set: 6, percentage: 50, reps: 5});
        store.add({week: 2, set: 1, percentage: 50, reps: 5});

        store.setupAmrapForSixthSet(store);
        expect(store.getAt(0).get('amrap')).toEqual(false);
        expect(store.getAt(5).get('amrap')).toEqual(true);
        expect(store.getAt(6).get('amrap')).toEqual(false);
    });

    it("should set the warmup property properly during migration", function () {
        var store = Ext.create('biglifts.stores.LiftProgressions');

        store.add({week: 1, set: 1, percentage: 50, reps: 5});
        store.add({week: 1, set: 2, percentage: 50, reps: 5});
        store.add({week: 1, set: 3, percentage: 50, reps: 5});
        store.add({week: 1, set: 4, percentage: 50, reps: 5});
        store.add({week: 1, set: 5, percentage: 50, reps: 5});
        store.add({week: 1, set: 6, percentage: 50, reps: 5});
        store.add({week: 2, set: 1, percentage: 50, reps: 5});

        store.setupWarmupForFirstThreeSets(store);
        expect(store.getAt(0).get('warmup')).toEqual(true);
        expect(store.getAt(2).get('warmup')).toEqual(true);
        expect(store.getAt(5).get('warmup')).toEqual(false);
        expect(store.getAt(6).get('warmup')).toEqual(true);
    });

    it("should stitch together sets of a progression after removal", function () {
        var store = Ext.create('biglifts.stores.LiftProgressions');

        store.add({week: 1, set: 1, percentage: 50, reps: 5});
        store.add({week: 1, set: 2, percentage: 50, reps: 5});
        store.add({week: 1, set: 3, percentage: 50, reps: 5});

        store.removeProgression(store.findRecord('set', 2));

        expect(store.first().get('set')).toEqual(1);
        expect(store.last().get('set')).toEqual(2);
    });
});