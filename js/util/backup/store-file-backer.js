Ext.ns('util.filebackup');

util.filebackup.SYNC_MS = 250;

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

util.filebackup.loadStore = function (store, callback) {
    util.withNoFilters(store, function () {
        util.files.read(util.filebackup.directory, util.filebackup.generateFileName(store), function (fileDataAsString) {
            var fileStoreData = null;
            try {
                fileStoreData = JSON.parse(fileDataAsString);
            }
            catch (e) {
                store.load();
                if (callback) {
                    callback(null, false);
                }
                return;
            }

            if (fileStoreData.length > 0) {
                for (var i = 0; i < fileStoreData.length; i++) {
                    var record = Ext.create( store.getProxy().getModel().getName(), fileStoreData[i] );
                    record.save();
                }
                store.sync();
            }

            store.load();

            if (!_.isUndefined(callback)) {
                callback(null, true);
            }


        }, function (error) {
            store.load();
            if (!_.isUndefined(callback)) {
                callback(null, false);
            }
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
};

util.filebackup.storeHasChanged = function (currentStore) {
    util.filebackup.saveStore(currentStore, function () {
        console.log("Store saved");
    });
};

util.filebackup.deleteAllStoreFiles = function () {
    _.each(util.filebackup.watchedStores, function (store) {
        var fileName = util.filebackup.generateFileName(store);
        util.files.deleteFile(util.filebackup.directory, fileName, function () {
            console.log(fileName + " deleted");
        });
    });
};