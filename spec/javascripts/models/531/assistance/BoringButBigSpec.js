(function () {
    var MODULE_NAME = "Boring But Big Model";
    module(MODULE_NAME);
    var lifts;
    var bbb;
    var bbbPercentage;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            lifts = reloadStore(emptyStore(biglifts.stores.lifts.Lifts));
            bbb = reloadStore(emptyStore(biglifts.stores.assistance.BoringButBig));

            bbbPercentage = reloadStore(emptyStore(biglifts.stores.assistance.BoringButBigPercentage));
            reloadStore(emptyStore(biglifts.stores.w.Settings));
        }
    });

    test("should default to a copy of each of the current big lifts", function () {
        equal(bbb.getCount(), 4);
    });

    test("should default to a null weight and non-null associated movement_lift_id", function () {
        var firstBbbLift = bbb.first();
        equal(firstBbbLift.get('movement_lift_id'), lifts.first().getId().toString());
        equal(firstBbbLift.get('weight'), null);
    });

    test("should return the weight of the record if it exists", function () {
        bbb.add({name: "Chins", weight: 25});
        bbb.sync();
        var weight = bbb.getWeightForRecord(bbb.findRecord('name', 'Chins').data);
        equal(weight, 25);
    });

    test("should return 0 if no weight or associated record are set", function () {
        bbb.add({name: "Chins", sets: 5});
        bbb.sync();
        var weight = bbb.getWeightForRecord(bbb.findRecord('name', 'Chins').data);
        equal(weight, 0);
    });

    test("should return a percentage of the associated lift's weight of an associated lift exists", function () {
        bbbPercentage.first().set('percentage', 50);
        lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        lifts.sync();
        bbb.add({name: "Clean", movement_lift_id: lifts.findRecord('name', 'Clean').getId()});
        var weight = bbb.getWeightForRecord(bbb.findRecord('name', 'Clean').data);
        equal(weight, 300 * 0.9 * 0.5);
    });

    test("should store the boring but big main lift when creating default records", function () {
        var firstBbbLift = bbb.first();
        equal(firstBbbLift.get('lift_id'), lifts.first().getId().toString());
    });

    test("should return the name of the associated lift record for the movement", function () {
        lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        lifts.sync();
        bbb.syncAssistanceToLifts();

        var bbbCleanRecord = bbb.findRecord('lift_id', lifts.findRecord('name', 'Clean').get('id'));
        equal(bbb.getNameForRecord(bbbCleanRecord.data), 'Clean');
    });

    test("should return the name of the movement if it is set", function () {
        bbb.add({name: "Chins"});
        equal(bbb.getNameForRecord(bbb.last().data), 'Chins');
    });

    test("should not create duplicates of existing lifts", function () {
        bbb.syncAssistanceToLifts();
        equal(bbb.getCount(), 4);
    });
})();
