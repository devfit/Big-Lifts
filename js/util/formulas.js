"use strict";
Ext.ns('util.formulas');

util.formulas.estimateOneRepMax = function(weight, reps){
    var estimate = weight * (1 + reps * 0.033);
    return util.roundNumber(estimate, '0.5', 'normal');
};