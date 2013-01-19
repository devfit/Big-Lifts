Ext.ns("util.powerliftingTotal");
(function () {
    util.powerliftingTotal = {
        getTotal:function (callback) {
            util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
                util.withLoadedStore(biglifts.stores.LiftLog, function () {
                    util.withLoadedStore(biglifts.stores.PowerliftingTotalConfig, function () {
                        var knownMaxes = util.powerliftingTotal.getKnownMaxes();
                        var logMaxes = util.powerliftingTotal.getMaxesFromLog();
                        var maxes = util.powerliftingTotal.findMaxes(knownMaxes, logMaxes);
                        var total = 0;
                        _.each(maxes, function (w) {
                            total += w;
                        });

                        callback(total);
                    });
                });
            });
        },
        getKnownMaxes:function () {
            var maxes = {};
            biglifts.stores.PowerliftingTotalConfig.each(function (r) {
                var lift_id = r.get('lift_id');
                if (r.get('included')) {
                    var lift = biglifts.stores.lifts.Lifts.findRecord('id', lift_id);
                    if (lift) {
                        maxes[lift_id] = lift.get('max');
                    }
                }
            });

            return maxes;
        },
        getMaxesFromLog:function () {
            var maxes = {};
            util.withNoFilters(biglifts.stores.LiftLog, function () {
                biglifts.stores.PowerliftingTotalConfig.each(function (r) {
                    if (r.get('included')) {
                        maxes[r.get('lift_id')] = 0;
                    }
                });

                biglifts.stores.LiftLog.each(function (log) {
                    var liftName = log.get('liftName');
                    var lift = biglifts.stores.lifts.Lifts.findRecord('name', liftName);

                    if (lift && _.has(maxes, lift.get('id'))) {
                        var logEstimate = util.formulas.estimateOneRepMax(log.get('weight'), log.get('reps'));
                        maxes[lift.get('id')] = Math.max(logEstimate, maxes[lift.get('id')]);
                    }
                });
            });

            return maxes;
        },
        findMaxes:function (knownMaxes, logMaxes) {
            var combinedMaxes = {};
            _.each(knownMaxes, function (v, k) {
                combinedMaxes[k] = logMaxes[k] ? Math.max(logMaxes[k], v) : v;
            });

            return combinedMaxes;
        }
    };
})();
