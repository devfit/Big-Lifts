Ext.ns('sync');
sync.authPrompting = false;
Ext.define('biglifts.models.LogSyncer', {
    LOG_URL: 'http://biglifts.herokuapp.com/log',
    getAndSync: function () {
        var me = this;
        biglifts.stores.Users.withUser(function () {
            me.syncRemoteLog(function () {
                me.postLog();
            });
        });
    },
    postLog: function () {
        var me = this;
        biglifts.stores.Users.withUser(function () {
            async.forEachSeries(me.getFormattedLog(), Ext.bind(me.saveWorkout, me));
        });
    },
    deleteRecord: function (workout_id, callback) {
        if (!this.workoutName) {
            throw "Workout name must be defined";
        }

        var me = this;
        biglifts.stores.Users.withUser(function () {
            Ext.Ajax.request({
                url: me.LOG_URL + "/" + workout_id,
                method: 'DELETE',
                headers: Ext.create('biglifts.models.HeadersBuilder').buildSyncHeaders(),
                jsonData: {name: me.workoutName},
                success: function (response) {
                    callback(null);
                },
                failure: function (response) {
                    callback(null);
                },
                scope: this
            });
        });
    },
    saveWorkout: function (workout, callback) {
        callback = callback || Ext.emptyFn;
        Ext.Ajax.request({
            url: this.LOG_URL,
            method: 'POST',
            headers: Ext.create('biglifts.models.HeadersBuilder').buildSyncHeaders(),
            jsonData: workout,
            success: function (response) {
                callback(null);
            },
            failure: function (response) {
                callback(null);
            },
            scope: this
        });
    },
    authorizationChanged: function () {
        if (!sync.authPrompting) {
            sync.authPrompting = true;
            biglifts.stores.Users.recreateUser(function () {
                util.whenApplicationReady(function () {
                    Ext.Msg.confirm('User Changed', 'User authentication failed. Update username/password?', function (text) {
                        if (text === "yes") {
                            Ext.getCmp('app').setActiveItem(Ext.getCmp('setup'));
                            Ext.getCmp('setup').setActiveItem(Ext.getCmp('user-setup'));
                        }
                    });
                });
            });
        }
    },
    syncRemoteLog: function (callback) {
        Ext.Ajax.request({
            url: this.LOG_URL,
            method: 'GET',
            headers: Ext.create('biglifts.models.HeadersBuilder').buildSyncHeaders(),
            success: function (response) {
                this.mergeRemoteLogs(JSON.parse(response.responseText));
                callback(null);
            },
            failure: function (response) {
                if (response.status === 401) {
                    this.authorizationChanged();
                }
            },
            scope: this
        });
    },
    mergeRemoteLogs: function (workouts) {
        throw "abstract";
    },
    getFormattedLog: function () {
        if (!this.store) {
            throw "store not defined for syncer";
        }

        var me = this;
        var data = [];
        this.store.each(function (l) {
            data.push(me.buildFormattedWorkout(l));
        });
        return data;
    },
    buildFormattedWorkout: function (log_entry) {
        throw "abstract";
    }
});