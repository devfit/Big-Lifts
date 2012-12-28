Ext.ns('biglifts.stores.assistance');

Ext.define('TriumvirateMovement', {
    extend: 'CustomMovement',
    config: {
        proxy: {
            type: 'localstorage',
            id: 'triumvirate-movement-proxy'
        }
    }
});

Ext.define("TriumvirateMovementStore", {
    extend: "CustomMovementStore",
    DEFAULT_CUSTOM_LIFTS: [
        {liftProperty: 'squat', name: 'Leg Press', sets: 5, reps: 15, order: 0},
        {liftProperty: 'squat', name: 'Leg Curl', sets: 5, reps: 15, order: 1},
        {liftProperty: 'deadlift', name: 'Good Morning', sets: 5, reps: 15, order: 0},
        {liftProperty: 'deadlift', name: 'Hanging Leg Raise', sets: 5, reps: 15, order: 1},
        {liftProperty: 'press', name: 'Dips', sets: 5, reps: 15, order: 0},
        {liftProperty: 'press', name: 'Chin-Ups', sets: 5, reps: 15, order: 1},
        {liftProperty: 'bench', name: 'Dumbbell Bench Press', sets: 5, reps: 15, order: 0},
        {liftProperty: 'bench', name: 'Dumbbell Row', sets: 5, reps: 15, order: 1}
    ],
    config: {
        model: 'TriumvirateMovement',
        storeId: 'triumvirate',
        listeners: {
            load: function () {
                if (this.getCount() == 0) {
                    this.add(this.DEFAULT_CUSTOM_LIFTS);
                    this.sync();
                }
                this.addMissingCustomLiftAssociations();
            }
        }
    }
});

biglifts.stores.assistance.TriumvirateMovement = Ext.create('TriumvirateMovementStore');
biglifts.stores.push(biglifts.stores.assistance.TriumvirateMovement);