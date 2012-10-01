describe("Triumvirate Migrations", function () {
    it("should add unknown triumvirate movements for non-default big lifts", function () {
        wendler.stores.lifts.Lifts.load();
        wendler.stores.assistance.TriumvirateMovement.load();

        wendler.stores.lifts.Lifts.add({name:'Clean', propertyName:'clean', max:300});
        wendler.stores.lifts.Lifts.sync();

        wendler.stores.migrations.triumvirateMovementsMigration(wendler.stores.assistance.TriumvirateMovement);

        var NUMBER_OF_LIFTS = 5;
        var MOVEMENTS_PER_LIFT = 2;
        expect(wendler.stores.assistance.TriumvirateMovement.getCount()).toEqual(NUMBER_OF_LIFTS * MOVEMENTS_PER_LIFT);
    });
});