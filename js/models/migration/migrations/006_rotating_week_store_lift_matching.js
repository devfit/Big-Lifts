Ext.define('biglifts.migrations.rotatingWeekStoreMatching', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            util.withLoadedStore(biglifts.stores.WeekRotation, function () {
                biglifts.stores.WeekRotation.fixWeekRotationToLifts();
            });
        });
    }
});