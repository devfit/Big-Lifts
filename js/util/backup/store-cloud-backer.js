Ext.ns('util.cloudbackup');

util.cloudbackup.cloudData = {};

util.cloudbackup.watchedStores = [];
util.cloudbackup.storesToSync = [];

util.cloudbackup.syncing = false;

util.cloudbackup.watchStoreSync = function (store) {
    util.cloudbackup.watchedStores.push(store);
    store.addListener('beforesync', util.cloudbackup.storeHasChanged);
    store.addListener('remove', util.cloudbackup.storeHasChanged);
};

util.cloudbackup.retrieveCloudData = function () {
    util.cloudbackup.syncing = true;

    var retrieveCloudDataTasks = _.map(util.cloudbackup.watchedStores, function (store) {
        return function (callback) {
            var className = util.proxy.getProxyNameFromStore(store);
            parse.getRecordsForUser(util.cloudbackup.getUserIdByDeviceId(), className, function (errors, recordName, data) {
                util.cloudbackup.cloudData[recordName] = data;
                callback(null);
            });
        };
    });

    async.series(retrieveCloudDataTasks, function () {
        util.cloudbackup.syncing = false;
        util.cloudbackup.watchedStores = [];
    });
};

util.cloudbackup.storeHasChanged = function (store) {
    if (!_.include(util.cloudbackup.storesToSync, store)) {
        util.cloudbackup.storesToSync.push(store);

        if (!util.cloudbackup.syncing) {
            util.cloudbackup.syncing = true;
            setTimeout(util.cloudbackup.syncStoreStoresToCloud, util.filebackup.SYNC_MS);
        }
    }
};

util.cloudbackup.syncStoreStoresToCloud = function () {
    var syncStoreTasks = _.map(util.cloudbackup.storesToSync, function (store) {
        return function (callback) {
            util.cloudbackup.saveStore(store, callback);
        }
    });

    async.series(syncStoreTasks, function () {
        util.cloudbackup.syncing = false;
        util.cloudbackup.storesToSync = [];
    });
};

util.cloudbackup.saveStore = function (store, entireStoreSavedCallback) {
    var className = util.proxy.getProxyNameFromStore(store);
    var saveRecordTasks = _.map(store.getRange(), function(model){
       return function(callback){
           parse.saveRecordForUser(util.cloudbackup.getUserIdByDeviceId(), className, model.data, callback);
       };
    });

    async.series(saveRecordTasks, entireStoreSavedCallback);
};

util.cloudbackup.getUserIdByDeviceId = function () {
    if (!_.isUndefined(device)) {
        return device.uuid;
    }
};

