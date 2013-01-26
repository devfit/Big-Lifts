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
        ],
        proxy:{
            type:'localstorage',
            id:'sst-sets'
        }
    }
});

Ext.define("SstSets", {
    extend: "Ext.data.Store",
    setupDefaults: function () {
        var defaults = [
            {week: 1, set: 1, percentage: 50, reps: 10},
            {week: 1, set: 2, percentage: 60, reps: 10},
            {week: 1, set: 3, percentage: 70, reps: 10},
            {week: 2, set: 1, percentage: 60, reps: 8},
            {week: 2, set: 2, percentage: 70, reps: 8},
            {week: 2, set: 3, percentage: 80, reps: 6},
            {week: 3, set: 1, percentage: 65, reps: 5},
            {week: 3, set: 2, percentage: 75, reps: 5},
            {week: 3, set: 3, percentage: 85, reps: 5},
            {week: 4, set: 1, percentage: 40, reps: 5},
            {week: 4, set: 2, percentage: 50, reps: 5},
            {week: 4, set: 3, percentage: 60, reps: 5}
        ];
        this.add(defaults);
        this.sync();
    },
    config: {
        model: 'SstSets',
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