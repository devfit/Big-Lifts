Ext.ns('biglifts.loading');
biglifts.loading.loadStore = function (store, callback) {
    if (biglifts.loadingFromFile) {
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

            biglifts.setupAds();
        }, 0);
    }
};

biglifts.setupAds = function () {
    if (Ext.os.is.iOS) {
        document.addEventListener("iAdBannerViewDidLoadAdEvent", function (evt) {
            window.plugins.iAdPlugin.showAd(true);
        }, false);
        document.addEventListener("iAdBannerViewDidFailToReceiveAdWithErrorEvent", function (evt) {
            window.plugins.iAdPlugin.showAd(false);
        }, false);
        window.plugins.iAdPlugin.orientationChanged(true);
        window.plugins.iAdPlugin.prepare(true);
        var ONE_MINUTE = 1000 * 60;
        setTimeout(function () {
            if (!biglifts.premium) {
                window.plugins.iAdPlugin.showAd(true);
            }
        }, ONE_MINUTE)
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


