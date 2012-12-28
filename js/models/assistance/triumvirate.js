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
    extend: "Ext.data.Store",
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
    addMissingCustomLiftAssociations: function () {
        var store = this;
        util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
            util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
                biglifts.stores.lifts.Lifts.each(function (lift) {
                    var existingMovement = store.findRecord('liftProperty', lift.get('propertyName'));
                    if (!existingMovement) {
                        for (var i = 0; i < 2; i++) {
                            store.add({
                                liftProperty: lift.get('propertyName'),
                                name: '?',
                                sets: 5,
                                reps: 15,
                                order: i
                            });
                        }
                        store.sync();
                    }
                });
            });
        });
    },
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
                biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(this.addMissingCustomLiftAssociations, this));
            }
        },
        sorters: [
            {
                property: 'order',
                direction: 'ASC'
            }
        ]
    }
});

biglifts.stores.assistance.TriumvirateMovement = Ext.create('TriumvirateMovementStore');
biglifts.stores.push(biglifts.stores.assistance.TriumvirateMovement);