"use strict";
Ext.ns('biglifts.debug');

biglifts.debug.setup531WithoutNotification = function () {
    biglifts.stores.Routine.add({'name':'5/3/1'});
    biglifts.stores.Routine.sync();
};

if (Ext.os.is.Linux || Ext.os.is.MacOS) {
    window.onerror = function (em, url, ln) {
        alert(em + ", " + url + ", " + ln);
        return false;
    };

    window.device = {
        name:"Chrome",
        uuid:'1234',
        version:'1.0',
        exitApp:function () {
            window.location.reload();
        }
    };

    Ext.define('biglifts.overrides.RestTimer', {
        override:'biglifts.views.RestTimer',
        TIME_INTERVAL:3
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