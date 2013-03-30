(function () {
    var MODULE_NAME = "Add Rounding to Global Settings";
    module(MODULE_NAME);

    var migration;
    var global;
    var w531Settings;

    QUnit.testStart(function (detail) {
        if (detail.module === MODULE_NAME) {
            migration = Ext.create('biglifts.migrations.AddRoundingToGlobal');
            global = reloadStore(emptyStore(biglifts.stores.GlobalSettings));
            w531Settings = reloadStore(emptyStore(biglifts.stores.w.Settings));
        }
    });

    test('should pull over existing 5/3/1 rounding settings', function () {
        var w531 = w531Settings.first();
        w531.set('roundingValue', '1');
        w531.set('roundingType', 'down');
        w531.save();
        w531Settings.sync();

        migration.run();

        equal(global.first().get('roundingValue'), '1');
        equal(global.first().get('roundingType'), 'down');
    });
})();