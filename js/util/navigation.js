"use strict";
Ext.ns('wendler.navigation');

wendler.navigation.backEventBound = false;
wendler.navigation.backFunction = Ext.emptyFn;

wendler.navigation.back = function () {
    wendler.navigation.backFunction();
};

wendler.navigation.bindBackEvent = function () {
    if( !wendler.navigation.backEventBound ){
        document.addEventListener('backbutton', wendler.navigation.back);
        wendler.navigation.backEventBound = true;
    }
};

wendler.navigation.unbindBackEvent = function () {
    if( wendler.navigation.backEventBound ){
        document.removeEventListener('backbutton', wendler.navigation.back);
        wendler.navigation.backEventBound = false;
    }
};

document.addEventListener('deviceready', function () {
    wendler.navigation.bindBackEvent();
});

wendler.navigation.setBackFunction = function (backFunction) {
    wendler.navigation.backFunction = backFunction;
    wendler.navigation.bindBackEvent();
};