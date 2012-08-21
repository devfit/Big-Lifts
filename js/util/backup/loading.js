Ext.ns('wendler.loading');
wendler.loading.loadStore = function (store, callback) {
    if (wendler.loadingFromFile) {
        util.filebackup.loadStore(store, function () {
            util.filebackup.watchStoreSync(store);
            callback();
        });
    }
    else {
        store.load({
            callback:function () {
                util.filebackup.watchStoreSync(store);
                callback();
            }
        });
    }
};

wendler.loading.loadTasks = _.map(wendler.stores, function (store) {
    return function (callback) {
        wendler.loading.loadStore(store, callback);
    }
});

async.series(wendler.loading.loadTasks, function () {
    wendler.main.start();
});

