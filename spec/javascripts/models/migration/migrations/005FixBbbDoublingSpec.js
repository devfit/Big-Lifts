(function () {
    module("Fix BBB Doubling");

    reloadStore(emptyStore(biglifts.stores.Routine)).setup531();
    var migration = Ext.create('biglifts.migrations.fixBbbDoubling');
    var bbb = emptyStore(reloadStore(biglifts.stores.assistance.BoringButBig));

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