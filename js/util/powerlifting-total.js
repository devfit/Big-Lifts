Ext.ns("util.powerliftingTotal");
(function () {
    util.powerliftingTotal = {
        getTotal: function (callback) {
            util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
                util.withLoadedStore(biglifts.stores.LiftLog, function () {
                    if (util.powerliftingTotal.allLiftsPresent()) {
                        var knownMaxes = util.powerliftingTotal.getKnownMaxes();
                        var logMaxes = util.powerliftingTotal.getMaxesFromLog();
                        var maxes = util.powerliftingTotal.findMaxes(knownMaxes, logMaxes);
                        var total = 0;
                        _.each(maxes, function (w) {
                            total += w;
                        });

                        callback(total);
                    }
                    else {
                        callback(-1);
                    }
                });
            });
        },
        allLiftsPresent: function () {
            var allLiftsPresent = true;
            var lifts = biglifts.stores.lifts.Lifts;
            util.withNoFilters(lifts, function () {
                lifts.filter('enabled', true);
                var benchPresent = !!lifts.findRecord('name', 'Bench');
                var deadliftPresent = !!lifts.findRecord('name', 'Deadlift');
                var squatPresent = !!lifts.findRecord('name', 'Squat');
                if (!benchPresent || !deadliftPresent || !squatPresent) {
                    allLiftsPresent = false;
                }
                lifts.clearFilter();
            });

            return allLiftsPresent;
        },
        getKnownMaxes: function () {
            var lifts = biglifts.stores.lifts.Lifts;
            var benchRecord = lifts.findRecord('name', 'Bench');
            var squatRecord = lifts.findRecord('name', 'Squat');
            var deadliftRecord = lifts.findRecord('name', 'Deadlift');

            return {
                'Bench': benchRecord.get('max'),
                'Squat': squatRecord.get('max'),
                'Deadlift': deadliftRecord.get('max')
            };
        },
        getMaxesFromLog: function () {
            var lifts = ['Bench', 'Squat', 'Deadlift'];
            var maxes = {};
            util.withNoFilters(biglifts.stores.LiftLog, function () {
                _.each(lifts, function (lift) {
                    maxes[lift] = 0;
                });

                biglifts.stores.LiftLog.each(function (log) {
                    var liftName = log.get('liftName');
                    var logEstimate = util.formulas.estimateOneRepMax(log.get('weight'), log.get('reps'));
                    maxes[liftName] = Math.max(logEstimate, maxes[liftName]);
                });
            });

            return maxes;
        },
        findMaxes: function (knownMaxes, logMaxes) {
            var combinedMaxes = {};
            _.each(knownMaxes, function (v, k) {
                combinedMaxes[k] = logMaxes[k] ? Math.max(logMaxes[k], v) : v;
            });

            return combinedMaxes;
        }
    };
})();
