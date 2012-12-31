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
        });
    },
    sortBySaved: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.LogSort, function () {
            var logSort = biglifts.stores.LogSort.first();
            if (logSort) {
                var direction = logSort.get('ascending') ? 'ASC' : 'DESC';
                if (logSort.get('property') === 'timestamp') {
                    me.sort([
                        {
                            sorterFn: function (c1, c2) {
                                var log1 = biglifts.stores.ss.Log.findRecord('workout_id', c1.get('workout_id'));
                                var log2 = biglifts.stores.ss.Log.findRecord('workout_id', c2.get('workout_id'));
                                return log1.get('timestamp') - log2.get('timestamp');
                            },
                            direction: direction
                        }
                    ]);
                }
            }
        });
    },
    config: {
        model: 'biglifts.models.startingstrength.CombinedLog',
        listeners: {
            load: function () {
                this.rebuildCombinedStore();
                this.sortBySaved();
                biglifts.stores.ss.Log.addListener('beforesync', this.rebuildCombinedStore, this);
                biglifts.stores.LogSort.addListener('beforesync', this.sortBySaved, this);
            }
        }
    }
});

biglifts.stores.ss.CombinedLog = Ext.create('biglifts.models.startingstrength.CombinedLogStore');
biglifts.stores.ss.CombinedLog.load();