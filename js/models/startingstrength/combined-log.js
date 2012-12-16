Ext.define('biglifts.models.startingstrength.CombinedLog', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'workout_id', type: 'int'}
        ],
        hasMany: {model: 'biglifts.models.startingstrength.Log', name: 'logs'},
        proxy: {
            type: 'memory',
            id: 'ss-combined-log'
        }
    }
});

Ext.define('biglifts.models.startingstrength.CombinedLogStore', {
    extend: 'Ext.data.Store',
    rebuildCombinedStore: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.ss.Log, function () {
            me.removeAll();
            biglifts.stores.ss.Log.each(function (r) {
                var workout_id = r.get('workout_id');
                var record = me.findRecord('workout_id', workout_id);
                if (!record) {
                    record = Ext.create('biglifts.models.startingstrength.CombinedLog', {workout_id: workout_id});
                    me.add(record);
                }
                record.logs().add(r);
                record.logs().sync();
            });
            me.sync();
            biglifts.stores.ss.Log.addListener('beforesync', Ext.bind(me.rebuildCombinedStore, me));
        });
    },
    config: {
        model: 'biglifts.models.startingstrength.CombinedLog',
        listeners: {
            load: function () {
                this.rebuildCombinedStore();
            }
        }
    }
});

biglifts.stores.ss.CombinedLog = Ext.create('biglifts.models.startingstrength.CombinedLogStore');
biglifts.stores.ss.CombinedLog.load();