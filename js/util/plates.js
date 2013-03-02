Ext.ns('util.plates');
util.plates.getFormattedPlateList = function (weight, currentLiftProperty) {
    var barWeight = biglifts.stores.BarWeight.first().get('weight');
    var liftRecord = biglifts.stores.lifts.Lifts.findRecord('propertyName', currentLiftProperty);
    if (liftRecord.get("customBarWeight")) {
        barWeight = liftRecord.get("customBarWeight");
    }

    var allPlatePairs = biglifts.stores.Plates.getAllPlatePairs();

    var plates = util.formulas.buildPlateListForWeight(weight, barWeight, allPlatePairs);
    var totalWeight = _.reduce(plates, function (sum, plate) {
        return sum + plate * 2;
    }, 0) + barWeight;

    var plateString = plates.length === 0 ? "" : "[" + plates.join(',') + "]";

    if (util.rounding.roundTo0p5(totalWeight, 'down') !== weight && util.rounding.roundTo0p5(totalWeight, 'normal') !== weight) {
        plateString = "<span class='invalid-plates'>" + plateString + "</span>";
    }

    return plateString;
};