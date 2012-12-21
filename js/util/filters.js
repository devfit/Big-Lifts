"use strict";
Ext.ns('util');
util.withNoFilters = function (store, callback) {
    var storeFilters = store.getFilters();
    if (storeFilters.length === 0) {
        callback(store);
        store.clearFilter();
    }
    else {
        var filters = _.clone(storeFilters);
        store.clearFilter(true);
        callback(store);
        //ignoring the event here throws exceptions
        store.clearFilter();
        _.each(filters, function (f) {
            store.filter(f);
        });
    }
};