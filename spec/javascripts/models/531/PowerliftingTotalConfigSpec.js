describe("PowerliftingTotalConfig", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.powerliftingConfig = biglifts.stores.PowerliftingTotalConfig;
        reloadStore(this.lifts);
        reloadStore(this.powerliftingConfig);
    });

    it("should load default lifts", function () {
        expect(this.powerliftingConfig.getCount()).toEqual(3);
    });

    it("should ignore missing lifts when loading defaults", function () {
        this.lifts.remove(this.lifts.findRecord('name', 'Squat'));
        this.lifts.sync();
        this.powerliftingConfig.removeAll();
        this.powerliftingConfig.sync();
        this.powerliftingConfig.setupDefaults();

        expect(this.powerliftingConfig.getCount()).toEqual(2);
    });
});