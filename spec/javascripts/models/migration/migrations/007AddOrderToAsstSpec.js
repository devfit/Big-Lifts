(function () {
    var MODULE_NAME = "Adding order to assistance migration";
    module(MODULE_NAME);

    var routines;
    var migration;
    var triumvirate;
    var bodyweight;
    var bbb;
    var lifts;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            routines = reloadStore(biglifts.stores.Routine);
            migration = Ext.create('biglifts.migrations.AddOrderToAssistance');
            triumvirate = reloadStore(biglifts.stores.assistance.TriumvirateMovement);
            bodyweight = reloadStore(biglifts.stores.assistance.BodyweightMovement);
            bbb = reloadStore(biglifts.stores.assistance.BoringButBig);
            lifts = reloadStore(biglifts.stores.lifts.Lifts);
        }
    });

    test("should add order to triumvirate", function () {
        migration.run();
        routines.fireEvent('load');
        equal(triumvirate.getCount(), 8);

        lifts.each(function (l) {
            var property = l.get('propertyName');
            triumvirate.filter('liftProperty', property);
            equal(triumvirate.first().get('order'), 0);
            equal(triumvirate.last().get('order'), 1);
        });
    });

    test("should add order to bodyweight", function () {
        equal(bodyweight.getCount(), 8);
        migration.run();
        routines.fireEvent('load');

        lifts.each(function (l) {
            var property = l.get('propertyName');
            bodyweight.filter('liftProperty', property);
            equal(bodyweight.first().get('order'), 0);
            equal(bodyweight.last().get('order'), 1);
        });
    });

    test("should add order to bbb", function () {
        migration.run();
        routines.fireEvent('load');
        equal(bbb.getCount(), 4);

        lifts.each(function (l) {
            bbb.filter('lift_id', l.get('id'));
            equal(bbb.first().get('order'), 0);
        });
    });
})();