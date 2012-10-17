describe("Plate Bar Configuration Model", function () {
    it("should migrate weightInLbs to weight and units", function () {
        var store = Ext.create('Ext.data.Store', {
            model:'Plates'
        });

        store.add({weightInLbs:45, count:2});
        store.add({weightInLbs:35, count:2});
        store.sync();
        biglifts.stores.plates.migrateWeightInLbsToWeightAndUnits(store);

        expect(store.first().get('weightInLbs')).toEqual(null);
        expect(store.first().get('weight')).toEqual(45);

        expect(store.last().get('weightInLbs')).toEqual(null);
        expect(store.last().get('weight')).toEqual(35);
    });
});