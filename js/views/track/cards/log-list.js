Ext.ns('wendler.views.log.cards', 'wendler.controller.logList');

wendler.controller.logList.showEditLogEntry = function (dataview, index) {
    var logRecord = wendler.stores.LiftLog.getAt(index);
    wendler.controller.logEntry.setupLogEntry(logRecord);
};

wendler.controller.logList.sortAndRefreshList = function () {
    wendler.stores.LiftLog.sort('date', 'DESC');
    Ext.getCmp('lift-log-list').refresh();
};

wendler.stores.LiftLog.addListener('update', wendler.controller.logList.sortAndRefreshList);

wendler.views.log.cards.LogList = {
    id:'log-list',
    xtype:'panel',
    layout:'fit',
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Track',
            items:[
            ]
        }
    ],
    items:[
        {
            id:'lift-log-list',
            listeners:{
                afterrender:wendler.controller.logList.sortAndRefreshList,
                itemtap:wendler.controller.logList.showEditLogEntry
            },
            xtype:'list',
            store:wendler.stores.LiftLog,
            itemCls:'lift-log-row',
            emptyText:'<div id="lift-log-empty-text">To track a lift, use the checkmark in the 5/3/1 view</div>',
            itemTpl:'<table><tbody><tr>' +
                '<td width="30%"><span class="lift-name">{liftName}</span></td>' +
                '<td width="30%"><span class="reps">{reps}x</span> <span class="weight">{weight}</span></td>' +
                '<td width="40%" class="date-week">' +
                '<span class="date">{[wendler.controller.log.formatDate(values.date)]}</span><span class="disclosure-small"></span>' +
                '</td>' +
                '</tr></tbody></table>'
        }
    ]
};