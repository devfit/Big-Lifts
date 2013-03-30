(function () {
    var MODULE_NAME = "Plate Bar Model";
    module(MODULE_NAME);

    test("should be able to find 1kg units if 10kg units exist", function () {
        var store = Ext.create('PlateStore');
        store.add({weight: 10, count: 2});
        var oneLbRecord = store.add({weight: 1, count: 2})[0];
        store.sync();

        equal(store.findRecordByWeight(1).get('id'), oneLbRecord.get('id'));
    });

    test("should migrate weightInLbs to weight and units", function () {
        var store = Ext.create('PlateStore');
        store.add({weightInLbs: 45, count: 2});
        store.add({weightInLbs: 35, count: 2});
        store.sync();
        store.migrateWeightInLbsToWeightAndUnits();

        equal(store.first().get('weightInLbs'), null);
        equal(store.first().get('weight'), 45);

        equal(store.last().get('weightInLbs'), null);
        equal(store.last().get('weight'), 35);
    });

    test("should return false with no plates", function () {
        biglifts.stores.Plates.removeAll();
        equal(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS), false);
    });

    test("should return true with default plates", function () {
        biglifts.stores.Plates.removeAll();
        biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_LBS);
        biglifts.stores.Plates.sync();
        equal(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS), true);
    });

    test("should return true with default plates for the wrong weight type", function () {
        biglifts.stores.Plates.removeAll();
        biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_KG);
        biglifts.stores.Plates.sync();
        equal(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS), false);
    });
})();
