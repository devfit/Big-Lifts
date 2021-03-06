Ext.define('biglifts.migrations.globalSettingsDefaults', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            util.withLoadedStore(biglifts.stores.w.Settings, function () {
                util.withLoadedStore(biglifts.stores.GlobalSettings, function () {
                    var settings = biglifts.stores.w.Settings.first();
                    if (settings) {
                        var units = settings.get('units');
                        biglifts.stores.GlobalSettings.first().set({units: units});
                        biglifts.stores.GlobalSettings.sync();
                    }
                });
            });
        });
    }
});