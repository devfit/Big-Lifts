"use strict";
Ext.ns('wendler.main');

wendler.main.deviceReady = false;

document.addEventListener("deviceready", function () {
    wendler.main.deviceReady = true;
}, false);

if (typeof(PhoneGap) === "undefined") {
    wendler.main.deviceReady = true;
}