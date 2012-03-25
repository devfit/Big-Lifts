"use strict";
Ext.ns('util.formulas');

util.formulas.estimateOneRepMax = function (weight, reps) {
    var estimate = weight * (1 + reps * 0.033);
    return util.roundNumber(estimate, '0.5', 'normal');
};

util.formulas.buildPlateListForWeight = function (weight) {
    var availablePlates = [45, 35, 25, 15, 10, 5, 2.5, 1];
    var barWeight = 45;

    if (weight < barWeight) {
        return []
    }

    weight -= barWeight;
    var plates = [];
    while (weight > 0) {
        var plate = _.find(availablePlates, function (p) {
            return 2 * p <= weight;
        });

        plates.push(plate);
        weight -= 2 * plate;
    }

    return plates;
};

util.formulas.lbsToKg = function (lbs) {
    return util.rounding.roundTo0p1(lbs / 2.2, 'down');
};