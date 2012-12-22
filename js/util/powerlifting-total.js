Ext.ns("util.powerliftingTotal");
(function () {
    util.powerliftingTotal = {
        getTotal: function (callback) {
            util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
                util.withLoadedStore(biglifts.stores.LiftLog, function () {
                    var lifts = biglifts.stores.lifts.Lifts;
                    var benchRecord = lifts.findRecord('name', 'Bench');
                    var squatRecord = lifts.findRecord('name', 'Squat');
                    var deadliftRecord = lifts.findRecord('name', 'Deadlift');

                    if (!benchRecord || !squatRecord || !deadliftRecord) {
                        callback(-1);
                        return;
                    }

                    var knownMaxes = {
                        'Bench': benchRecord.get('max'),
                        'Squat': squatRecord.get('max'),
                        'Deadlift': deadliftRecord.get('max')
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
                    biglifts.stores.LiftLog.filter('liftName', lift);
                    biglifts.stores.LiftLog.each(function (log) {
                        maxes[lift] = _.max([util.formulas.estimateOneRepMax(log.get('weight'), log.get('reps')), maxes[lift]]);
                    });
                    biglifts.stores.LiftLog.clearFilter();
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
