describe("PowerliftingTotalConfig", function () {
    beforeEach(function () {
        this.lifts = reloadStore(biglifts.stores.lifts.Lifts);
        this.powerliftingConfig = emptyStore(biglifts.stores.PowerliftingTotalConfig);
    });

    it("should load default lifts", function () {
        this.powerliftingConfig.setupDefaults();
        expect(this.powerliftingConfig.getCount()).toEqual(4);
        this.powerliftingConfig.filter('included', true);
        expect(this.powerliftingConfig.getCount()).toEqual(3);
    });

    it("should ignore missing lifts when loading defaults", function () {
        this.lifts.remove(this.lifts.findRecord('name', 'Squat'));
        this.lifts.sync();
        this.powerliftingConfig.setupDefaults();
        this.powerliftingConfig.filter('included', true);
        expect(this.powerliftingConfig.getCount()).toEqual(2);
    });

    it("should sync to add lifts", function () {
        this.powerliftingConfig.syncToLifts();
        expect(this.powerliftingConfig.getCount()).toEqual(4);
    });

    it("should sync to remove lifts", function () {
        this.powerliftingConfig.syncToLifts();
        this.lifts.remove(this.lifts.findRecord('name','Squat'));
        this.lifts.sync();
        this.powerliftingConfig.syncToLifts();
        expect(this.powerliftingConfig.getCount()).toEqual(3);
    });
});