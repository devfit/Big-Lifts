Ext.define('biglifts.migrations.RateApp', {
    run:function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (Ext.os.is.iOS) {
                if (biglifts.stores.Routine.getCount() !== 0) {
                    util.whenApplicationReady(function () {
                        Ext.Msg.confirm('Rate the App!', 'If you like the app, please rate it!', function (text) {
                            if (text === "yes") {
                                var appId = biglifts.premium ? "534996988" : "455470293";
                                location.href = "itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=" + appId;
                            }
                        });
                    });
                }
            }
        });
    }
});