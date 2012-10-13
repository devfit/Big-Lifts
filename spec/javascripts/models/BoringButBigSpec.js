describe("Boring But Big Model", function () {
    beforeEach(function () {
        wendler.stores.assistance.BoringButBig.load();
        wendler.stores.assistance.BoringButBig.removeAll();
        wendler.stores.lifts.Lifts.load();
        wendler.stores.lifts.Lifts.removeAll();

        wendler.stores.lifts.Lifts.add({name:'Clean', propertyName:'clean', max:300});
        wendler.stores.lifts.Lifts.sync();
        wendler.stores.assistance.BoringButBig.sync();
    });

    it("should default to a copy of each of the current big lifts", function () {
        wendler.stores.assistance.BoringButBig.load();
        wendler.stores.lifts.Lifts.fireEvent('load');

        expect(wendler.stores.assistance.BoringButBig.getCount()).toEqual(wendler.stores.lifts.Lifts.getCount());
    });

    it("should default to a null weight and non-null associated lift_id", function () {
        wendler.stores.assistance.BoringButBig.load();
        wendler.stores.lifts.Lifts.fireEvent('load');

        var firstBbbLift = wendler.stores.assistance.BoringButBig.first();
        expect(firstBbbLift.get('lift_id')).toEqual(wendler.stores.lifts.Lifts.first().id);
        expect(firstBbbLift.get('weight')).toEqual(null);
    });
});