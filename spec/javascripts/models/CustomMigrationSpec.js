describe("Custom Assistance Migrations", function () {
    it("should add unknown custom movements for non-default big lifts", function () {
        biglifts.stores.lifts.Lifts.load();
        biglifts.stores.assistance.CustomMovement.load();

        biglifts.stores.lifts.Lifts.add({name:'Clean', propertyName:'clean', max:300});
        biglifts.stores.lifts.Lifts.sync();

        biglifts.stores.migrations.customMovementsMigration(biglifts.stores.assistance.CustomMovement);

        var NUMBER_OF_LIFTS = 5;
        var MOVEMENTS_PER_LIFT = 2;
        expect(biglifts.stores.assistance.CustomMovement.getCount()).toEqual(NUMBER_OF_LIFTS * MOVEMENTS_PER_LIFT);
    });
});