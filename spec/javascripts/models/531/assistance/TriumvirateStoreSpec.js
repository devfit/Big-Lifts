(function () {
    var MODULE_NAME = "Triumvirate Store";
    module(MODULE_NAME);
    var lifts;
    var triumvirate;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            lifts = reloadStore(emptyStore(biglifts.stores.lifts.Lifts));
            triumvirate = reloadStore(emptyStore(biglifts.stores.assistance.TriumvirateMovement));
        }
    });

    test("should add unknown triumvirate movements for non-default big lifts", function () {
        lifts.add({name: 'Clean', propertyName: 'clean', max: 300});
        lifts.sync();

        triumvirate.addMissingCustomLiftAssociations();

        var NUMBER_OF_LIFTS = 5;
        var MOVEMENTS_PER_LIFT = 2;
        equal(triumvirate.getCount(), NUMBER_OF_LIFTS * MOVEMENTS_PER_LIFT);
    });

    test("should add custom movements with an order property", function () {
        triumvirate.filter('liftProperty', 'press');
        triumvirate.addWithOrder({liftProperty: 'press', name: 'Rows'});
        equal(triumvirate.getCount(), 3);
        equal(triumvirate.last().get('name'), 'Rows');
    });
})();