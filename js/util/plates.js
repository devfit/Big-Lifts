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

    if (totalWeight !== weight) {
        plateString = "<span class='invalid-plates'>" + plateString + " need plates" + "</span>";
    }

    return plateString;
};