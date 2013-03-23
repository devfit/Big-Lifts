Ext.ns('biglifts.ads');

biglifts.ads.adjustAdsForOrientation = function (viewport, orientation) {
    if (Ext.os.is.iOS) {
        if (!biglifts.premium) {
            window.plugins.iAdPlugin.orientationChanged();
            if (orientation === 'landscape') {
                window.plugins.iAdPlugin.showAd(false);
            }
            else {
                window.plugins.iAdPlugin.showAd(true);
            }
        }
    }
};

biglifts.ads.setupAds = function () {
    if (Ext.os.is.iOS && !biglifts.DEBUG) {
        document.addEventListener("iAdBannerViewDidLoadAdEvent", function (evt) {
            window.plugins.iAdPlugin.showAd(true);
        }, false);
        document.addEventListener("iAdBannerViewDidFailToReceiveAdWithErrorEvent", function (evt) {
            window.plugins.iAdPlugin.showAd(false);
        }, false);
        window.plugins.iAdPlugin.orientationChanged();
        window.plugins.iAdPlugin.prepare(true);
        var ONE_MINUTE = 1000 * 60;
        setTimeout(function () {
            if (!biglifts.premium) {
                window.plugins.iAdPlugin.showAd(true);
            }
        }, ONE_MINUTE)
    }
};