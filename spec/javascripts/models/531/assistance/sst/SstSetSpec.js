describe("Sst Store", function () {
    beforeEach(function () {
        this.sstSets = biglifts.stores.assistance.SSTSets;
        reloadStore(this.sstSets);
    });

    it("should load default lifts", function () {
        expect(this.sstSets.getCount()).toEqual(12);
    });
});