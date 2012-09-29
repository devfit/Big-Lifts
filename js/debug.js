"use strict";
if (Ext.os.is.Linux || Ext.os.is.MacOS) {
    Ext.ns('wendler.log.emailExport', 'wendler.restTimer');
    window.device = {
        name:"Chrome",
        uuid:'1234',
        version:'1.0',
        exitApp:function () {
            window.location.reload();
        }
    };

    wendler.restTimer.TIME_INTERVAL = 3;

    wendler.log.emailExport.ajaxEmailRequest = function (email, data) {
        window.testEmail = email;
        window.testData = data;
        console.log(email + " " + data);
    };

    wendler.loadingFromFile = false;
}