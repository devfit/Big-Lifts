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
    util.cloudbackup.cloudRetrieveFinished = _.after(util.cloudbackup.watchedStores.length, function () {
        util.cloudbackup.syncing = false;
        util.cloudbackup.watchedStores = [];
    });

    _.each(util.cloudbackup.watchedStores, function (store) {
        var className = util.proxy.getProxyNameFromStore(store);
        parse.getRecordsForUser(util.cloudbackup.getUserIdByDeviceId(), className, util.cloudbackup.cloudDataRetrieved);
    });
};

util.cloudbackup.cloudRetrieveFinished = null;
util.cloudbackup.cloudDataRetrieved = function (recordName, data) {
    util.cloudbackup.cloudData[recordName] = data;
    util.cloudbackup.cloudRetrieveFinished();
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
    var cloudWriteFinish = _.after(util.cloudbackup.storesToSync.length, function () {
        util.cloudbackup.syncing = false;
        util.cloudbackup.storesToSync = [];
    });

    _.each(util.cloudbackup.storesToSync, function (store) {
        util.cloudbackup.saveStore(store, cloudWriteFinish);
    });
};

util.cloudbackup.saveStore = function (store, callback) {
    console.log(store.getRange());
};

util.cloudbackup.getUserIdByDeviceId = function () {
    if (!_.isUndefined(device)) {
        return device.uuid;
    }
};

