Ext.define('biglifts.migrations.RecreateStartingStrength', {
    run:function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                console.log("recreating");
                biglifts.stores.ss.WorkoutStore.removeAll();
                biglifts.stores.ss.WorkoutStore.sync();

                biglifts.stores.ss.WorkoutStore.addWarmup();
                biglifts.stores.ss.WorkoutStore.addWorkSets();
            }
        });
    }
});