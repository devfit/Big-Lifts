describe("Starting Strength lift spec", function () {
    var liftStore = biglifts.stores.ss.Lifts;
    it("should load default lifts", function () {
        liftStore.load();
        expect(liftStore.getCount()).toEqual(5);
    });
});