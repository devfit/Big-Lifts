Ext.ns('util.filebackup');
util.filebackup.saveStore = function (store) {
    var data = Ext.encode(Ext.pluck(store.data.items, 'data'));
    util.files.write(util.filebackup.generateFileName(store), data);
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