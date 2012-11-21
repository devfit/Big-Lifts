"use strict";
Ext.ns('util');
util.withNoFilters = function (store, callback) {
    var storeFilters = store.getFilters();
    if (storeFilters.length === 0) {
        callback.call();
    }
    else {
        var filters = _.clone(storeFilters);
        store.clearFilter(true);
        callback.call();
        store.filter(filters);
    }
};