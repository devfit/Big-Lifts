"use strict";
Ext.ns('wendler', 'wendler.stores', 'wendler.stores.lifts', 'wendler.defaults');

Ext.regModel('Lift', {
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'name', type: 'string'},
        {name: 'propertyName', type: 'string'},
        {name: 'max', type: 'integer'}
    ],
    proxy: {
        type: 'localstorage',
        id: 'lift-proxy'
    }
});

wendler.defaults.lifts = [
    Ext.ModelMgr.create({name: 'Squat', max: 200, propertyName: 'squat'}, 'Lift'),
    Ext.ModelMgr.create({name: 'Deadlift', max: 300, propertyName: 'deadlift'}, 'Lift'),
    Ext.ModelMgr.create({name: 'Press', max: 150, propertyName: 'press'}, 'Lift'),
    Ext.ModelMgr.create({name: 'Bench', max: 175, propertyName:'bench'}, 'Lift')
];

Ext.ns('wendler.stores.migrations', 'wendler.models', 'wendler.models.Lift');
wendler.stores.migrations.liftModelMigration = function() {
    wendler.stores.lifts.Lifts.each(function(r) {
        if (!r.data.liftProperty) {
            var propertyName = wendler.models.Lift.sanitizePropertyName(r.data.name);
            r.set('propertyName', propertyName);
            r.save();
        }
    });
};

wendler.models.Lift.sanitizePropertyName = function(propertyName) {
    return propertyName.toLowerCase().replace(/[^a-z]/g, '');
};

wendler.stores.lifts.Lifts = new Ext.data.Store({
    model: 'Lift',
    listeners: {
        load: function() {
            if (this.getCount() == 0) {
                this.add(wendler.defaults.lifts);
                this.sync();
            }
            wendler.stores.migrations.liftModelMigration();
        }
    },
    autoLoad: true,
    autoSave: true
});

Ext.regModel('LiftProgression', {
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'week', type: 'integer'},
        {name: 'set', type: 'integer'},
        {name: 'reps', type: 'integer'},
        {name: 'percentage', type: 'integer'}
    ],
    proxy: {
        type: 'localstorage',
        id: 'lift-percentages-proxy'
    }
});

wendler.defaults.liftProgression = [
    Ext.ModelMgr.create({week: 1, set: 1, reps: 5, percentage: 40}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 1, set: 2, reps: 5, percentage: 50}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 1, set: 3, reps: 3, percentage: 60}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 1, set: 4, reps: 5, percentage: 65}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 1, set: 5, reps: 5, percentage: 75}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 1, set: 6, reps: 5, percentage: 85}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 2, set: 1, reps: 5, percentage: 40}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 2, set: 2, reps: 5, percentage: 50}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 2, set: 3, reps: 3, percentage: 60}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 2, set: 4, reps: 3, percentage: 70}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 2, set: 5, reps: 3, percentage: 80}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 2, set: 6, reps: 3, percentage: 90}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 3, set: 1, reps: 5, percentage: 40}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 3, set: 2, reps: 5, percentage: 50}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 3, set: 3, reps: 3, percentage: 60}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 3, set: 4, reps: 5, percentage: 75}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 3, set: 5, reps: 3, percentage: 85}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 3, set: 6, reps: 1, percentage: 95}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 4, set: 1, reps: 5, percentage: 40}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 4, set: 2, reps: 5, percentage: 50}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 4, set: 3, reps: 3, percentage: 60}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 4, set: 4, reps: 5, percentage: 60}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 4, set: 5, reps: 5, percentage: 65}, 'LiftProgression'),
    Ext.ModelMgr.create({week: 4, set: 6, reps: 5, percentage: 70}, 'LiftProgression')
];
wendler.stores.lifts.LiftProgression = new Ext.data.Store({
    model: 'LiftProgression',
    listeners: {
        load: function() {
            if (this.getCount() == 0) {
                this.add(wendler.defaults.liftProgression);
                this.sync();
            }
        }
    },
    autoLoad: true,
    autoSave: true
});