(function () {
    module("Global Settings Defaults Migration");

    var settings = ensureLoaded(biglifts.stores.GlobalSettings);
    var settings531 = reloadStore(biglifts.stores.w.Settings);
    var routines = reloadStore(emptyStore(biglifts.stores.Routine));

    test("should copy 5/3/1 settings if they exist and a routine is loaded", function () {
        settings531.first().set({units: 'test'});
        settings531.sync();

        routines.add({name: "5/3/1"});
        routines.sync();

        Ext.create('biglifts.migrations.globalSettingsDefaults').run();

        equal(settings.getUnits(), 'test');
    });
})();
