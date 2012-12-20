Ext.ns("util.powerliftingTotal");
(function () {
    util.powerliftingTotal = {
        getTotal: function (callback) {
            util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
                util.withLoadedStore(biglifts.stores.LiftLog, function () {
                    var lifts = biglifts.stores.lifts.Lifts;
                    var maxes = {
                        'Bench': lifts.findRecord('name', 'Bench').get('max'),
                        'Squat': lifts.findRecord('name', 'Squat').get('max'),
                        'Deadlift': lifts.findRecord('name', 'Deadlift').get('max')
                    };

//                    var logMaxes = getMaxesFromLog();
                    var total = 0;
                    _.each(maxes, function (w) {
                        total += w;
                    });

                    callback(total);
                });
            });
        },
        getMaxesFromLog: function () {
            return {};
        },

        overrideMaxes: function (baseMaxes, newMaxes) {
            var combinedMaxes = {};
            _.each(baseMaxes, function (v, k) {
                combinedMaxes[k] = newMaxes[k] ? _.max(newMaxes[k], v) : v;
            });

            return combinedMaxes;
        }
    };
})();
