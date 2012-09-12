"use strict";
Ext.ns('wendler.views', 'wendler.log');

wendler.log.getDateFormat = function () {
    return wendler.stores.Settings.first().get('dateFormat');
};

wendler.log.formatDate = function (timestamp) {
    return new Date(timestamp).toString(wendler.log.getDateFormat());
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
            wendler.views.log.cards.EditAssistanceLogEntry,
            {
                xtype:'lognoteseditor',
                id:'log-notes-editor'
            },
            {
                xtype:'assistancelognoteseditor',
                id:'assistance-log-notes-editor'
            },
            wendler.views.log.cards.Export
        ]
    }
});