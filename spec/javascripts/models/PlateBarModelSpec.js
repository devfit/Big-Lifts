describe("Plate Bar Model", function () {
    test("should be able to find 1kg units if 10kg units exist", function () {
        var store = Ext.create('PlateStore');
        store.add({weight: 10, count: 2});
        var oneLbRecord = store.add({weight: 1, count: 2})[0];
        store.sync();

        expect(store.findRecordByWeight(1).get('id'),oneLbRecord.get('id'));
    });

    test("should migrate weightInLbs to weight and units", function () {
        var store = Ext.create('PlateStore');
        store.add({weightInLbs: 45, count: 2});
        store.add({weightInLbs: 35, count: 2});
        store.sync();
        store.migrateWeightInLbsToWeightAndUnits();

        expect(store.first().get('weightInLbs'),null);
        expect(store.first().get('weight'),45);

        expect(store.last().get('weightInLbs'),null);
        expect(store.last().get('weight'),35);
    });

    describe("should determine if the default plates are still being used", function () {
        test("should return false with no plates", function () {
            biglifts.stores.Plates.removeAll();
            expect(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS),false);
        });

        test("should return true with default plates", function () {
            biglifts.stores.Plates.removeAll();
            biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_LBS);
            biglifts.stores.Plates.sync();
            expect(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS),true);
        });

        test("should return true with default plates for the wrong weight type", function () {
            biglifts.stores.Plates.removeAll();
            biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_KG);
            biglifts.stores.Plates.sync();
            expect(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS),false);
        });
    });
});