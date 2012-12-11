Ext.define('biglifts.migrations.globalSettingsDefaults', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                biglifts.stores.GlobalSettings.add({units: 'lbs'});
                biglifts.stores.GlobalSettings.sync();
            }
            else {
                util.withLoadedStore(biglifts.stores.w.Settings, function () {
                    var units = biglifts.stores.w.Settings.first().get('units');
                    biglifts.stores.GlobalSettings.add({units: units});
                    biglifts.stores.GlobalSettings.sync();
                });
            }
        });
    }
});