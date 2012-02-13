"use strict";
Ext.ns('wendler.views', 'wendler.controller.log');

wendler.controller.log.formatDate = function (timestamp) {
    return new Date(timestamp).format('m/d/Y');
};

wendler.views.Log = Ext.extend(Ext.Panel, {
    id:'log',
    iconCls:'bookmarks',
    layout:'card',
    title:'Track',
    items:[
        wendler.views.log.cards.LogList,
        wendler.views.log.cards.EditLogEntry
    ]
});