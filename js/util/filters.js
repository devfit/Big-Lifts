"use strict";
Ext.ns('util');
util.withNoFilters = function (store, callback) {
    var filters = store.getFilters();
    store.clearFilter(true);
    callback.call();
    store.filter(filters);
};