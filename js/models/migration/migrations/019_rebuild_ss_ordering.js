Ext.define('biglifts.migrations.RebuildSsWorkouts', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            util.withLoadedStore(biglifts.stores.ss.WorkoutStore, function () {
                biglifts.stores.ss.Lifts.removeAll();
                biglifts.stores.ss.Lifts.sync();
                Ext.create('biglifts.models.startingstrength.TemplateSwitcher').setupLifts('standard');

                biglifts.stores.ss.WorkoutStore.removeAll();
                biglifts.stores.ss.WorkoutStore.sync();
                biglifts.stores.ss.WorkoutStore.rebuildWorkouts();
            });
        });
    }
});