Ext.define('biglifts.migrations.AddOrderToAssistance', {
    addOrderToBbb: function () {
        var bbb = biglifts.stores.assistance.BoringButBig;
        var lifts = biglifts.stores.lifts.Lifts;
        util.withLoadedStore(lifts, function () {
            lifts.each(function (l) {
                util.withNoFilters(bbb, function () {
                    bbb.filter('lift_id', l.get('id'));
                    var i = 0;
                    bbb.each(function (t) {
                        t.set('order', i++);
                    });
                    bbb.clearFilter();
                });
            });
        });
    },
    run: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            var triumvirate = biglifts.stores.assistance.TriumvirateMovement;
            var bodyweight = biglifts.stores.assistance.BodyweightMovement;
            var lifts = biglifts.stores.lifts.Lifts;

            _.each([triumvirate, bodyweight], function (assistance) {
                util.withLoadedStore(assistance, function () {
                    util.withLoadedStore(lifts, function () {
                        lifts.each(function (l) {
                            util.withNoFilters(assistance, function () {
                                assistance.filter('liftProperty', l.get('propertyName'));
                                var i = 0;
                                assistance.each(function (t) {
                                    t.set('order', i++);
                                });
                                assistance.clearFilter();
                            });
                        });
                    });
                });
            });

            me.addOrderToBbb();
        });
    }
});