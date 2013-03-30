(function () {
    var MODULE_NAME = "PowerliftingTotalLifts";
    module(MODULE_NAME);

    var lifts;
    var powerliftingLifts;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            lifts = reloadStore(emptyStore(biglifts.stores.lifts.Lifts));
            powerliftingLifts = reloadStore(emptyStore(biglifts.stores.PowerliftingTotalLifts));
        }
    });

    test("should load default lifts", function () {
        equal(powerliftingLifts.getCount(), 4);
        powerliftingLifts.filter('included', true);
        equal(powerliftingLifts.getCount(), 3);
    });

    test("should ignore missing lifts when loading defaults", function () {
        lifts.remove(lifts.findRecord('name', 'Squat'));
        powerliftingLifts.syncToLifts();
        powerliftingLifts.filter('included', true);
        equal(powerliftingLifts.getCount(), 2);
    });

    test("should sync to remove lifts", function () {
        lifts.remove(lifts.findRecord('name', 'Squat'));
        powerliftingLifts.syncToLifts();
        equal(powerliftingLifts.getCount(), 3);
    });
})();