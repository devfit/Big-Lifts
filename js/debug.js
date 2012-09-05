"use strict";
if (Ext.os.is.Linux || Ext.os.is.MacOS) {
    window.device = {
        name:"Chrome",
        uuid:'1234',
        version:'1.0',
        exitApp:function () {
            window.location.reload();
        }
    };

    wendler.restTimer.TIME_INTERVAL = 3;

    wendler.loadingFromFile = false;
}