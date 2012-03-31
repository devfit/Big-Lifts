Ext.ns('util.filebackup');

util.filebackup.SYNC_MS = 150;
util.filebackup.fileBackupEnabled = Ext.os.is.Linux || typeof(PhoneGap) !== 'undefined';

util.filebackup.directory = 'wendler531';
util.filebackup.saveStore = function (store) {
    var data = util.filebackup.generateDataFromStore(store);
    if (data !== null) {
        util.files.write(util.filebackup.directory, util.filebackup.generateFileName(store), data);
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
    if (wendler.main.deviceReady) {
        _.each(util.filebackup.watchedStores, util.filebackup.loadStore);
    }
    else {
        setTimeout(util.filebackup.loadAllStores, util.filebackup.SYNC_MS);
    }
};

util.filebackup.loadStore = function (store) {
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
        }, function (error) {
            if (error.code === FileError.NOT_FOUND_ERR) {
                util.filebackup.storeHasChanged(store);
            }
        });
    });
};

util.filebackup.generateFileName = function (store) {
    var proxyId = store.getProxy().getId();
    proxyId = proxyId.replace('-proxy', '');
    return proxyId + ".json";
};

util.filebackup.watchStoreSync = function (store) {
    if (util.filebackup.fileBackupEnabled) {
        util.filebackup.watchedStores.push(store);
        store.addListener('beforesync', util.filebackup.storeHasChanged);
        store.addListener('remove', util.filebackup.storeHasChanged);
    }
};

util.filebackup.waitingToSync = false;
util.filebackup.storeHasChanged = function (currentStore) {
    if (!_.include(util.filebackup.storesToSync, currentStore)) {
        util.filebackup.storesToSync.push(currentStore);

        if (!util.filebackup.waitingToSync) {
            util.filebackup.waitingToSync = true;
            setTimeout(util.filebackup.syncStoresToFile, util.filebackup.SYNC_MS);
        }
    }
};

util.filebackup.syncStoresToFile = function () {
    _.each(util.filebackup.storesToSync, function (store) {
        util.filebackup.saveStore(store);
    });
    util.filebackup.waitingToSync = false;
    util.filebackup.storesToSync = [];
};

util.filebackup.deleteAllStoreFiles = function () {
    _.each(util.filebackup.watchedStores, function (store) {
        util.files.deleteFile(util.filebackup.directory, util.filebackup.generateFileName(store));
    });
};