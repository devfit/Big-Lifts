Ext.ns('biglifts.liftProgressions', 'biglifts.stores.lifts', 'biglifts.stores.recovery', 'biglifts.defaults');
Ext.define('LiftProgression', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'week', type: 'integer'},
            {name: 'set', type: 'integer'},
            {name: 'reps', type: 'integer'},
            {name: 'percentage', type: 'float'},
            {name: 'amrap', type: 'boolean', defaultValue: null},
            {name: 'warmup', type: 'boolean', defaultValue: null},
            {name: 'goalLift', type: 'boolean', defaultValue: false}
        ],
        proxy: {
            type: 'localstorage',
            id: 'lift-percentages-proxy'
        }
    }
});

biglifts.liftProgressions.options = {
    "fresher": [
        Ext.create('LiftProgression', {week: 1, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 4, reps: 5, percentage: 65, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 1, set: 5, reps: 5, percentage: 75, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 1, set: 6, reps: 5, percentage: 85, amrap: true, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 4, reps: 3, percentage: 70, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 5, reps: 3, percentage: 80, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 6, reps: 3, percentage: 90, amrap: true, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 4, reps: 5, percentage: 75, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 5, reps: 3, percentage: 85, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 6, reps: 1, percentage: 95, amrap: true, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 2, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 3, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 4, reps: 5, percentage: 40, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 5, reps: 5, percentage: 50, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 6, reps: 5, percentage: 60, amrap: false, warmup: false})
    ],
    "heavier": [
        Ext.create('LiftProgression', {week: 1, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 4, reps: 5, percentage: 75, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 1, set: 5, reps: 5, percentage: 80, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 1, set: 6, reps: 5, percentage: 85, amrap: true, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 4, reps: 3, percentage: 80, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 5, reps: 3, percentage: 85, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 6, reps: 3, percentage: 90, amrap: true, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 4, reps: 5, percentage: 75, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 5, reps: 3, percentage: 85, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 6, reps: 1, percentage: 95, amrap: true, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 2, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 3, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 4, reps: 5, percentage: 40, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 5, reps: 5, percentage: 50, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 6, reps: 5, percentage: 60, amrap: false, warmup: false})
    ],
    "powerlifting": [
        Ext.create('LiftProgression', {week: 1, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 1, set: 4, reps: 3, percentage: 70, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 1, set: 5, reps: 3, percentage: 80, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 1, set: 6, reps: 3, percentage: 90, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 1, set: 7, reps: 1, percentage: 85, amrap: false, warmup: false, goalLift: true}),
        Ext.create('LiftProgression', {week: 1, set: 8, reps: 1, percentage: 92.5, amrap: false, warmup: false, goalLift: true}),
        Ext.create('LiftProgression', {week: 2, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 2, set: 4, reps: 5, percentage: 65, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 5, reps: 5, percentage: 75, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 2, set: 6, reps: 5, percentage: 85, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 2, reps: 5, percentage: 50, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 3, reps: 3, percentage: 60, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 3, set: 4, reps: 5, percentage: 75, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 5, reps: 3, percentage: 85, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 6, reps: 1, percentage: 95, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 3, set: 7, reps: 1, percentage: 85, amrap: false, warmup: false, goalLift: true}),
        Ext.create('LiftProgression', {week: 3, set: 8, reps: 1, percentage: 95, amrap: false, warmup: false, goalLift: true}),
        Ext.create('LiftProgression', {week: 4, set: 1, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 2, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 3, reps: 5, percentage: 40, amrap: false, warmup: true}),
        Ext.create('LiftProgression', {week: 4, set: 4, reps: 5, percentage: 40, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 5, reps: 5, percentage: 50, amrap: false, warmup: false}),
        Ext.create('LiftProgression', {week: 4, set: 6, reps: 5, percentage: 60, amrap: false, warmup: false})
    ]
};

Ext.define('biglifts.stores.LiftProgressions', {
    extend: "Ext.data.Store",
    setupAmrapForSixthSet: function () {
        this.each(function (record) {
            if (record.get('amrap') === null) {
                record.set('amrap', record.get('set') === 6 && record.get('week') !== 4);
            }
        });
        this.sync();
    },
    setupWarmupForFirstThreeSets: function () {
        this.each(function (record) {
            if (record.get('warmup') === null) {
                record.set('warmup', record.get('set') <= 3);
            }
        });
        this.sync();
    },
    setupDefaultLiftProgressions: function () {
        var store = this;
        util.withNoFilters(store, function () {
                if (store.getCount() === 0) {
                    store.add(biglifts.liftProgressions.options["fresher"]);
                    store.sync();
                }
            }
        );
    },
    findExpectedRepsForWeek: function (week) {
        var progressionIndex = biglifts.stores.lifts.LiftProgression.findBy(function (r) {
            return r.get('set') === 6 && r.get('week') === week;
        });

        return biglifts.stores.lifts.LiftProgression.getAt(progressionIndex).get('reps');
    },
    removeProgression: function (progression) {
        this.remove(progression);

        var i = 1;
        this.each(function (r) {
            r.set('set', i++);
        });

        this.sync();
    },
    config: {
        model: 'LiftProgression',
        listeners: {
            load: function () {
                this.setupDefaultLiftProgressions();
                this.setupAmrapForSixthSet();
                this.setupWarmupForFirstThreeSets();
            }
        }
    }
});

biglifts.stores.lifts.LiftProgression = Ext.create('biglifts.stores.LiftProgressions');
biglifts.stores.push(biglifts.stores.lifts.LiftProgression);