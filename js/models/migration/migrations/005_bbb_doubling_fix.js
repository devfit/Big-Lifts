Ext.define('biglifts.migrations.fixBbbDoubling', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            util.withLoadedStore(biglifts.stores.assistance.BoringButBig, function () {
                var bbb = biglifts.stores.assistance.BoringButBig;
                var liftCountGroups = {};
                bbb.each(function (b) {
                    var movementId = b.get('movement_lift_id');
                    liftCountGroups[movementId] = _.has(liftCountGroups, movementId) ? liftCountGroups[movementId] + 1 : 1;
                });

                _.each(liftCountGroups, function (count, key) {
                    if( count > 1 ){
                        bbb.remove(bbb.findRecord('movement_lift_id', key));
                    }
                });

                bbb.sync();
            });
        });
    }
});