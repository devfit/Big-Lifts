"use strict";
Ext.ns('util');
util.withNoSorters = function (store, callback) {
    var sorters = _.clone(store.getSorters());
    if (_.isNull(sorters) || sorters.length === 0) {
        callback(store);
    }
    else {
        store.setSorters([]);
        callback(store);
        store.setSorters([]);
        store.setSorters(sorters);
        store.sort();
    }
};