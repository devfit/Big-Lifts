"use strict";
if (Ext.os.is.Linux) {
    window.device = {
        name:"Chrome",
        uuid:'1234',
        version:'1.0',
        exitApp:function () {
            window.location.reload();
        }
    };

//    wendler.controller.log.emailExport.ajaxEmailRequest = function (email, data) {
//        window.testEmail = email;
//        window.testData = data;
//        console.log(email + " " + data);
//    };
}