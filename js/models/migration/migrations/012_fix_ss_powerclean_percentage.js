Ext.define('biglifts.migrations.FixPowerCleanPercentage', {
    run:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.withLoadedStore(biglifts.stores.ss.WorkoutStore, function () {
                    util.withNoFilters(biglifts.stores.ss.WorkoutStore, function () {
                        var p = me.getWorkSetPowerClean();
                        p.set('percentage', 100);
                        p.save();
                    });

                    biglifts.stores.ss.WorkoutStore.sync();
                });
            }
        });
    },
    getWorkSetPowerClean:function () {
        var lift_id = biglifts.stores.ss.Lifts.findRecord('name', 'Power Clean').get('id');
        var index = biglifts.stores.ss.WorkoutStore.findBy(function (w) {
            return w.get('lift_id') === lift_id && w.get('order') === 4;
        });
        return biglifts.stores.ss.WorkoutStore.getAt(index);
    }
});