Ext.ns('biglifts.stores.assistance');
Ext.define('SstSets', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'week', type: 'integer'},
            {name: 'set', type: 'integer'},
            {name: 'percentage', type: 'integer'},
            {name: 'reps', type: 'integer'}
        ]
    }
});

Ext.define("SstSets", {
    extend: "Ext.data.Store",
    setupDefaults: function () {
        var defaults = [
            {week: 1, set: 1, percentage: 50, sets: 10},
            {week: 1, set: 2, percentage: 60, sets: 10},
            {week: 1, set: 3, percentage: 70, sets: 10},
            {week: 2, set: 1, percentage: 60, sets: 8},
            {week: 2, set: 2, percentage: 70, sets: 8},
            {week: 2, set: 3, percentage: 80, sets: 6},
            {week: 3, set: 1, percentage: 65, sets: 5},
            {week: 3, set: 2, percentage: 75, sets: 5},
            {week: 3, set: 3, percentage: 85, sets: 5},
            {week: 4, set: 1, percentage: 40, sets: 5},
            {week: 4, set: 2, percentage: 50, sets: 5},
            {week: 4, set: 3, percentage: 60, sets: 5}
        ];
        this.add(defaults);
        this.sync();
    },
    config: {
        model: 'SstMovement',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.setupDefaults();
                }
            }
        }
    }
});

biglifts.stores.assistance.SSTSets = Ext.create('SstSets');
biglifts.stores.push(biglifts.stores.assistance.SSTSets);