Ext.define('biglifts.migrations.FixSsPressPercentage', {
    run:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.withLoadedStore(biglifts.stores.ss.WorkoutStore, function () {
                });
            }
        });
    },
    getTemplateName:function () {
        var workouts = biglifts.stores.ss.WorkoutStore;
        var lift_ids = {};
        util.withNoFilters(workouts, function () {
            workouts.each(function (w) {
                var lift_id = w.get('lift_id');
                if (!_.has(lift_ids, lift_id)) {
                    lift_ids[lift_id] = true;
                }
            });
        });

        return _.keys(lift_ids).length == 5 ? "standard" : "novice";
    }
});