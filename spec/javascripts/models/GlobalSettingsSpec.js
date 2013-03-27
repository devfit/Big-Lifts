describe("Global Settings", function () {
    beforeEach(function () {
        this.globalSettings = reloadStore(emptyStore(biglifts.stores.GlobalSettings));
    });

    test("should have rounding defaults", function () {
        var settings = this.globalSettings.first();
        expect(settings.get('roundingValue'),'5');
        expect(settings.get('roundingType'),'normal');
    });
});