Ext.ns('biglifts.loading');
biglifts.loading.loadStore = function (store, callback) {
    if (biglifts.loadingFromFile) {
        try {
            util.filebackup.loadStore(store, function () {
                util.filebackup.watchStoreSync(store);
                callback();
            });
        }
        catch (e) {
            store.load();
            callback();
        }
    }
    else {
        try {
            store.load({
                callback: function () {
                    util.filebackup.watchStoreSync(store);
                    callback();
                }
            });
        }
        catch (e) {
            callback();
        }
    }
};

biglifts.loading.loadTasks = _.map(biglifts.stores, function (store) {
    return function (callback) {
        biglifts.loading.loadStore(store, callback);
    }
});

biglifts.loading.loadingStarted = false;
biglifts.loading.load = function () {
    if (!biglifts.loading.loadingStarted) {
        biglifts.loading.loadingStarted = true;
        setTimeout(function () {
            async.parallel(biglifts.loading.loadTasks, function () {
                biglifts.main.start();
            });

            biglifts.ads.setupAds();
        }, 0);
    }
};

if (biglifts.loadingFromFile) {
    document.addEventListener("deviceready", biglifts.loading.load, false);
    setTimeout(function () {
        if (!biglifts.loading.loadingStarted) {
            biglifts.loadingFromFile = false;
            biglifts.loading.load();
        }
    }, 1500);
}
else {
    biglifts.loading.load();
}


