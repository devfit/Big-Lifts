"use strict";
Ext.ns('util.proxy');

util.proxy.getProxyNameFromStore = function (store) {
    var proxyId = store.getProxy().getId();
    return proxyId.replace('-proxy', '');
};
