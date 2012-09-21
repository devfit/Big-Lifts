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

wendler.loading.loadingStarted = false;
wendler.loading.load = function () {
    if (!wendler.loading.loadingStarted) {
        wendler.loading.loadingStarted = true;
        async.parallel(wendler.loading.loadTasks, function () {
            wendler.main.start();
        });
    }
};

if (wendler.loadingFromFile) {
    document.addEventListener("deviceready", wendler.loading.load, false);
    setTimeout(function () {
        if (!wendler.loading.loadingStarted) {
            wendler.loadingFromFile = false;
            wendler.loading.load();
        }
    }, 1500);
}
else {
    wendler.loading.load();
}


