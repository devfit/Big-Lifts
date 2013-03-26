describe("Starting Strength lift", function () {
    beforeEach(function () {
        reloadStore(biglifts.stores.GlobalSettings);
        this.liftStore = reloadStore(biglifts.stores.ss.Lifts);
    });

    it("should load default lifts", function () {
        expect(this.liftStore.getCount()).toEqual(5);
    });

    it("should load lifts with order", function () {
        expect(this.liftStore.first().get('order')).toEqual(0);
        expect(this.liftStore.last().get('order')).toEqual(4);
    });

    it("should adjust lift increases when the units are changed to kg", function () {
        ensureLoaded(biglifts.stores.GlobalSettings);

        biglifts.stores.GlobalSettings.first().set('units', 'kg');
        biglifts.stores.GlobalSettings.sync();

        this.liftStore.adjustUnits();
        expect(this.liftStore.findRecord('name', 'Squat').get('increase')).toEqual(5);
    });

    it("should adjust lift increases when the units are changed to lbs", function () {
        ensureLoaded(biglifts.stores.GlobalSettings);

        biglifts.stores.GlobalSettings.first().set('units', 'kg');
        biglifts.stores.GlobalSettings.sync();
        this.liftStore.adjustUnits();

        biglifts.stores.GlobalSettings.first().set('units', 'lbs');
        biglifts.stores.GlobalSettings.sync();
        this.liftStore.adjustUnits();

        expect(this.liftStore.findRecord('name', 'Squat').get('increase')).toEqual(10);
    });
});