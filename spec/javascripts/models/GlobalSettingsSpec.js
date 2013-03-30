(function () {
    var MODULE_NAME = "Global Settings";
    module(MODULE_NAME);

    var globalSettings;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.w.Settings));
            globalSettings = reloadStore(emptyStore(biglifts.stores.GlobalSettings));
        }
    });

    test("should have rounding defaults", function () {
        var settings = globalSettings.first();
        equal(settings.get('roundingValue'), '5');
        equal(settings.get('roundingType'), 'normal');
    });
})();