module("Lift Progressions");
test("should stitch together sets of a progression after removal", function () {
    var store = Ext.create('biglifts.stores.LiftProgressions');

    store.add({week: 1, set: 1, percentage: 50, reps: 5});
    store.add({week: 1, set: 2, percentage: 50, reps: 5});
    store.add({week: 1, set: 3, percentage: 50, reps: 5});

    store.removeProgression(store.findRecord('set', 2));

    equal(store.first().get('set'), 1);
    equal(store.last().get('set'), 2);
});