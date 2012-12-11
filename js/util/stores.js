"use strict";
Ext.ns('util');

util.withLoadedStore = function (store, callback) {
    util.useOrBindStore(biglifts.stores.Migrations, function () {
        util.useOrBindStore(store, callback);
    });
};

util.useOrBindStore = function (store, callback) {
    if (store.isLoaded()) {
        callback();
    }
    else {
        store.addListener('load', callback);
    }
};