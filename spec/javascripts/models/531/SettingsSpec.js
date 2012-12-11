describe("531 Settings", function () {
    beforeEach(function () {
        localStorage.clear();
        this.settings = biglifts.stores.w.Settings;
        this.settings.removeAll();
        this.settings.sync();

        this.globalSettings = biglifts.stores.GlobalSettings;
        this.globalSettings.removeAll();
        this.globalSettings.sync();
    });

    it("should use global settings to override local settings when calling getCombinedSettings", function () {
        this.settings.add({units: 'kg'});
        this.settings.sync();
        this.globalSettings.add({units: 'override'});
        this.globalSettings.sync();

        expect(this.settings.getCombinedSettings().units).toEqual('override')
    });
});