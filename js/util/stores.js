"use strict";
Ext.ns('util');

util.withLoadedStore = function (store, callback) {
    if (store.isLoaded()) {
        callback();
    }
    else {
        store.addListener('load', callback);
    }
};