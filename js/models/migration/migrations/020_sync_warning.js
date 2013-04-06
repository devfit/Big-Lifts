Ext.define('biglifts.migrations.LogSyncWarning', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.whenApplicationReady(function () {
                    Ext.Msg.alert('Important!', 'The log is going to re-sync using your username and password. It may take a moment to load.');
                });
            }
        });
    }
});