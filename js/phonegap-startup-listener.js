"use strict";
Ext.ns('wendler.main');

wendler.main.deviceReady = false;
wendler.main.started = false;

document.addEventListener("deviceready", function () {
    if (wendler.main.start) {
        wendler.main.started = true;
        wendler.main.start();
    }
    else {
        wendler.main.deviceReady = true;
    }
}, false);