describe("Global Settings Defaults Migration", function () {
    beforeEach(function () {
        this.settings = ensureLoaded(biglifts.stores.GlobalSettings);
        this.settings531 = reloadStore(biglifts.stores.w.Settings);
        this.routines = reloadStore(biglifts.stores.Routine);
    });

    test("should copy 5/3/1 settings if they exist and a routine is loaded", function () {
        this.settings531.first().set({units:'test'});
        this.settings531.sync();

        this.routines.add({name:"5/3/1"});
        this.routines.sync();

        Ext.create('biglifts.migrations.globalSettingsDefaults').run();

        expect(this.settings.getUnits(),'test');
    });
});