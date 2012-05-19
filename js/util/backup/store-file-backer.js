Ext.ns('util.filebackup');

util.filebackup.SYNC_MS = 250;

util.filebackup.directory = 'wendler531';
util.filebackup.saveStore = function (store, callback) {
    var data = util.filebackup.generateDataFromStore(store);
    if (data !== null) {
        console.log ( data );
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

util.filebackup.loadStore = function (store, callback) {
    util.withNoFilters(store, function () {
        util.files.read(util.filebackup.directory, util.filebackup.generateFileName(store), function (fileDataAsString) {
            var fileStoreData = null;
            try {
                fileStoreData = JSON.parse(fileDataAsString);
            }
            catch (e) {
                console.log( e );
                if( callback ){
                    callback(null, false);
                }
                return;
            }

            if (fileStoreData.length > 0) {
                store.addListener('load', function () {
                    var existingStoreAsString = Ext.encode(Ext.pluck(store.data.items, 'data'));
                    if (fileDataAsString != existingStoreAsString) {
                        store.removeAll();
                        for (var i = 0; i < fileStoreData.length; i++) {
                            store.add(fileStoreData[i]);
                        }
                        store.sync();
                    }
                    callback(null, true);
                });
            }
            else {
                callback(null, true);
            }
        }, function (error) {
            store.addListener('load', function () {
                if (_.has(error, 'code') && error.code === FileError.NOT_FOUND_ERR) {
                    util.filebackup.storeHasChanged(store);
                }

                callback(null, false);
            });
        });
    });
};

util.filebackup.generateFileName = function (store) {
    return util.proxy.getProxyNameFromStore(store) + ".json";
};

util.filebackup.watchStoreSync = function (store) {
    util.filebackup.watchedStores.push(store);
    store.addListener('beforesync', util.filebackup.storeHasChanged);
    store.addListener('remove', util.filebackup.storeHasChanged);
    util.filebackup.loadStore(store);
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
    console.log( "Syncing" );
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