Ext.ns('util.filebackup');

util.filebackup.SYNC_MS = 200;

util.filebackup.directory = 'biglifts531';
util.filebackup.saveStore = function (store, callback) {
    var data = util.filebackup.generateDataFromStore(store);
    setTimeout(function () {
        if (data !== null) {
            util.files.write(util.filebackup.directory, util.filebackup.generateFileName(store), data, callback);
        }
    }, util.filebackup.SYNC_MS);
};

util.filebackup.generateDataFromStore = function (store) {
    if (_.isUndefined(store.data)) {
        return null;
    }

    return Ext.encode(Ext.pluck(store.data.items, 'data'));
};

util.filebackup.storesToSync = [];
util.filebackup.watchedStores = [];

util.filebackup.loadStore = function (store, callback) {
    util.files.read(util.filebackup.directory, util.filebackup.generateFileName(store), function (fileDataAsString) {
        var fileStoreData = null;
        try {
            fileStoreData = JSON.parse(fileDataAsString);
        }
        catch (e) {
            store.load(function () {
                if (!_.isUndefined(callback)) {
                    callback(null, false);
                }
            });
            return;
        }

        if (fileStoreData.length > 0) {
            for (var i = 0; i < fileStoreData.length; i++) {
                var fileStoreRecord = fileStoreData[i];
                delete fileStoreRecord.id;

                var record = Ext.create(store.getProxy().getModel().getName(), fileStoreRecord);
                record.save();
                store.add(record);
            }
            store.sync();
        }

        store.load(function () {
            if (!_.isUndefined(callback)) {
                callback(null, true);
            }
        });
    }, function (error) {
        store.load(function () {
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
    util.filebackup.saveStore(currentStore, Ext.emptyFn);
};

util.filebackup.deleteAllStoreFiles = function () {
    _.each(util.filebackup.watchedStores, function (store) {
        var fileName = util.filebackup.generateFileName(store);
        util.files.deleteFile(util.filebackup.directory, fileName, function () {
            console.log(fileName + " deleted");
        });
    });
};