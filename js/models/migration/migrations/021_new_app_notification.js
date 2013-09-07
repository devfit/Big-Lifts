Ext.define('biglifts.migrations.NewAppNotification', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.whenApplicationReady(function () {
                    Ext.Msg.confirm('New App!', 'Big Lifts 2 is out! It\'s free, so get it on the App Store today!', function (btn) {
                           if( btn === 'yes' ){
                               location.href = "https://itunes.apple.com/us/app/big-lifts-2/id661503150?mt=8";
                           }
                    });
                });
            }
        });
    }
});