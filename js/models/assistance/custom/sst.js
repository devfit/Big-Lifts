Ext.ns('biglifts.stores.assistance');
Ext.define('SstMovement', {
    extend: 'CustomMovement',
    config: {
        proxy: {
            type: 'localstorage',
            id: 'sst-movement-proxy'
        }
    }
});

Ext.define("SstStore", {
    extend: "CustomMovementStore",
    DEFAULT_LIFTS: [
        {liftProperty: 'squat', name: 'One leg squat', sets: 5, reps: 15, order: 0},
        {liftProperty: 'deadlift', name: 'GHR', sets: 5, reps: 15, order: 0},
        {liftProperty: 'press', name: 'Dips', sets: 5, reps: 15, order: 1},
        {liftProperty: 'bench', name: 'Pushups', sets: 5, reps: 15, order: 1}
    ],
    config: {
        model: 'SstMovement',
        listeners: {
            load: function () {
                this.onLoad();
            }
        }
    }
});

biglifts.stores.assistance.SST = Ext.create('SstStore');
biglifts.stores.push(biglifts.stores.assistance.SST);