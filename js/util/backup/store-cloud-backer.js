Ext.ns('util.cloudbackup');

util.cloudbackup.cloudData = {};

util.cloudbackup.watchedStores = [];
util.cloudbackup.storesToSync = [];

util.cloudbackup.dataRetrieved = false;
util.cloudbackup.syncing = false;

util.cloudbackup.watchStoreSync = function (store) {
    util.cloudbackup.watchedStores.push(store);
    store.addListener('beforesync', util.cloudbackup.storeHasChanged);
    store.addListener('remove', util.cloudbackup.storeHasChanged);
};

util.cloudbackup.retrieveCloudDataTask = function (store, callback) {
    var className = util.proxy.getProxyNameFromStore(store);
    parse.getRecordsForUser(util.cloudbackup.getUserIdByDeviceId(), className, function (errors, recordName, data) {
        util.cloudbackup.cloudData[recordName] = data;
        callback(null);
    });
};

util.cloudbackup.retrieveCloudData = function () {
    util.cloudbackup.syncing = true;

    var retrieveCloudDataTasks = _.map(util.cloudbackup.watchedStores, function (store) {
        return function (callback) {
            util.cloudbackup.retrieveCloudDataTask(store, callback);
        };
    });

    async.series(retrieveCloudDataTasks, function () {
        util.cloudbackup.storesToSync = _.clone(util.cloudbackup.watchedStores);
        util.cloudbackup.syncing = true;
        util.cloudbackup.syncStoresToCloud();
    });
};

util.cloudbackup.storeHasChanged = function (store) {
    if (!_.include(util.cloudbackup.storesToSync, store)) {
        util.cloudbackup.storesToSync.push(store);
    }

    if (!util.cloudbackup.syncing && navigator.onLine && util.cloudbackup.dataRetrieved) {
        util.cloudbackup.syncing = true;
        setTimeout(util.cloudbackup.syncStoresToCloud, util.filebackup.SYNC_MS);
    }
};

util.cloudbackup.syncStoresToCloud = function (callback) {
    var syncStoreTasks = _.map(util.cloudbackup.storesToSync, function (store) {
        return function (callback) {
            util.cloudbackup.saveStore(store, callback);
        }
    });

    async.series(syncStoreTasks, function () {
        util.cloudbackup.syncing = false;
        util.cloudbackup.storesToSync = [];
        util.cloudbackup.dataRetrieved = true;
    });
};

util.cloudbackup.saveStore = function (store, entireStoreSavedCallback) {
    var recordName = util.proxy.getProxyNameFromStore(store);
    var existingData = util.cloudbackup.cloudData[recordName];
    var cloudDataById = {};
    _.each(existingData, function (r) {
        cloudDataById[r.id] = r;
    });

    var newRecordIds = util.cloudbackup.getNewRecordIds(existingData, store);

    var existingRecordIds = util.cloudbackup.getExistingRecordIds(existingData, store);
    var existingIdsToUpdate = util.cloudbackup.findChangedRecords(existingData, store, existingRecordIds);

    var deletedIds = util.cloudbackup.findDeletedRecords(existingData, store);

    var createRecordTasks = _.map(newRecordIds, function (id) {
        return function (callback) {
            var model = store.findRecord('id', id);
            parse.saveRecordForUser(util.cloudbackup.getUserIdByDeviceId(), recordName, model.data, callback);
        };
    });

    var updateRecordTasks = _.map(existingIdsToUpdate, function (id) {
        return function (callback) {
            var model = store.findRecord('id', id);
            parse.updateRecordForUser(util.cloudbackup.getUserIdByDeviceId(), recordName, cloudDataById[id].objectId, model.data, callback);
        }
    });

    var deleteRecordTasks = _.map(deletedIds, function (id) {
        return function (callback) {
            parse.deleteRecordForUser(util.cloudbackup.getUserIdByDeviceId(), recordName, cloudDataById[id].objectId, callback);
        }
    });

    var retrieveCloudData = function (callback) {
        util.cloudbackup.retrieveCloudDataTask(store, callback);
    };

    var crudTasks = _.union(createRecordTasks, updateRecordTasks, deleteRecordTasks);
    async.series(_.union(crudTasks, [retrieveCloudData]), entireStoreSavedCallback);
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

util.cloudbackup.findDeletedRecords = function (existingData, store) {
    var cloudIds = _.map(existingData, function (data) {
        return data.id;
    });
    var currentIds = _.map(store.getRange(), function (model) {
        return model.data.id;
    });

    return _.difference(cloudIds, currentIds);
};

util.cloudbackup.getUserIdByDeviceId = function () {
    if (!_.isUndefined(device)) {
        return device.uuid;
    }
};

util.cloudbackup.findChangedRecords = function (existingData, store, existingRecordIds) {
    var existingRecordsById = {};
    _.each(existingData, function (data) {
        existingRecordsById[data.id] = data;
    });

    return _.filter(existingRecordIds, function (existingId) {
        var cloudRecord = existingRecordsById[existingId];
        var currentRecord = store.findRecord('id', existingId).data;

        var fieldsToCompare = util.cloudbackup.getFieldsFromStore(store);
        var recordsAreEqual = util.cloudbackup.isEqual(fieldsToCompare, cloudRecord, currentRecord);

        return !recordsAreEqual;
    });
};

util.cloudbackup.isEqual = function (fields, record1, record2) {
    var nonMatchingRecord = _.find(fields, function (field) {
        if (record1[field] !== record2[field]) {
            return true;
        }
    });

    return _.isUndefined(nonMatchingRecord);
};

util.cloudbackup.getFieldsFromStore = function (store) {
    return _.pluck(store.getModel().getFields().all, '_name');
};