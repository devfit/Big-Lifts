(function () {
    var MODULE_NAME = "Starting Strength lift";
    module(MODULE_NAME);
    var liftStore;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.GlobalSettings));
            liftStore = reloadStore(emptyStore(biglifts.stores.ss.Lifts));
        }
    });

    test("should load default lifts", function () {
        equal(liftStore.getCount(), 5);
    });

    test("should adjust lift increases when the units are changed to kg", function () {
        biglifts.stores.GlobalSettings.first().set('units', 'kg');
        biglifts.stores.GlobalSettings.sync();

        liftStore.adjustUnits();
        equal(liftStore.findRecord('name', 'Squat').get('increase'), 5);
    });

    test("should adjust lift increases when the units are changed to lbs", function () {
        biglifts.stores.GlobalSettings.first().set('units', 'kg');
        biglifts.stores.GlobalSettings.sync();
        liftStore.adjustUnits();

        biglifts.stores.GlobalSettings.first().set('units', 'lbs');
        biglifts.stores.GlobalSettings.sync();
        liftStore.adjustUnits();

        equal(liftStore.findRecord('name', 'Squat').get('increase'), 10);
    });
})();