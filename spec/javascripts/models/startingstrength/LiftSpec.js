describe("Starting Strength lift", function () {
    var liftStore = biglifts.stores.ss.Lifts;

    beforeEach(function () {
        reloadStore(liftStore);
    });

    it("should load default lifts", function () {
        biglifts.stores.GlobalSettings.load();
        expect(liftStore.getCount()).toEqual(5);
    });

    it("should adjust lift increases when the units are changed to kg", function () {
        biglifts.stores.GlobalSettings.load();

        biglifts.stores.GlobalSettings.first().set('units', 'kg');
        biglifts.stores.GlobalSettings.sync();
        liftStore.adjustUnits();
        expect(liftStore.findRecord('name', 'Squat').get('increase')).toEqual(5);
    });

    it("should adjust lift increases when the units are changed to lbs", function () {
        biglifts.stores.GlobalSettings.load();

        biglifts.stores.GlobalSettings.first().set('units', 'kg');
        biglifts.stores.GlobalSettings.sync();
        liftStore.adjustUnits();

        biglifts.stores.GlobalSettings.first().set('units', 'lbs');
        biglifts.stores.GlobalSettings.sync();
        liftStore.adjustUnits();

        expect(liftStore.findRecord('name', 'Squat').get('increase')).toEqual(10);
    });
});