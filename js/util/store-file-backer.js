Ext.ns('util.filebackup');
util.filebackup.saveStore = function (store) {
    var data = Ext.encode(Ext.pluck(store.data.items, 'data'));
    util.files.write(util.filebackup.generateFileName(store), data);
};

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
        util.files.read(util.filebackup.generateFileName(store), function (data) {
            var storeData = JSON.parse(data);
            if (storeData.length > 0) {
                store.removeAll();
                for (var i = 0; i < storeData.length; i++) {
                    store.add(storeData[i]);
                }
                store.sync();
            }
        });
    });
};

util.filebackup.generateFileName = function (store) {
    return store.getProxy().id + ".txt";
};

util.filebackup.storesToSync = [];
util.filebackup.watchedStores = [];
util.filebackup.watchStoreSync = function (store) {
    util.filebackup.watchedStores.push(store);
    store.addListener('update', util.filebackup.storeHasChanged);
    store.addListener('remove', util.filebackup.storeHasChanged);
};

util.filebackup.waitingToSync = false;
util.filebackup.storeHasChanged = function (currentStore) {
    if (!_.include(util.filebackup.storesToSync, currentStore)) {
        util.filebackup.storesToSync.push(currentStore);

        if (!util.filebackup.waitingToSync) {
            util.filebackup.waitingToSync = true;
            setTimeout(util.filebackup.syncStoresToFile, 1000);
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

