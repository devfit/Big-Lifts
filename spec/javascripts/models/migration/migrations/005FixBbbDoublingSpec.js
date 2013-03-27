(function () {
    var MODULE_NAME = "Fix BBB Doubling";
    module(MODULE_NAME);

    var migration;
    var bbb;

    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.Routine)).setup531();
            migration = Ext.create('biglifts.migrations.fixBbbDoubling');
            bbb = emptyStore(reloadStore(biglifts.stores.assistance.BoringButBig));
        }
    });

    test("should remove BBB duplicates of main lifts", function () {
        bbb.add({lift_id: '1', movement_lift_id: '1'});
        bbb.add({lift_id: '1', movement_lift_id: '1'});
        bbb.add({lift_id: '2', movement_lift_id: '2'});
        bbb.sync();

        equal(bbb.getCount(), 3);
        migration.run();
        equal(bbb.getCount(), 2);
    });
})();