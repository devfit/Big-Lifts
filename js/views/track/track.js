"use strict";
Ext.ns('wendler.views', 'wendler.controller.log');

wendler.controller.log.getDateFormat = function(){
    return wendler.stores.Settings.first().get('dateFormat');
};

wendler.controller.log.formatDate = function (timestamp) {
    return new Date(timestamp).toString(wendler.controller.log.getDateFormat());
};

Ext.define('Wendler.views.Log', {
    extend:'Ext.Panel',
    config:{
        id:'log',
        iconCls:'bookmarks',
        layout:'card',
        title:'Track',
        items:[
            wendler.views.log.cards.LogList,
            wendler.views.log.cards.EditLogEntry,
            {
                xtype:'lognoteseditor',
                id:'log-notes-editor'
            },
            wendler.views.log.cards.Export
        ]
    }
});