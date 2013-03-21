Ext.define('biglifts.migrations.SubscribePoll', {
    POLL_URL: 'http://biglifts.herokuapp.com/poll',
    markPollResponse: function (yesOrNo) {
        Ext.Ajax.request({
            url: this.POLL_URL,
            method: 'POST',
            headers: Ext.create('biglifts.models.HeadersBuilder').buildSyncHeaders(),
            jsonData: {
                name: 'subscribe',
                answer: yesOrNo === 'yes'
            },
            success: function (response) {
                console.log("Success");
            },
            failure: function (response) {
                console.log("failure");
            },
            scope: this
        });
    },
    run: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() !== 0) {
                util.whenApplicationReady(function () {
                    Ext.Msg.confirm('Poll!',
                        'Would you consider subscribing for $1/month to support future development and get early access to new workouts?', function (text) {
                            me.markPollResponse(text);
                        });
                });
            }
        });
    }
});