Ext.define('biglifts.migrations.AddRoundingToGlobal', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            util.withLoadedStore(biglifts.stores.w.Settings, function () {
                util.withLoadedStore(biglifts.stores.GlobalSettings, function () {
                    var settings = biglifts.stores.w.Settings.first();
                    if (settings) {
                        var global = biglifts.stores.GlobalSettings.first();
                        global.set({roundingValue: settings.get('roundingValue')});
                        global.set({roundingType: settings.get('roundingType')});
                        global.save();
                        biglifts.stores.GlobalSettings.sync();
                    }
                });
            });
        });
    }
});