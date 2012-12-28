describe("Triumvirate Store", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.triumvirate = biglifts.stores.assistance.TriumvirateMovement;
        reloadStore(this.lifts);
        reloadStore(this.triumvirate);
    });

    it("should add unknown triumvirate movements for non-default big lifts", function () {
        this.lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        this.lifts.sync();

        this.triumvirate.addMissingCustomLiftAssociations();

        var NUMBER_OF_LIFTS = 5;
        var MOVEMENTS_PER_LIFT = 2;
        expect(this.triumvirate.getCount()).toEqual(NUMBER_OF_LIFTS * MOVEMENTS_PER_LIFT);
    });

    it("should add custom movements with an order property", function () {
        this.triumvirate.filter('liftProperty', 'press');
        this.triumvirate.addWithOrder({liftProperty: 'press', name: 'Rows'});
        expect(this.triumvirate.getCount()).toEqual(3);
        expect(this.triumvirate.last().get('name')).toEqual('Rows');
    });
});