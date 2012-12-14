describe("Global Settings Defaults Migration", function () {
    beforeEach(function () {
        this.routines = biglifts.stores.Routine;
        this.migration = Ext.create('biglifts.migrations.stitchBrokenLiftTemplates');
        this.liftProgressions = biglifts.stores.lifts.LiftProgression;
        this.liftProgressions.removeAll();
        this.liftProgressions.sync();
    });

    it("should copy 5/3/1 settings if they exist and a routine is loaded", function () {
        this.liftProgressions.add({week: 1, set: 1});
        this.liftProgressions.add({week: 1, set: 3});
        this.liftProgressions.add({week: 1, set: 5});
        this.liftProgressions.add({week: 2, set: 1});
        this.liftProgressions.add({week: 2, set: 2});
        this.liftProgressions.add({week: 2, set: 4});
        this.liftProgressions.sync();

        this.migration.run();
        this.routines.fireEvent('load');
        this.liftProgressions.fireEvent('load');

        var i = 0;
        this.liftProgressions.each(function (p) {
            var expectedSet = (i % 3 ) + 1;
            i++;
            expect(p.get('set')).toEqual(expectedSet);
        });
    });
});