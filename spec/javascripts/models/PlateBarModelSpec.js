describe("Plate Bar Model", function () {
    it("should migrate weightInLbs to weight and units", function () {
        var store = Ext.create('PlateStore');
        store.add({weightInLbs:45, count:2});
        store.add({weightInLbs:35, count:2});
        store.sync();
        store.migrateWeightInLbsToWeightAndUnits();

        expect(store.first().get('weightInLbs')).toEqual(null);
        expect(store.first().get('weight')).toEqual(45);

        expect(store.last().get('weightInLbs')).toEqual(null);
        expect(store.last().get('weight')).toEqual(35);
    });

    describe("should determine if the default plates are still being used", function () {
        it("should return false with no plates", function () {
            biglifts.stores.Plates.removeAll();
            expect(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS)).toEqual(false);
        });

        it("should return true with default plates", function () {
            biglifts.stores.Plates.removeAll();
            biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_LBS);
            biglifts.stores.Plates.sync();
            expect(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS)).toEqual(true);
        });

        it("should return true with default plates for the wrong weight type", function () {
            biglifts.stores.Plates.removeAll();
            biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_KG);
            biglifts.stores.Plates.sync();
            expect(biglifts.stores.Plates.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS)).toEqual(false);
        });
    });
});