describe("Global Settings Defaults Migration", function () {
    beforeEach(function () {
        this.settings = biglifts.stores.GlobalSettings;
        this.settings531 = biglifts.stores.w.Settings;
        this.routines = biglifts.stores.Routine;

        this.settings.removeAll();
        this.settings531.removeAll();
        this.routines.removeAll();

        this.migration = Ext.create('biglifts.migrations.globalSettingsDefaults');
    });

    it("should default to units lbs if no routines have been loaded", function () {
        this.migration.run();
        this.routines.fireEvent('load');
        expect(this.settings.getUnits()).toEqual('lbs');
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
});