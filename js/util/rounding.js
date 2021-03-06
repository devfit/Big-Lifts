"use strict";
Ext.ns('util.rounding');

util.rounding.roundTo1 = function (unroundedNumber, roundingType) {
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
};

util.rounding.roundTo5 = function (unroundedNumber, roundingType) {
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
};

util.rounding.roundTo2p5 = function (unroundedNumber, roundingType) {
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
};

util.rounding.roundToClosest5 = function (unroundedNumber, roundingType) {
    var roundedTo5 = util.rounding.roundTo5(unroundedNumber, roundingType);
    if (roundedTo5 % 10 === 0) {
        var up = roundedTo5 + 1;
        var down = roundedTo5 - 1;
        var up5 = util.rounding.roundTo5(up, 'up');
        var down5 = util.rounding.roundTo5(down, 'down');

        var upDistance = up5 - unroundedNumber;
        var downDistance = unroundedNumber - down5;

        if (upDistance <= downDistance) {
            return up5;
        }
        else {
            return down5;
        }
    }
    else {
        return roundedTo5;
    }
};

util.rounding.roundTo0p5 = function (unroundedNumber, roundingType) {
    var numberTimes10 = unroundedNumber * 10;
    return util.rounding.roundTo5(numberTimes10, roundingType) / 10.0;
};

util.rounding.roundTo0p25 = function (unroundedNumber, roundingType) {
    var numberTimes10 = unroundedNumber * 10;
    return util.rounding.roundTo2p5(numberTimes10, roundingType) / 10.0;
};

util.rounding.roundTo0p1 = function (unroundedNumber, roundingType) {
    var numberTimes10 = unroundedNumber * 10;
    return util.rounding.roundTo1(numberTimes10, roundingType) / 10.0;
};

util.roundNumber = function (unroundedNumber, roundingValue, roundingType) {
    var roundingMethods = {
        '0.25':util.rounding.roundTo0p25,
        '0.5':util.rounding.roundTo0p5,
        '1':util.rounding.roundTo1,
        '2.5':util.rounding.roundTo2p5,
        '5':util.rounding.roundTo5,
        'closest5':util.rounding.roundToClosest5
    };
    return roundingMethods[roundingValue].call(this, unroundedNumber, roundingType);
};
