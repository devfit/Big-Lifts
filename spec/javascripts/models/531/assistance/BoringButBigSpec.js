describe("Boring But Big Model", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.bbb = biglifts.stores.assistance.BoringButBig;
        this.lifts.removeAll();
        this.bbb.removeAll();
        this.lifts.sync();
        this.bbb.sync();

        this.bbbPercentage = reloadStore(biglifts.stores.assistance.BoringButBigPercentage);
        reloadStore(biglifts.stores.w.Settings);
    });

    it("should default to a copy of each of the current big lifts", function () {
        this.lifts.load();
        this.bbb.load();

        expect(this.bbb.getCount()).toEqual(4);
    });

    it("should default to a null weight and non-null associated movement_lift_id", function () {
        this.lifts.load();
        this.bbb.load();

        var firstBbbLift = this.bbb.first();
        expect(firstBbbLift.get('movement_lift_id')).toEqual(this.lifts.first().getId().toString());
        expect(firstBbbLift.get('weight')).toEqual(null);
    });

    it("should return the weight of the record if it exists", function () {
        this.bbb.add({name: "Chins", weight: 25});
        this.bbb.sync();
        var weight = this.bbb.getWeightForRecord(this.bbb.findRecord('name', 'Chins').data);
        expect(weight).toEqual(25);
    });

    it("should return 0 if no weight or associated record are set", function () {
        this.bbb.add({name: "Chins", sets: 5});
        this.bbb.sync();
        var weight = this.bbb.getWeightForRecord(this.bbb.findRecord('name', 'Chins').data);
        expect(weight).toEqual(0);
    });

    it("should return a percentage of the associated lift's weight of an associated lift exists", function () {
        this.bbbPercentage.first().set('percentage', 50);
        this.lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        this.lifts.sync();
        this.bbb.add({name: "Clean", movement_lift_id: this.lifts.findRecord('name', 'Clean').getId()});
        var weight = this.bbb.getWeightForRecord(this.bbb.findRecord('name', 'Clean').data);
        expect(weight).toEqual(300 * 0.9 * 0.5);
    });

    it("should store the boring but big main lift when creating default records", function () {
        this.lifts.load();
        this.bbb.load();

        var firstBbbLift = this.bbb.first();
        expect(firstBbbLift.get('lift_id')).toEqual(this.lifts.first().getId().toString());
    });

    it("should return the name of the associated lift record for the movement", function () {
        this.lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        this.lifts.sync();
        this.bbb.load();

        var firstBbbLift = this.bbb.first();
        expect(this.bbb.getNameForRecord(firstBbbLift.data)).toEqual('Clean');
    });

    it("should return the name of the movement if it is set", function () {
        this.lifts.load();
        this.bbb.load();

        this.bbb.add({name: "Chins"});
        expect(this.bbb.getNameForRecord(this.bbb.last().data)).toEqual('Chins');
    });

    it("should not create duplicates of existing lifts", function () {
        this.lifts.load();
        this.bbb.syncAssistanceToLifts();
        this.bbb.syncAssistanceToLifts();

        expect(this.bbb.getCount()).toEqual(4);
    });
});