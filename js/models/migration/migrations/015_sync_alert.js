Ext.define('biglifts.migrations.SyncAlert', {
    run:function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.whenApplicationReady(function () {
                    Ext.Msg.confirm('Sync Available!', 'Would you like to set your username/password now?', function (text) {
                        if (text === "yes") {
                            Ext.getCmp('app').setActiveItem(Ext.getCmp('setup'));
                            Ext.getCmp('setup').setActiveItem(Ext.getCmp('user-setup'));
                        }
                    });
                });
            }
        });
    }
});