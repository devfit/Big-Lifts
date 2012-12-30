Ext.ns('biglifts.stores.assistance');
Ext.define('BodyweightMovement', {
    extend: 'CustomMovement',
    config: {
        proxy: {
            type: 'localstorage',
            id: 'bodyweight-movement-proxy'
        }
    }
});

Ext.define("BodyweightMovementStore", {
    extend: "CustomMovementStore",
    DEFAULT_BODYWEIGHT_LIFTS: [
        {liftProperty: 'squat', name: 'One leg squat', sets: 5, reps: 15, order: 0},
        {liftProperty: 'squat', name: 'Sit-ups', sets: 5, reps: 15, order: 1},
        {liftProperty: 'deadlift', name: 'GHR', sets: 5, reps: 15, order: 0},
        {liftProperty: 'deadlift', name: 'Leg Raises', sets: 5, reps: 15, order: 1},
        {liftProperty: 'press', name: 'Chins', sets: 5, reps: 15, order: 0},
        {liftProperty: 'press', name: 'Dips', sets: 5, reps: 15, order: 1},
        {liftProperty: 'bench', name: 'Chins', sets: 5, reps: 15, order: 0},
        {liftProperty: 'bench', name: 'Pushups', sets: 5, reps: 15, order: 1}
    ],
    config: {
        model: 'BodyweightMovement',
        listeners: {
            load: function () {
                if (this.getCount() == 0) {
                    this.add(this.DEFAULT_BODYWEIGHT_LIFTS);
                    this.sync();
                }
                this.addMissingCustomLiftAssociations();
                biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(this.addMissingCustomLiftAssociations, this));
            }
        }
    }
});

biglifts.stores.assistance.BodyweightMovement = Ext.create('BodyweightMovementStore');
biglifts.stores.push(biglifts.stores.assistance.BodyweightMovement);