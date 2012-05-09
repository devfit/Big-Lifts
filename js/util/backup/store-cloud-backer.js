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
    var existingData = util.cloudbackup.cloudData[className];
    var cloudDataById = {};
    _.each(existingData,function(r){
       cloudDataById[r.id] = r;
    });


    var newRecordIds = util.cloudbackup.getNewRecordIds(existingData, store);
    var existingRecordIds = util.cloudbackup.getExistingRecordIds(existingData, store);

    var recordsToUpdate = util.cloudbackup.findChangedRecords(existingData, store, existingRecordIds);

    var createRecordTasks = _.map(newRecordIds, function (id) {
        return function (callback) {
            var model = store.findRecord('id', id);
            parse.saveRecordForUser(util.cloudbackup.getUserIdByDeviceId(), className, model.data, callback);
        };
    });

    var updateRecordTasks = _.map(recordsToUpdate, function (id) {
        return function (callback) {
            var model = store.findRecord('id', id);
            parse.updateRecordForUser(util.cloudbackup.getUserIdByDeviceId(), className, cloudDataById[id].objectId, model.data, callback);
        }
    });

    async.series(_.union(createRecordTasks,updateRecordTasks), entireStoreSavedCallback);
};

util.cloudbackup.getNewRecordIds = function (existingCloudData, store) {
    var cloudIds = _.map(existingCloudData, function (data) {
        return data.id;
    });
    var currentIds = _.map(store.getRange(), function (model) {
        return model.data.id;
    });
    return _.difference(currentIds, cloudIds);
};

util.cloudbackup.getExistingRecordIds = function (existingCloudData, store) {
    var cloudIds = _.map(existingCloudData, function (data) {
        return data.id;
    });
    var currentIds = _.map(store.getRange(), function (model) {
        return model.data.id;
    });
    return _.intersection(currentIds, cloudIds);
};

util.cloudbackup.findChangedRecords = function (existingData, store, existingRecordIds) {
    var existingRecordsById = {};
    _.each(existingData, function (data) {
        existingRecordsById[data.id] = data;
    });

    return _.filter(existingRecordIds, function (existingId) {
        var cloudRecord = existingRecordsById[existingId];
        var currentRecord = store.findRecord('id', existingId).data;

        return !_.isEqual(cloudRecord, currentRecord);
    });
};

util.cloudbackup.getUserIdByDeviceId = function () {
    if (!_.isUndefined(device)) {
        return device.uuid;
    }
};

util.cloudbackup.getFieldsFromStore = function (store) {
    return _.pluck(store.getModel().getFields().all, '_name');
};

