(function () {
    var MODULE_NAME = "Sst Sets Store";
    module(MODULE_NAME);
    var sstSets;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.lifts.Lifts));
            sstSets = reloadStore(emptyStore(biglifts.stores.assistance.SSTSets));
        }
    });

    test("should load default lifts", function () {
        equal(sstSets.getCount(), 12);
    });
})();