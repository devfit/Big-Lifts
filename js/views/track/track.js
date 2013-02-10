"use strict";
Ext.ns('biglifts.views', 'biglifts.log');

biglifts.log.formatDate = function (timestamp) {
    return new Date(timestamp).toString(biglifts.stores.GlobalSettings.getDateFormat());
};

Ext.define('biglifts.views.Log', {
    extend:'Ext.Panel',
    config:{
        id:'log',
        iconCls:'bookmarks',
        layout:'card',
        title:'Track',
        listeners:{
            initialize:function () {
                this.add([
                    Ext.create('biglifts.views.LogList'),
                    biglifts.views.log.cards.EditLogEntry,
                    Ext.create('biglifts.views.EditAssistanceLogEntry', {id:'edit-assistance-log-entry'}),
                    {
                        xtype:'lognoteseditor',
                        id:'log-notes-editor'
                    },
                    {
                        xtype:'assistancelognoteseditor',
                        id:'assistance-log-notes-editor'
                    },
                    biglifts.views.log.cards.Export,
                    Ext.create('biglifts.views.LiftGraph', {id:'graph'})
                ]);

                this.setActiveItem(0);
            }
        }
    }
});