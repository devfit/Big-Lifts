describe("Add Synced to Logs migration", function () {
    beforeEach(function () {
        this.liftLog = emptyStore(reloadStore(biglifts.stores.LiftLog));
        this.ssLog = emptyStore(reloadStore(biglifts.stores.ss.Log));
        this.migration = Ext.create('biglifts.migrations.AddSyncedToLogs');
    });

    test('should migrate the 5/3/1 log', function () {
        this.liftLog.add({liftName: 'squat'});
        this.liftLog.sync();

        this.migration.run();

        expect(this.liftLog.first().get('synced'),false);
    });

    test('should migrate the SS log', function () {
        this.ssLog.add({name: 'Power Clean'});
        this.ssLog.sync();

        this.migration.run();

        expect(this.ssLog.first().get('synced'),false);
    });
});