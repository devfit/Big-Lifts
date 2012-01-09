"use strict";
Ext.ns('wendler.navigation');

wendler.navigation.DEFAULT_BACK = function () {
};
wendler.navigation.backFunction = wendler.navigation.DEFAULT_BACK;
wendler.navigation.resetBack = function () {
    wendler.navigation.backFunction = wendler.navigation.DEFAULT_BACK;
};
wendler.navigation.back = function () {
    wendler.navigation.backFunction();
};
