Ext.define('biglifts.migrations.dateFormatFinder', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            util.withLoadedStore(biglifts.stores.GlobalSettings, function () {
                biglifts.stores.GlobalSettings.getSystemDateFormat(function (dateFormat) {
                    biglifts.stores.GlobalSettings.first().set({dateFormat: dateFormat});
                    biglifts.stores.GlobalSettings.sync();
                });
            });
        });
    }
});