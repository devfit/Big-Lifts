"use strict";
Ext.ns('biglifts.debug');

biglifts.debug.setup531WithoutNotification = function () {
    biglifts.stores.Routine.add({'name': '5/3/1'});
    biglifts.stores.Routine.sync();
};

biglifts.DEBUG = Ext.os.is.Linux || Ext.os.is.MacOS || location.href.indexOf('debug=true') !== -1;
if (biglifts.DEBUG) {
    window.onerror = function (em, url, ln) {
        alert(em + ", " + url + ", " + ln);
        return false;
    };

    window.device = {
        name: "Chrome",
        uuid: '1234',
        version: '1.0',
        exitApp: function () {
            window.location.reload();
        }
    };

    Ext.define('biglifts.overrides.RestTimer', {
        override: 'biglifts.views.RestTimer',
        TIME_INTERVAL: 3
    });

    Ext.define('biglifts.overrides.UserStore', {
        override: 'biglifts.stores.UserStore',
        CREATE_USER_URL: 'http://localhost:3000/users'
    });

    Ext.define('biglifts.overrides.LogSyncer', {
        override: 'biglifts.models.LogSyncer',
        LOG_URL: 'http://localhost:3000/log'
    });

    Ext.define('biglifts.overrides.UserSetup', {
        override: 'biglifts.views.UserSetup',
        UPDATE_USER_URL: 'http://localhost:3000/users/1'
    });

    Ext.define('biglifts.overrides.UserSetup', {
        override: 'biglifts.views.UserSetup',
        UPDATE_USER_URL: 'http://localhost:3000/users/1'
    });

    Ext.define('biglifts.overrides.SubscribePoll', {
        override: 'biglifts.migrations.SubscribePoll',
        POLL_URL: 'http://localhost:3000/poll'
    });

    Ext.ns('biglifts.log.emailExport');
    biglifts.log.emailExport.ajaxEmailRequest = function (email, data) {
        window.testEmail = email;
        window.testData = data;
        console.log(email + " " + data);
    };

    if (location.href.indexOf('existing_routine=531NoNotification') !== -1) {
        biglifts.debug.setup531WithoutNotification();
    }

    biglifts.loadingFromFile = false;
}