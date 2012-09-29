describe("Plate Bar view", function () {
    describe("should determine if the default plates are still being used", function () {
        it("should return false with no plates", function () {
            wendler.stores.Plates.removeAll();
            expect(wendler.maxes.barSetup.platesAreDefault(wendler.stores.defaults.defaultPlatesLbs)).toEqual(false);
        });

        it("should return true with default plates", function () {
            wendler.stores.Plates.removeAll();
            wendler.stores.Plates.add(wendler.stores.defaults.defaultPlatesLbs);
            wendler.stores.Plates.sync();
            expect(wendler.maxes.barSetup.platesAreDefault(wendler.stores.defaults.defaultPlatesLbs)).toEqual(true);
        });

        it("should return true with default plates for the wrong weight type", function () {
            wendler.stores.Plates.removeAll();
            wendler.stores.Plates.add(wendler.stores.defaults.defaultPlatesKg);
            wendler.stores.Plates.sync();
            expect(wendler.maxes.barSetup.platesAreDefault(wendler.stores.defaults.defaultPlatesLbs)).toEqual(false);
        });
    });
});