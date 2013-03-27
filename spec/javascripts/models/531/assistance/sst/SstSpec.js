describe("Sst Store", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.sst = biglifts.stores.assistance.SST;
        reloadStore(this.lifts);
        reloadStore(this.sst);
    });

    test("should load default lifts", function () {
        equal(this.sst.getCount(),4);
    });
});