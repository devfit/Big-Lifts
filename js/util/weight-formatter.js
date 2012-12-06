Ext.ns("biglifts.weight");

biglifts.weight.format = function (max, percentage) {
    percentage = _.isUndefined(percentage) ? 100 : percentage;
    var settings = biglifts.stores.w.Settings.first();
    return util.roundNumber(max * percentage / 100.0, settings.get('roundingValue'), settings.get('roundingType'));
};

biglifts.weight.lowerMaxToTrainingMax = function(max){
    var settings = biglifts.stores.w.Settings.first();
    var trainingMaxPercentage = settings.get('trainingMaxPercentage') / 100.0;
    var trainingMaxModifier = settings.get('useTrainingMax') == 1 ? trainingMaxPercentage : 1.0;

    return max * trainingMaxModifier;
};