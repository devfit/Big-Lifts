"use strict";
Ext.define('Migration', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'klass', type: 'string'},
            {name: 'done', type: 'boolean'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'migration'
        }
    }
});

Ext.define('Migrations', {
    extend: 'Ext.data.Store',
    MIGRATION_VALUES: [
        {klass: 'biglifts.migrations.ssNotification', done: false},
        {klass: 'biglifts.migrations.globalSettingsDefaults', done: false},
        {klass: 'biglifts.migrations.dateFormatFinder', done: false},
        {klass: 'biglifts.migrations.stitchBrokenLiftTemplates', done: false},
        {klass: 'biglifts.migrations.fixBbbDoubling', done: false},
        {klass: 'biglifts.migrations.rotatingWeekStoreMatching', done: false},
        {klass: 'biglifts.migrations.AddOrderToAssistance', done: false},
        {klass: 'biglifts.migrations.UpdateSsDefaults', done: false},
        {klass: 'biglifts.migrations.RateApp', done: false},
        {klass: 'biglifts.migrations.RecreateStartingStrength', done: false},
        {klass: 'biglifts.migrations.AddWorkoutIdToLog', done: false},
        {klass: 'biglifts.migrations.FixPowerCleanPercentage', done: false},
        {klass: 'biglifts.migrations.FixSsDoubling', done: false},
        {klass: 'biglifts.migrations.SyncAlert', done: false},
        {klass: 'biglifts.migrations.FixSsPress', done: false},
        {klass: 'biglifts.migrations.AddSyncedToLogs', done: false},
        {klass: 'biglifts.migrations.SubscribePoll', done: false},
        {klass: 'biglifts.migrations.AddRoundingToGlobal', done: false},
        {klass: 'biglifts.migrations.RebuildSsWorkouts', done: false},
        {klass: 'biglifts.migrations.LogSyncWarning', done: false}
    ],
    loadMissingMigrations: function () {
        var me = this;
        _.each(me.MIGRATION_VALUES, function (migration) {
            if (me.find('klass', migration.klass) === -1) {
                me.add(migration);
            }
        });
        me.sync();
    },
    config: {
        model: 'Migration',
        listeners: {
            load: function () {
                var me = this;
                if (me.getCount() !== me.MIGRATION_VALUES.length) {
                    me.loadMissingMigrations();
                }
                me.each(function (migration) {
                    var alreadyRun = migration.get('done');
                    if (!alreadyRun) {
                        Ext.create(migration.get('klass')).run();
                        migration.set('done', true);
                        me.sync();
                    }
                });
            }
        }
    }
});

biglifts.stores.Migrations = Ext.create('Migrations');
biglifts.stores.push(biglifts.stores.Migrations);
