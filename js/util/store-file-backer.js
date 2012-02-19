Ext.ns('util.filebackup');

util.filebackup.fileBackupEnabled = Ext.is.Desktop || typeof(PhoneGap) !== 'undefined';

util.filebackup.directory = 'wendler531';
util.filebackup.saveStore = function (store) {
    var data = Ext.encode(Ext.pluck(store.data.items, 'data'));
    util.files.write(util.filebackup.directory, util.filebackup.generateFileName(store), data);
};

util.filebackup.storesToSync = [];
util.filebackup.watchedStores = [];
util.filebackup.loadAllStores = function () {
    if (wendler.main.deviceReady) {
        _.each(util.filebackup.watchedStores, util.filebackup.loadStore);
    }
    else {
        setTimeout(util.filebackup.loadAllStores, 250);
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
        });
    });
};

util.filebackup.generateFileName = function (store) {
    var proxyId = store.getProxy().id;
    proxyId = proxyId.replace('-proxy', '');
    return proxyId + ".json";
};

util.filebackup.watchStoreSync = function (store) {
    if (util.filebackup.fileBackupEnabled) {
        util.filebackup.watchedStores.push(store);
        store.addListener('update', util.filebackup.storeHasChanged);
        store.addListener('remove', util.filebackup.storeHasChanged);
    }
};

util.filebackup.waitingToSync = false;
util.filebackup.storeHasChanged = function (currentStore) {
    if (!_.include(util.filebackup.storesToSync, currentStore)) {
        util.filebackup.storesToSync.push(currentStore);

        if (!util.filebackup.waitingToSync) {
            util.filebackup.waitingToSync = true;
            setTimeout(util.filebackup.syncStoresToFile, 500);
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

