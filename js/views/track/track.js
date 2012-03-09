"use strict";
Ext.ns('wendler.views', 'wendler.controller.log');

wendler.controller.log.formatDate = function (timestamp) {
    return new Date(timestamp).format('m/d/Y');
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
            wendler.views.log.cards.EditLogEntry
//            new wendler.views.log.cards.NotesEditor({
//                id:'log-notes-editor',
//                _returnCallback:wendler.controller.logEntry.returnFromEditNotes
//            }),
//            wendler.views.log.cards.Export
        ]
    }
});