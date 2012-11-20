"use strict";
Ext.ns('util');
util.withNoFilters = function (store, callback) {
    if (!store.filters) {
        callback.call();
    }
    else {
        var filters = store.filters.clone();
        store.clearFilter(true);
        callback.call();
        store.filter(filters);
    }
};