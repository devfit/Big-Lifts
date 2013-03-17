Ext.define('biglifts.migrations.AddSyncedToLogs', {
    setSynced: function (l) {
        l.set('synced', false);
        l.save();
    },
    run: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.LiftLog, function () {
            biglifts.stores.LiftLog.each(me.setSynced);
            biglifts.stores.LiftLog.sync();
        });

        util.withLoadedStore(biglifts.stores.ss.Log, function () {
            biglifts.stores.ss.Log.each(me.setSynced);
            biglifts.stores.ss.Log.sync();
        });
    }
});