if (Ext.is.Desktop) {
    wendler.controller.log.export.ajaxEmailRequest = function (email, data) {
        window.testEmail = email;
        window.testData = data;
        console.log(email + " " + data);
    }
}