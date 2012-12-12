describe("Global Settings Defaults Migration", function () {
    beforeEach(function () {
        this.settings = biglifts.stores.GlobalSettings;
        this.settings531 = biglifts.stores.w.Settings;
        this.routines = biglifts.stores.Routine;

        this.settings.removeAll();
        this.settings531.removeAll();
        this.routines.removeAll();
        this.settings.sync();
        this.settings531.sync();
        this.routines.sync();

        this.migration = Ext.create('biglifts.migrations.globalSettingsDefaults');
    });

    it("should copy 5/3/1 settings if they exist and a routine is loaded", function () {
        this.settings531.add({units: 'test'});
        this.settings531.sync();
        this.routines.add({name: "5/3/1"});
        this.routines.sync();

        this.migration.run();
        this.routines.fireEvent('load');
        this.settings531.fireEvent('load');

        expect(this.settings.getUnits()).toEqual('test');
    });

    it("should default to lbs if there is a routine and no existing 531 settings", function () {
        this.routines.add({name: "5/3/1"});
        this.routines.sync();

        this.migration.run();
        this.routines.fireEvent('load');
        this.settings531.fireEvent('load');

        expect(this.settings.getUnits()).toEqual('lbs');
    });
});