Ext.define('biglifts.migrations.UpdateSsDefaults', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            util.withLoadedStore(biglifts.stores.ss.WorkoutStore, function () {
                if (biglifts.stores.Routine.getCount() === 0) {
                    return;
                }

                var existingWorkSets = [];
                biglifts.stores.ss.WorkoutStore.each(function (w) {
                    existingWorkSets.push(w);
                });

                biglifts.stores.ss.WorkoutStore.addWarmup(function () {
                    _.each(existingWorkSets, function (w) {
                        util.withNoFilters(biglifts.stores.ss.WorkoutStore, function () {
                            biglifts.stores.ss.WorkoutStore.filter('name', w.get('name'));
                            biglifts.stores.ss.WorkoutStore.filter('lift_id', w.get('lift_id'));

                            w.set('order', biglifts.stores.ss.WorkoutStore.max('order') + 1);
                            w.set('warmup', false);
                            w.set('percentage', 100);

                            biglifts.stores.ss.WorkoutStore.clearFilter();
                        });
                    });

                    biglifts.stores.ss.WorkoutStore.sync();
                });
            });
        });
    }
});