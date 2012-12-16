describe("Global Settings Defaults Migration", function () {
    beforeEach(function () {
        this.routines = biglifts.stores.Routine;
        this.migration = Ext.create('biglifts.migrations.fixBbbDoubling');
        this.bbb = biglifts.stores.assistance.BoringButBig;
        this.bbb.removeAll();
        this.bbb.sync();
    });

    it("should remove BBB duplicates of main lifts", function () {
        this.bbb.add({lift_id: '1', movement_lift_id: '1'});
        this.bbb.add({lift_id: '1', movement_lift_id: '1'});
        this.bbb.add({lift_id: '2', movement_lift_id: '2'});
        this.bbb.sync();

        expect(this.bbb.getCount()).toEqual(3);
        this.migration.run();
        this.routines.fireEvent('load');
        expect(this.bbb.getCount()).toEqual(2);
    });
});