"use strict";
Ext.ns('biglifts.navigation');

biglifts.navigation.backEventBound = false;
biglifts.navigation.backFunction = Ext.emptyFn;

biglifts.navigation.back = function () {
    if( biglifts.navigation.backEventBound ){
        biglifts.navigation.backFunction();
    }
};

biglifts.navigation.bindBackEvent = function () {
    if( !biglifts.navigation.backEventBound ){
        document.addEventListener('backbutton', biglifts.navigation.back);
        biglifts.navigation.backEventBound = true;
    }
};

biglifts.navigation.unbindBackEvent = function () {
    if( biglifts.navigation.backEventBound ){
        document.removeEventListener('backbutton', biglifts.navigation.back);
        biglifts.navigation.backEventBound = false;
    }
};

document.addEventListener('deviceready', function () {
    biglifts.navigation.bindBackEvent();
});

biglifts.navigation.setBackFunction = function (backFunction) {
    biglifts.navigation.backFunction = backFunction;
    biglifts.navigation.bindBackEvent();
};