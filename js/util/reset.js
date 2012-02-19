"use strict";
Ext.ns('util.data');
util.data.hardReset = function () {
    util.filebackup.deleteAllStoreFiles();
    setTimeout(function () {
        localStorage.clear();
        window.location.reload();
    }, 500);
};