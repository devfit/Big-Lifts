describe("Triumvirate Store", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.triumvirate = biglifts.stores.assistance.TriumvirateMovement;
        reloadStore(this.lifts);
        reloadStore(this.triumvirate);
    });

    test("should add unknown triumvirate movements for non-default big lifts", function () {
        this.lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        this.lifts.sync();

        this.triumvirate.addMissingCustomLiftAssociations();

        var NUMBER_OF_LIFTS = 5;
        var MOVEMENTS_PER_LIFT = 2;
        equal(this.triumvirate.getCount(),NUMBER_OF_LIFTS * MOVEMENTS_PER_LIFT);
    });

    test("should add custom movements with an order property", function () {
        this.triumvirate.filter('liftProperty', 'press');
        this.triumvirate.addWithOrder({liftProperty: 'press', name: 'Rows'});
        equal(this.triumvirate.getCount(),3);
        equal(this.triumvirate.last().get('name'),'Rows');
    });
});