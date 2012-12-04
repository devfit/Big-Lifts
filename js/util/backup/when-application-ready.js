Ext.ns('util');
util.applicationReadyCallbacks = [];
util.applicationReady = false;
util.whenApplicationReady = function (callback) {
    if (util.applicationReady) {
        callback();
    }
    else {
        util.applicationReadyCallbacks.push(callback);
    }
};

util.fireApplicationReady = function () {
    util.applicationReady = true;
    _.each(util.applicationReadyCallbacks, function (callback) {
        callback();
    });
};