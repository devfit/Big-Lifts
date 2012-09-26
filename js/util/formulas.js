"use strict";
Ext.ns('util.formulas', 'util.formulas.plates');

util.formulas.estimateOneRepMax = function (weight, reps) {
    var estimate = weight * (1 + reps * 0.033);
    return util.roundNumber(estimate, '0.5', 'normal');
};

util.formulas.lbsToKg = function (lbs) {
    return util.rounding.roundTo0p1(lbs / 2.2, 'down');
};

util.formulas.buildPlateListForWeight = function (targetWeight, barWeight, availablePlatePairs) {
    if (targetWeight < barWeight) {
        return []
    }

    var availablePlatePairsCopy = util.formulas.plates.pruneZeroedValues(_.clone(availablePlatePairs));

    var usingCustomPlates = !_.isUndefined(availablePlatePairsCopy);

    if (!usingCustomPlates) {
        availablePlatePairsCopy = {45:1, 35:1, 25:1, 10:1, 5:1, 2.5:1};
    }

    targetWeight -= barWeight;
    var plates = [];
    while (targetWeight > 0) {
        var remainingPlateWeights = _.map(_.keys(availablePlatePairsCopy), function (w) {
            return parseFloat(w);
        });

        remainingPlateWeights.sort(function (a, b) {
            return b - a;
        });

        var plate = _.find(remainingPlateWeights, function (p) {
            return 2 * p <= targetWeight;
        });

        //if no plates were found, then we can't get closer to the target weight.
        if (_.isUndefined(plate)) {
            break;
        }

        if (usingCustomPlates) {
            availablePlatePairsCopy[plate] = availablePlatePairsCopy[plate] - 1;
            if (availablePlatePairsCopy[plate] === 0) {
                delete availablePlatePairsCopy[plate];
            }
        }

        plates.push(plate);
        targetWeight -= 2 * plate;
    }

    return plates;
};


util.formulas.plates.pruneZeroedValues = function (object) {
    for (var i in object) {
        if (_.has(object, i) && object[i] === 0) {
            delete object[i];
        }
    }
    return object;
};

util.formulas.calculateRepsToBeatWeight = function (target, currentWeight) {
    var reps = Math.ceil(((target + 1) / currentWeight - 1) / 0.033);
    if (reps <= 0) {
        reps = 1;
    }
    return reps;
};