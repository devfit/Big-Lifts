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

    test("should default to a copy of each of the current big lifts", function () {
        this.lifts.load();
        this.bbb.load();

        equal(this.bbb.getCount(),4);
    });

    test("should default to a null weight and non-null associated movement_lift_id", function () {
        this.lifts.load();
        this.bbb.load();

        var firstBbbLift = this.bbb.first();
        equal(firstBbbLift.get('movement_lift_id'),this.lifts.first().getId().toString());
        equal(firstBbbLift.get('weight'),null);
    });

    test("should return the weight of the record if it exists", function () {
        this.bbb.add({name: "Chins", weight: 25});
        this.bbb.sync();
        var weight = this.bbb.getWeightForRecord(this.bbb.findRecord('name', 'Chins').data);
        equal(weight,25);
    });

    test("should return 0 if no weight or associated record are set", function () {
        this.bbb.add({name: "Chins", sets: 5});
        this.bbb.sync();
        var weight = this.bbb.getWeightForRecord(this.bbb.findRecord('name', 'Chins').data);
        equal(weight,0);
    });

    test("should return a percentage of the associated lift's weight of an associated lift exists", function () {
        this.bbbPercentage.first().set('percentage', 50);
        this.lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        this.lifts.sync();
        this.bbb.add({name: "Clean", movement_lift_id: this.lifts.findRecord('name', 'Clean').getId()});
        var weight = this.bbb.getWeightForRecord(this.bbb.findRecord('name', 'Clean').data);
        equal(weight,300 * 0.9 * 0.5);
    });

    test("should store the boring but big main lift when creating default records", function () {
        this.lifts.load();
        this.bbb.load();

        var firstBbbLift = this.bbb.first();
        equal(firstBbbLift.get('lift_id'),this.lifts.first().getId().toString());
    });

    test("should return the name of the associated lift record for the movement", function () {
        this.lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        this.lifts.sync();
        this.bbb.load();

        var firstBbbLift = this.bbb.first();
        equal(this.bbb.getNameForRecord(firstBbbLift.data),'Clean');
    });

    test("should return the name of the movement if it is set", function () {
        this.lifts.load();
        this.bbb.load();

        this.bbb.add({name: "Chins"});
        equal(this.bbb.getNameForRecord(this.bbb.last().data),'Chins');
    });

    test("should not create duplicates of existing lifts", function () {
        this.lifts.load();
        this.bbb.syncAssistanceToLifts();
        this.bbb.syncAssistanceToLifts();

        equal(this.bbb.getCount(),4);
    });
});