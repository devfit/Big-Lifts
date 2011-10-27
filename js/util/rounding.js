"use strict";
Ext.ns('util', 'util.rounding');

util.rounding.roundTo1 = function(unroundedNumber, roundingType) {
    var roundedNumber;
    if (roundingType == 'normal') {
        roundedNumber = Math.round(unroundedNumber);
    }
    else if (roundingType == 'up') {
        roundedNumber = Math.ceil(unroundedNumber);
    }
    else if (roundingType == 'down') {
        roundedNumber = Math.floor(unroundedNumber);
    }

    return roundedNumber;
}

util.rounding.roundTo5 = function(unroundedNumber, roundingType) {
    var numberMod5 = unroundedNumber % 5;
    var base5Round = parseInt(unroundedNumber / 5) * 5;

    var roundedNumber;
    if (roundingType == 'normal') {
        roundedNumber = numberMod5 >= 2.5 ? base5Round + 5 : base5Round;
    }
    else if (roundingType == 'up') {
        roundedNumber = base5Round + 5;
    }
    else if (roundingType == 'down') {
        roundedNumber = base5Round
    }

    return roundedNumber;
}
util.rounding.roundTo2p5 = function(unroundedNumber, roundingType) {
    var roundedNumber;

    var numberMod5 = unroundedNumber % 5;
    var base5Round = parseInt(unroundedNumber / 5) * 5;
    if (roundingType == 'normal') {
        if (numberMod5 <= 1.25) {
            roundedNumber = base5Round;
        }
        else if (numberMod5 <= 3.75) {
            roundedNumber = base5Round + 2.5;
        }
        else {
            roundedNumber = base5Round + 5;
        }
    }
    else if (roundingType == 'up') {
        if (numberMod5 == 0) {
            roundedNumber = unroundedNumber;
        }
        else if (numberMod5 <= 2.5) {
            roundedNumber = base5Round + 2.5;
        }
        else if (numberMod5 <= 5) {
            roundedNumber = base5Round + 5;
        }
    }
    else if (roundingType == 'down') {
        if (numberMod5 == 0) {
            roundedNumber = base5Round;
        }
        else if (numberMod5 <= 2.5) {
            roundedNumber = base5Round;
        }
        else if (numberMod5 <= 5) {
            roundedNumber = base5Round + 2.5;
        }
    }

    return roundedNumber;
}
util.roundNumber = function(unroundedNumber, roundingValue, roundingType) {
    var roundedNumber;
    if (roundingValue === '1') {
        roundedNumber = util.rounding.roundTo1(unroundedNumber, roundingType);
    }
    else if (roundingValue == '2.5') {
        roundedNumber = util.rounding.roundTo2p5(unroundedNumber, roundingType);
    }
    else if (roundingValue == '5') {
        roundedNumber = util.rounding.roundTo5(unroundedNumber, roundingType);
    }

    return roundedNumber;
};
