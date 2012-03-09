"use strict";
Ext.ns('util');
util.withNoFilters = function(store, callback){
//    var filters = store.filters.items;
//    store.clearFilter();
    callback.call();
//    store.filter(filters);
};