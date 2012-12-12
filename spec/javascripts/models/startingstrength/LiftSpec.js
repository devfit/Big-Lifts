describe("Starting Strength lift", function () {
    var liftStore = biglifts.stores.ss.Lifts;

    beforeEach(function () {
        liftStore.removeAll();
        liftStore.sync();
    });

    it("should load default lifts", function () {
        liftStore.load();
        biglifts.stores.GlobalSettings.load();
        biglifts.stores.Migrations.load();
        expect(liftStore.getCount()).toEqual(5);
    });

    it("should adjust lift increases when the units are changed to kg", function () {
        liftStore.load();
        liftStore.changeUnitsTo('kg');
        expect(liftStore.findRecord('name', 'Squat').get('increase')).toEqual(5);
    });

    it("should adjust lift increases when the units are changed to lbs", function () {
        liftStore.load();
        liftStore.changeUnitsTo('kg');
        liftStore.changeUnitsTo('lbs');
        expect(liftStore.findRecord('name', 'Squat').get('increase')).toEqual(10);
    });
});