Ext.define('CustomMovement', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'liftProperty', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'sets', type: 'integer'},
            {name: 'reps', type: 'integer'},
            {name: 'weight', type: 'integer', defaultValue: 0},
            {name: 'order', type: 'integer'},
            {name: 'max', type: 'integer'}
        ]
    }
});

Ext.define('CustomMovementStore', {
    extend: "Ext.data.Store",
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
    addWithOrder: function (recordConfig) {
        recordConfig.order = this.max('order') + 1;
        this.add(recordConfig);
    },
    onLoad: function () {
        if (this.getCount() == 0) {
            this.add(this.DEFAULT_LIFTS);
            this.sync();
        }
        this.addMissingCustomLiftAssociations();
        biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(this.addMissingCustomLiftAssociations, this));
    },
    config: {
        sorters: [
            {
                property: 'order',
                direction: 'ASC'
            }
        ]
    }
});