describe("Starting Strength lift", function () {
    var liftStore = biglifts.stores.ss.Lifts;
    it("should load default lifts", function () {
        liftStore.load();
        expect(liftStore.getCount()).toEqual(5);
    });
});