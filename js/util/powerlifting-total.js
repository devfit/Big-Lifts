Ext.ns("util.powerliftingTotal");
(function () {
    util.powerliftingTotal = {
        getTotal: function (callback) {
            util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
                util.withLoadedStore(biglifts.stores.LiftLog, function () {
                    var lifts = biglifts.stores.lifts.Lifts;
                    var knownMaxes = {
                        'Bench': lifts.findRecord('name', 'Bench').get('max'),
                        'Squat': lifts.findRecord('name', 'Squat').get('max'),
                        'Deadlift': lifts.findRecord('name', 'Deadlift').get('max')
                    };

                    var logMaxes = util.powerliftingTotal.getMaxesFromLog();
                    var maxes = util.powerliftingTotal.findMaxes(knownMaxes, logMaxes);
                    var total = 0;
                    _.each(maxes, function (w) {
                        total += w;
                    });

                    callback(total);
                });
            });
        },
        getMaxesFromLog: function () {
            var lifts = ['Bench', 'Squat', 'Deadlift'];
            var maxes = {};
            util.withNoFilters(biglifts.stores.LiftLog, function () {
                _.each(lifts, function (lift) {
                    maxes[lift] = 0;
                    biglifts.stores.LiftLog.clearFilter(true);
                    biglifts.stores.LiftLog.filter('liftName', lift);
                    biglifts.stores.LiftLog.each(function (log) {
                        maxes[lift] = _.max([util.formulas.estimateOneRepMax(log.get('weight'), log.get('reps')), maxes[lift]]);
                    });
                });
            });

            return maxes;
        },
        findMaxes: function (knownMaxes, logMaxes) {
            var combinedMaxes = {};
            _.each(knownMaxes, function (v, k) {
                combinedMaxes[k] = logMaxes[k] ? _.max([logMaxes[k], v]) : v;
            });

            return combinedMaxes;
        }
    };
})();
