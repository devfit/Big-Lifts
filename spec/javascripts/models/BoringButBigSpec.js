describe("Boring But Big Model", function () {
    beforeEach(function () {
        biglifts.stores.lifts.Lifts.load();
        biglifts.stores.lifts.Lifts.removeAll();
        biglifts.stores.lifts.Lifts.sync();

        biglifts.stores.assistance.BoringButBig.removeAll();
        biglifts.stores.assistance.BoringButBig.sync();

        biglifts.stores.assistance.BoringButBigPercentage.load();
        biglifts.stores.Settings.load();

        biglifts.stores.lifts.Lifts.add({name:'Clean', propertyName:'clean', max:300});
    });

    it("should default to a copy of each of the current big lifts", function () {
        biglifts.stores.assistance.BoringButBig.load();
        biglifts.stores.lifts.Lifts.fireEvent('load');

        expect(biglifts.stores.assistance.BoringButBig.getCount()).toEqual(biglifts.stores.lifts.Lifts.getCount());
    });

    it("should default to a null weight and non-null associated movement_lift_id", function () {
        biglifts.stores.lifts.Lifts.fireEvent('load');
        biglifts.stores.assistance.BoringButBig.load();

        var firstBbbLift = biglifts.stores.assistance.BoringButBig.first();
        expect(firstBbbLift.get('movement_lift_id')).toEqual(biglifts.stores.lifts.Lifts.first().getId().toString());
        expect(firstBbbLift.get('weight')).toEqual(null);
    });

    it("should return the weight of the record if it exists", function () {
        biglifts.stores.assistance.BoringButBig.add({name:"Chins", weight:25});
        var weight = biglifts.stores.assistance.BoringButBig.getWeightForRecord(biglifts.stores.assistance.BoringButBig.first().data);
        expect(weight).toEqual(25);
    });

    it("should return a percentage of the associated lift's weight of an associated lift exists", function () {
        biglifts.stores.assistance.BoringButBigPercentage.first().set('percentage', 50);
        biglifts.stores.assistance.BoringButBig.add({name:"Clean", movement_lift_id:biglifts.stores.lifts.Lifts.first().getId()});
        var weight = biglifts.stores.assistance.BoringButBig.getWeightForRecord(biglifts.stores.assistance.BoringButBig.first().data);
        expect(weight).toEqual(300 * 0.9 * 0.5);
    });

    it("should store the boring but big main lift when creating default records", function () {
        biglifts.stores.lifts.Lifts.fireEvent('load');
        biglifts.stores.assistance.BoringButBig.load();

        var firstBbbLift = biglifts.stores.assistance.BoringButBig.first();
        expect(firstBbbLift.get('lift_id')).toEqual(biglifts.stores.lifts.Lifts.first().getId().toString());
    });

    it("should return the name of the associated lift record for the movement", function () {
        biglifts.stores.lifts.Lifts.fireEvent('load');
        biglifts.stores.assistance.BoringButBig.load();

        var firstBbbLift = biglifts.stores.assistance.BoringButBig.first();
        expect(biglifts.stores.assistance.BoringButBig.getNameForRecord(firstBbbLift.data)).toEqual('Clean');
    });

    it("should return the name of the movement if it is set", function () {
        biglifts.stores.lifts.Lifts.fireEvent('load');
        biglifts.stores.assistance.BoringButBig.load();

        biglifts.stores.assistance.BoringButBig.add({name:"Chins"});
        expect(biglifts.stores.assistance.BoringButBig.getNameForRecord(biglifts.stores.assistance.BoringButBig.last().data)).toEqual('Chins');
    });
});