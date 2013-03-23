describe("Global Settings", function () {
    beforeEach(function () {
        this.globalSettings = reloadStore(emptyStore(biglifts.stores.GlobalSettings));
    });

    it("should have rounding defaults", function () {
        var settings = this.globalSettings.first();
        expect(settings.get('roundingValue')).toEqual('5');
        expect(settings.get('roundingType')).toEqual('normal');
    });
});