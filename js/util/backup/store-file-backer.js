Ext.ns('util.filebackup');

util.filebackup.SYNC_MS = 100;
util.filebackup.fileBackupEnabled = Ext.os.is.Linux || typeof(PhoneGap) !== 'undefined';

util.filebackup.directory = 'wendler531';
util.filebackup.saveStore = function (store, callback) {
    var data = util.filebackup.generateDataFromStore(store);
    if (data !== null) {
        util.files.write(util.filebackup.directory, util.filebackup.generateFileName(store), data, callback);
    }
};

util.filebackup.generateDataFromStore = function (store) {
    if (typeof( store.data ) === 'undefined') {
        return null
    }

    return Ext.encode(Ext.pluck(store.data.items, 'data'));
};

util.filebackup.storesToSync = [];
util.filebackup.watchedStores = [];
util.filebackup.loadAllStores = function () {
    var loadStoreTasks = _.map(util.filebackup.watchedStores, function (store) {
        return function (callback) {
            util.filebackup.loadStore(store, callback);
        };
    });

    async.parallel(loadStoreTasks, function (errors, success) {
        wendler.maxes.controller.rebuildMaxesList();
    });
};

util.filebackup.loadStore = function (store, callback) {
    util.withNoFilters(store, function () {
        util.files.read(util.filebackup.directory, util.filebackup.generateFileName(store), function (fileDataAsString) {
            var fileStoreData = JSON.parse(fileDataAsString);
            if (fileStoreData.length > 0) {
                var existingStoreAsString = Ext.encode(Ext.pluck(store.data.items, 'data'));
                if (fileDataAsString != existingStoreAsString) {
                    store.removeAll();
                    for (var i = 0; i < fileStoreData.length; i++) {
                        store.add(fileStoreData[i]);
                    }
                    store.sync();
                }
            }

            callback(null, true);
        }, function (error) {
            if (error.code === FileError.NOT_FOUND_ERR) {
                util.filebackup.storeHasChanged(store);
            }

            callback(null, false);
        });
    });
};

util.filebackup.generateFileName = function (store) {
    return util.proxy.getProxyNameFromStore(store) + ".json";
};

util.filebackup.watchStoreSync = function (store) {
    if (util.filebackup.fileBackupEnabled) {
        util.filebackup.watchedStores.push(store);
        store.addListener('beforesync', util.filebackup.storeHasChanged);
        store.addListener('remove', util.filebackup.storeHasChanged);
    }
};

util.filebackup.syncing = false;
util.filebackup.storeHasChanged = function (currentStore) {
    if (!_.include(util.filebackup.storesToSync, currentStore)) {
        util.filebackup.storesToSync.push(currentStore);

        if (!util.filebackup.syncing) {
            util.filebackup.syncing = true;
            setTimeout(util.filebackup.syncStoresToFile, util.filebackup.SYNC_MS);
        }
    }
};

util.filebackup.syncStoresToFile = function () {
    var fileWriteFinish = _.after(util.filebackup.storesToSync.length, function () {
        util.filebackup.syncing = false;
        util.filebackup.storesToSync = [];
    });

    _.each(util.filebackup.storesToSync, function (store) {
        util.filebackup.saveStore(store, fileWriteFinish);
    });
};

util.filebackup.deleteAllStoreFiles = function () {
    _.each(util.filebackup.watchedStores, function (store) {
        util.files.deleteFile(util.filebackup.directory, util.filebackup.generateFileName(store));
    });
};