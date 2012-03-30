"use strict";
Ext.ns('util.formulas');

util.formulas.estimateOneRepMax = function (weight, reps) {
    var estimate = weight * (1 + reps * 0.033);
    return util.roundNumber(estimate, '0.5', 'normal');
};

util.formulas.lbsToKg = function (lbs) {
    return util.rounding.roundTo0p1(lbs / 2.2, 'down');
};

util.formulas.buildPlateListForWeight = function (targetWeight, barWeight, availablePlatePairs) {

    if (typeof(availablePlatePairs) === 'undefined') {
        var uniqueAvailablePlatesSet = [45, 35, 25, 15, 10, 5, 2.5, 1];

        if (targetWeight < barWeight) {
            return []
        }

        targetWeight -= barWeight;
        var plates = [];
        while (targetWeight > 0) {
            var plate = _.find(uniqueAvailablePlatesSet, function (p) {
                return 2 * p <= targetWeight;
            });

            plates.push(plate);
            targetWeight -= 2 * plate;
        }

        return plates;
    }
    else {
        uniqueAvailablePlatesSet = _.uniq(availablePlatePairs);

        if (targetWeight < barWeight) {
            return []
        }

        targetWeight -= barWeight;
        plates = [];
        while (targetWeight > 0) {
            var plate = _.find(uniqueAvailablePlatesSet, function (p, index) {
                return 2 * p <= targetWeight;
            });

            var plateIndex = _.indexOf(availablePlatePairs, plate);
            availablePlatePairs.splice(plateIndex, 1);
            uniqueAvailablePlatesSet = _.uniq(availablePlatePairs);

            plates.push(plate);
            targetWeight -= 2 * plate;
        }

        return plates;
    }
};
