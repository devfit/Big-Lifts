"use strict";
Ext.ns('wendler.navigation');

wendler.navigation.resetBack = function () {
    document.removeEventListener("backbutton");
};

wendler.navigation.back = function () {
};
wendler.navigation.setBackFunction = function (backFunction) {
    document.removeEventListener('backbutton');
    wendler.navigation.back = backFunction;
    if( wendler.main.deviceReady ){
        document.addEventListener('backbutton', wendler.navigation.back, false);
    }
};