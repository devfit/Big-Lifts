describe("Plate Bar view", function () {
    describe("should determine if the default plates are still being used", function () {
        it("should return false with no plates", function () {
            biglifts.stores.Plates.removeAll();
            expect(biglifts.maxes.barSetup.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS)).toEqual(false);
        });

        it("should return true with default plates", function () {
            biglifts.stores.Plates.removeAll();
            biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_LBS);
            biglifts.stores.Plates.sync();
            expect(biglifts.maxes.barSetup.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS)).toEqual(true);
        });

        it("should return true with default plates for the wrong weight type", function () {
            biglifts.stores.Plates.removeAll();
            biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_KG);
            biglifts.stores.Plates.sync();
            expect(biglifts.maxes.barSetup.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS)).toEqual(false);
        });
    });
});