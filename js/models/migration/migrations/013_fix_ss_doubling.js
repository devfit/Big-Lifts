Ext.define('biglifts.migrations.FixSsDoubling', {
    run:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.withLoadedStore(biglifts.stores.ss.WorkoutStore, function () {
                    if (me.hasBadData()) {
                        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('standard');
                    }
                });
            }
        });
    },
    hasBadData:function () {
        var templateWorkoutCounts = this.getTemplateWorkoutCounts();
        var broken = null;
        util.withNoFilters(biglifts.stores.ss.WorkoutStore, function () {
            var count = biglifts.stores.ss.WorkoutStore.getCount();
            broken = !_.some(templateWorkoutCounts, function (c) {
                return count === c;
            });
        });
        return broken;
    },
    getTemplateWorkoutCounts:function () {
        return _.collect(['standard', 'novice'], function (template) {
            var defaults = biglifts.models.startingstrength.workouts[template];
            return _.reduce(_.values(defaults), function (memo, list) {
                return memo + list.length;
            }, 0);
        });
    }
});