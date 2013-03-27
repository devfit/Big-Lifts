describe("PowerliftingTotalLifts", function () {
    beforeEach(function () {
        this.lifts = reloadStore(biglifts.stores.lifts.Lifts);
        this.powerliftingLifts = emptyStore(biglifts.stores.PowerliftingTotalLifts);
    });

    test("should load default lifts", function () {
        this.powerliftingLifts.setupDefaults();
        expect(this.powerliftingLifts.getCount(),4);
        this.powerliftingLifts.filter('included', true);
        expect(this.powerliftingLifts.getCount(),3);
    });

    test("should ignore missing lifts when loading defaults", function () {
        this.lifts.remove(this.lifts.findRecord('name', 'Squat'));
        this.lifts.sync();
        this.powerliftingLifts.setupDefaults();
        this.powerliftingLifts.filter('included', true);
        expect(this.powerliftingLifts.getCount(),2);
    });

    test("should sync to add lifts", function () {
        this.powerliftingLifts.syncToLifts();
        expect(this.powerliftingLifts.getCount(),4);
    });

    test("should sync to remove lifts", function () {
        this.powerliftingLifts.syncToLifts();
        this.lifts.remove(this.lifts.findRecord('name','Squat'));
        this.lifts.sync();
        this.powerliftingLifts.syncToLifts();
        expect(this.powerliftingLifts.getCount(),3);
    });
});