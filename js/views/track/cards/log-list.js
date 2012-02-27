Ext.ns('wendler.views.log.cards', 'wendler.controller.logList');

wendler.controller.logList.showLogEntry = function (dataview, index, item, e) {
    var logRecord = wendler.stores.LiftLog.getAt(index);
    wendler.controller.logEntry.setupLogEntry(logRecord);
};

wendler.controller.logList.deleteLogEntry = function (dataview, index, item, e) {
    wendler.stores.LiftLog.removeAt(index);
    wendler.stores.LiftLog.sync();
    Ext.getCmp('lift-log-list').refresh();
};

wendler.controller.logList.showExportLog = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('export-log'), {type:'slide', direction:'left'});
};

wendler.controller.logList.sortAndRefreshList = function () {
    wendler.stores.LiftLog.sort('timestamp', 'DESC');
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
                {xtype:'spacer'},
                {
                    xtype:'button',
                    iconMask:true,
                    iconCls:'action',
                    ui:'action',
                    handler:wendler.controller.logList.showExportLog
                }
            ]
        }
    ],
    items:[
        {
            id:'lift-log-list',
            listeners:{
                afterrender:function () {
                    wendler.controller.logList.sortAndRefreshList();
                    wendler.components.addSwipeToDelete(this, wendler.controller.logList.showLogEntry,
                        wendler.controller.logList.deleteLogEntry, '.date-week');
                }
            },
            xtype:'list',
            selectedItemCls:'',
            store:wendler.stores.LiftLog,
            itemCls:'lift-log-row',
            emptyText:'<div id="lift-log-empty-text">To track a lift, use the checkmark in the 5/3/1 view</div>',
            itemTpl:'<table><tbody><tr>' +
                '<td width="30%"><div class="lift-name">{liftName}</div><div class="cycle-and-week">C{cycle} W{week}</div></td>' +
                '<td width="30%"><div><span class="reps">{reps}x</span> <span class="weight">{weight}</span></div>' +
                '<div class="estimated-one-rep">~{[util.formulas.estimateOneRepMax(values.weight,values.reps)]}</div></td>' +
                '<td width="40%" class="date-week">' +
                '<span class="date">{[wendler.controller.log.formatDate(values.timestamp)]}</span><span class="disclosure-small"></span>' +
                '</td><td width="40%" class="delete-button-holder hidden"></td>' +
                '</tr></tbody></table>'
        }
    ]
};