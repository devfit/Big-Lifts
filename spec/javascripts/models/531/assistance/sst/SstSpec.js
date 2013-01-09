describe("Sst Store", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.sst = biglifts.stores.assistance.SST;
        reloadStore(this.lifts);
        reloadStore(this.sst);
    });

    it("should load default lifts", function () {
        expect(this.sst.getCount()).toEqual(4);
    });
});