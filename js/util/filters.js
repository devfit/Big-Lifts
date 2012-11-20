"use strict";
Ext.ns('util');
util.withNoFilters = function (store, callback) {
    var filters = store.getFilters();
    if (filters.length > 0) {
        store.clearFilter(true);
        store.filter(filters);
    }
    else {
        callback.call();
    }
};