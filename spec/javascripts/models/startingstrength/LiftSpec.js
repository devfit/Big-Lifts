describe("Starting Strength lift", function () {
    var liftStore = biglifts.stores.ss.Lifts;

    beforeEach(function () {
        liftStore.removeAll();
        liftStore.sync();
    });

    it("should load default lifts", function () {
        liftStore.load();
        biglifts.stores.GlobalSettings.load();
        expect(liftStore.getCount()).toEqual(5);
    });

    it("should adjust lift increases when the units are changed to kg", function () {
        liftStore.load();
        biglifts.stores.GlobalSettings.load();

        biglifts.stores.GlobalSettings.first().set('units', 'kg');
        biglifts.stores.GlobalSettings.sync();
        liftStore.adjustUnits();
        expect(liftStore.findRecord('name', 'Squat').get('increase')).toEqual(5);
    });

    it("should adjust lift increases when the units are changed to lbs", function () {
        liftStore.load();
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