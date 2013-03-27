describe("Sst Store", function () {
    beforeEach(function () {
        this.sstSets = biglifts.stores.assistance.SSTSets;
        reloadStore(this.sstSets);
    });

    test("should load default lifts", function () {
        equal(this.sstSets.getCount(),12);
    });
});