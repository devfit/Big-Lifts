"use strict";
if (Ext.os.is.Linux || Ext.os.is.MacOS) {
    Ext.ns('biglifts.log.emailExport');
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

    biglifts.log.emailExport.ajaxEmailRequest = function (email, data) {
        window.testEmail = email;
        window.testData = data;
        console.log(email + " " + data);
    };

    biglifts.loadingFromFile = false;
}