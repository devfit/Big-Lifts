"use strict";
Ext.ns('wendler.main');

wendler.main.deviceReady = false;

wendler.main.phoneGapReady = function () {
    wendler.main.deviceReady = true;
    if (typeof( wendler.main.start ) !== 'undefined') {
        wendler.main.start();
    }
};

document.addEventListener("deviceready", wendler.main.phoneGapReady, false);

if (typeof(PhoneGap) === "undefined") {
    wendler.main.deviceReady = true;
}