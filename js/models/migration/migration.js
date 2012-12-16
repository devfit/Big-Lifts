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
        {klass: 'biglifts.migrations.fixBbbDoubling', done: false}
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
                        var klass = migration.get('klass');
                        var migrationRunner = Ext.create(klass);
                        migrationRunner.run();

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