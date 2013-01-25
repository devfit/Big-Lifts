describe("531 Settings", function () {
    beforeEach(function () {
        localStorage.clear();
        this.settings = reloadStore(biglifts.stores.w.Settings);
        this.globalSettings = ensureLoaded(biglifts.stores.GlobalSettings);
    });

    it("should use global settings to override local settings when calling getCombinedSettings", function () {
        this.settings.first().set({units:'kg'});
        this.settings.sync();
        this.globalSettings.first().set({units:'override'});
        this.globalSettings.sync();

        expect(this.settings.getCombinedSettings().units).toEqual('override')
    });
});