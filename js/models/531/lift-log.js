Ext.define('LiftLog', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'liftName', type: 'string'},
            {name: 'weight', type: 'float'},
            {name: 'units', type: 'string'},
            {name: 'reps', type: 'int'},
            {name: 'notes', type: 'string', defaultValue: ''},
            {name: 'expectedReps', type: 'int'},
            {name: 'week', type: 'int'},
            {name: 'cycle', type: 'int'},
            {name: 'timestamp', type: 'int'},
            {name: 'workout_id', type: 'int'},
            {name: 'synced', type: 'boolean'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'lift-log-proxy'
        }
    }
});

Ext.define('LiftLogStore', {
    sortLog: function (property, direction) {
        this.sort(property, direction);

        if (property === 'liftName') {
            this.data.addSorter(new Ext.util.Sorter({
                property: 'timestamp',
                direction: 'DESC'
            }));

            this.sort();
        }
    },
    addLogEntry: function (l) {
        var currentMaxId = this.max('workout_id');
        l.workout_id = (_.isNull(currentMaxId) || _.isUndefined(currentMaxId)) ? 1 : currentMaxId + 1;
        this.add(l);
        this.sync();
    },
    restitchWorkoutIds: function () {
        var me = this;
        util.withNoSorters(this, function () {
            me.sort('workout_id', 'ASC');
            var i = 1;
            me.each(function (r) {
                r.set('workout_id', i++);
            });
        });
    },
    extend: 'Ext.data.Store',
    config: {
        storeId: 'log531',
        model: 'LiftLog',
        listeners: {
            addrecords: function (store, records) {
                var syncer = Ext.create('biglifts.models.Log531Syncer');
                _.each(records, function (record) {
                    syncer.saveWorkout(syncer.buildFormattedWorkout(record));
                });
            },
            load: function () {
                Ext.create('biglifts.models.Log531Syncer').getAndSync();

                biglifts.stores.Users.addListener('beforesync', function () {
                    Ext.create('biglifts.models.Log531Syncer').getAndSync();
                });
            },
            removerecords: function (s, models) {
                this.restitchWorkoutIds();
                var syncer = Ext.create('biglifts.models.Log531Syncer');
                var tasks = [];
                _.each(models, function (model) {
                    tasks.push(function (callback) {
                        syncer.deleteRecord(model.get('workout_id'), callback);
                    });
                });

                async.series(tasks, function () {
                    syncer.postLog();
                });
            }
        }
    }
});

biglifts.stores.LiftLog = Ext.create('LiftLogStore');
biglifts.stores.push(biglifts.stores.LiftLog);