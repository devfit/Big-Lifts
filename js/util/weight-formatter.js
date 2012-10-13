Ext.ns("wendler.weight");

wendler.weight.format = function (max, percentage) {
    percentage = _.isUndefined(percentage) ? 100 : percentage;
    var settings = wendler.stores.Settings.first();
    return util.roundNumber(max * percentage / 100.0, settings.get('roundingValue'), settings.get('roundingType'));
};

wendler.weight.lowerMaxToTrainingMax = function(max){
    var settings = wendler.stores.Settings.first();
    var trainingMaxPercentage = settings.get('trainingMaxPercentage') / 100.0;
    var trainingMaxModifier = settings.get('useTrainingMax') == 1 ? trainingMaxPercentage : 1.0;

    return max * trainingMaxModifier;
};