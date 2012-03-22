"use strict";
Ext.ns('wendler.main');

wendler.main.deviceReady = false;

document.addEventListener("deviceready", function () {
    wendler.main.deviceReady = true;
    wendler.main.start();
}, false);

if (typeof(PhoneGap) === "undefined") {
    wendler.main.deviceReady = true;
}