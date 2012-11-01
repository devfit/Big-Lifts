"use strict";
Ext.ns('biglifts.views', 'biglifts.log');

biglifts.log.getDateFormat = function () {
    return biglifts.stores.Settings.first().get('dateFormat');
};

biglifts.log.formatDate = function (timestamp) {
    return new Date(timestamp).toString(biglifts.log.getDateFormat());
};

Ext.define('biglifts.views.Log', {
    extend:'Ext.Panel',
    config:{
        id:'log',
        iconCls:'bookmarks',
        layout:'card',
        title:'Track',
        listeners:{
            painted:function () {
                this.add([
                    biglifts.views.log.cards.LogList,
                    biglifts.views.log.cards.EditLogEntry,
                    biglifts.views.log.cards.EditAssistanceLogEntry,
                    {
                        xtype:'lognoteseditor',
                        id:'log-notes-editor'
                    },
                    {
                        xtype:'assistancelognoteseditor',
                        id:'assistance-log-notes-editor'
                    },
                    biglifts.views.log.cards.Export,
                    biglifts.views.log.cards.Graph
                ]);

                this.setActiveItem(0);
            }
        }
    }
});