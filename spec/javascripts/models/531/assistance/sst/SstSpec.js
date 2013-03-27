(function () {
    var MODULE_NAME = "Sst Store";
    module(MODULE_NAME);
    var sst;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.lifts.Lifts));
            sst = reloadStore(emptyStore(biglifts.stores.assistance.SST));
        }
    });

    test("should load default lifts", function () {
        equal(sst.getCount(), 4);
    });
})();