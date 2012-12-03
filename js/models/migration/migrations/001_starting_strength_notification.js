Ext.define('biglifts.migrations.ssNotification', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0){
                return;
            }

            util.whenApplicationReady(function () {
                Ext.Msg.alert('Update', "Starting Strength is now available!\nMore > Routine to switch.");
            });
        });
    }
});