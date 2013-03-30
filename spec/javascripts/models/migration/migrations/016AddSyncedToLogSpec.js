(function () {
    var MODULE_NAME = "Add Synced to Logs migration";
    module(MODULE_NAME);
    var liftLog;
    var ssLog;
    var migration;

    QUnit.testStart(function (detail) {
        if (detail.module === MODULE_NAME) {
            liftLog = emptyStore(reloadStore(biglifts.stores.LiftLog));
            ssLog = emptyStore(reloadStore(biglifts.stores.ss.Log));
            migration = Ext.create('biglifts.migrations.AddSyncedToLogs');
        }
    });

    test('should migrate the 5/3/1 log', function () {
        liftLog.add({liftName: 'squat'});
        liftLog.sync();

        migration.run();

        equal(liftLog.first().get('synced'), false);
    });

    test('should migrate the SS log', function () {
        ssLog.add({name: 'Power Clean'});
        ssLog.sync();

        migration.run();

        equal(ssLog.first().get('synced'), false);
    });
})();
