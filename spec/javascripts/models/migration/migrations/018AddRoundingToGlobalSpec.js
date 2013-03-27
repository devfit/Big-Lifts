describe("Add Rounding to Global Settings", function () {
    beforeEach(function () {
        this.migration = Ext.create('biglifts.migrations.AddRoundingToGlobal');

        this.global = reloadStore(emptyStore(biglifts.stores.GlobalSettings));
        this.w531 = reloadStore(emptyStore(biglifts.stores.w.Settings));
    });

    test('should pull over existing 5/3/1 rounding settings', function () {
        var w531 = this.w531.first();
        w531.set('roundingValue', '1');
        w531.set('roundingType', 'down');
        w531.save();
        this.w531.sync();

        this.migration.run();

        equal(this.global.first().get('roundingValue'),'1');
        equal(this.global.first().get('roundingType'),'down');
    });
});