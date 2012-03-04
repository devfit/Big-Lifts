"use strict";
if (Ext.is.Desktop) {
    wendler.controller.log.emailExport.ajaxEmailRequest = function (email, data) {
        window.testEmail = email;
        window.testData = data;
        console.log(email + " " + data);
    };
}