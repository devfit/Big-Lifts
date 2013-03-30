(function () {
    var MODULE_NAME = "531 Settings";
    module(MODULE_NAME);

    var settings;
    var globalSettings;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            settings = reloadStore(emptyStore(biglifts.stores.w.Settings));
            globalSettings = reloadStore(emptyStore(biglifts.stores.GlobalSettings));
        }
    });

    test("should use global settings to override local settings when calling getCombinedSettings", function () {
        settings.first().set({units: 'kg'});
        settings.sync();
        globalSettings.first().set({units: 'override'});
        globalSettings.sync();

        equal(settings.getCombinedSettings().units, 'override')
    });
})();
