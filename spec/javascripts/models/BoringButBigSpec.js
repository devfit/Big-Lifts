describe("Boring But Big Model", function () {
    beforeEach(function () {
        wendler.stores.lifts.Lifts.load();
        wendler.stores.lifts.Lifts.removeAll();
        wendler.stores.lifts.Lifts.sync();

        wendler.stores.assistance.BoringButBig.removeAll();
        wendler.stores.assistance.BoringButBig.sync();

        wendler.stores.assistance.BoringButBigPercentage.load();
        wendler.stores.Settings.load();

        wendler.stores.lifts.Lifts.add({name:'Clean', propertyName:'clean', max:300});
    });

    it("should default to a copy of each of the current big lifts", function () {
        wendler.stores.assistance.BoringButBig.load();
        wendler.stores.lifts.Lifts.fireEvent('load');

        expect(wendler.stores.assistance.BoringButBig.getCount()).toEqual(wendler.stores.lifts.Lifts.getCount());
    });

    it("should default to a null weight and non-null associated movement_lift_id", function () {
        wendler.stores.lifts.Lifts.fireEvent('load');
        wendler.stores.assistance.BoringButBig.load();

        var firstBbbLift = wendler.stores.assistance.BoringButBig.first();
        expect(firstBbbLift.get('movement_lift_id')).toEqual(wendler.stores.lifts.Lifts.first().getId().toString());
        expect(firstBbbLift.get('weight')).toEqual(null);
    });

    it("should return the weight of the record if it exists", function () {
        wendler.stores.assistance.BoringButBig.add({name:"Chins", weight:25});
        var weight = wendler.stores.assistance.BoringButBig.getWeightForRecord(wendler.stores.assistance.BoringButBig.first().data);
        expect(weight).toEqual(25);
    });

    it("should return a percentage of the associated lift's weight of an associated lift exists", function () {
        wendler.stores.assistance.BoringButBigPercentage.first().set('percentage', 50);
        wendler.stores.assistance.BoringButBig.add({name:"Clean", movement_lift_id:wendler.stores.lifts.Lifts.first().getId()});
        var weight = wendler.stores.assistance.BoringButBig.getWeightForRecord(wendler.stores.assistance.BoringButBig.first().data);
        expect(weight).toEqual(300 * 0.9 * 0.5);
    });

    it("should store the boring but big main lift when creating default records", function () {
        wendler.stores.lifts.Lifts.fireEvent('load');
        wendler.stores.assistance.BoringButBig.load();

        var firstBbbLift = wendler.stores.assistance.BoringButBig.first();
        expect(firstBbbLift.get('lift_id')).toEqual(wendler.stores.lifts.Lifts.first().getId().toString());
    });

    it("should return the name of the associated lift record for the movement", function () {
        wendler.stores.lifts.Lifts.fireEvent('load');
        wendler.stores.assistance.BoringButBig.load();

        var firstBbbLift = wendler.stores.assistance.BoringButBig.first();
        expect(wendler.stores.assistance.BoringButBig.getNameForRecord(firstBbbLift.data)).toEqual('Clean');
    });

    it("should return the name of the movement if it is set", function () {
        wendler.stores.lifts.Lifts.fireEvent('load');
        wendler.stores.assistance.BoringButBig.load();

        wendler.stores.assistance.BoringButBig.add({name:"Chins"});
        expect(wendler.stores.assistance.BoringButBig.getNameForRecord(wendler.stores.assistance.BoringButBig.last().data)).toEqual('Chins');
    });
});