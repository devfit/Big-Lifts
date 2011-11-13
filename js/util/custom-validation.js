"use strict";
if (Ext.data) {
    Ext.data.validations.custom = function (config, value) {
        if (config && Ext.isFunction(config.fn)) {
            return config.fn(value);
        } else {
            return false;
        }
    };
    Ext.data.validations.customMessage = "Error";
}