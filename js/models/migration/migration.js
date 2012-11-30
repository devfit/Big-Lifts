"use strict";
Ext.define('Migration', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'class', type:'string'},
            {name:'done', type:'boolean'}
        ],
        proxy:{
            type:'localstorage',
            id:'migration'
        }
    }
});

Ext.define('Migrations', {
    extend:'Ext.data.Store',
    MIGRATION_VALUES:[
    ],
    loadMissingMigrations:function () {
        var me = this;
        _.each(me.MIGRATION_VALUES, function (migration) {
            if (me.find('class', migration.class) === -1) {
                me.add(migration);
            }
        });
        me.sync();
    },
    config:{
        model:'Migration',
        listeners:{
            load:function () {
                if (this.getCount() !== this.MIGRATION_VALUES.length) {
                    this.loadMissingMigrations();
                }
                this.each(function (migration) {
                    var alreadyRun = migration.get('done');
                    if (!alreadyRun) {
                        var klass = migration.get('class');
                        var migrationRunner = Ext.create(klass);
                        migrationRunner.run();
                    }
                });
            }
        }
    }
});

biglifts.stores.Migrations = Ext.create('Migrations');
biglifts.stores.push(biglifts.stores.Migrations);