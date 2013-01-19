describe("PowerliftingTotalLifts", function () {
    beforeEach(function () {
        this.lifts = reloadStore(biglifts.stores.lifts.Lifts);
        this.powerliftingLifts = emptyStore(biglifts.stores.PowerliftingTotalLifts);
    });

    it("should load default lifts", function () {
        this.powerliftingLifts.setupDefaults();
        expect(this.powerliftingLifts.getCount()).toEqual(4);
        this.powerliftingLifts.filter('included', true);
        expect(this.powerliftingLifts.getCount()).toEqual(3);
    });

    it("should ignore missing lifts when loading defaults", function () {
        this.lifts.remove(this.lifts.findRecord('name', 'Squat'));
        this.lifts.sync();
        this.powerliftingLifts.setupDefaults();
        this.powerliftingLifts.filter('included', true);
        expect(this.powerliftingLifts.getCount()).toEqual(2);
    });

    it("should sync to add lifts", function () {
        this.powerliftingLifts.syncToLifts();
        expect(this.powerliftingLifts.getCount()).toEqual(4);
    });

    it("should sync to remove lifts", function () {
        this.powerliftingLifts.syncToLifts();
        this.lifts.remove(this.lifts.findRecord('name','Squat'));
        this.lifts.sync();
        this.powerliftingLifts.syncToLifts();
        expect(this.powerliftingLifts.getCount()).toEqual(3);
    });
});