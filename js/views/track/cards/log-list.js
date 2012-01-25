Ext.ns('wendler.views.log.cards', 'wendler.controller.logList');

wendler.controller.logList.showEditLogEntry = function (dataview, index) {
    var logRecord = wendler.stores.LiftLog.getAt(index);
    wendler.controller.logEntry.setupLogEntry(logRecord);
};

wendler.controller.logList.showHideHelpMessage = function () {
    if (wendler.stores.LiftLog.getCount() == 0) {
        Ext.getCmp('no-log-help-text-container').show();
    }
    else {
        Ext.getCmp('no-log-help-text-container').hide();
    }
};

wendler.stores.LiftLog.addListener('beforesync', function () {
    wendler.controller.logList.showHideHelpMessage();
    Ext.getCmp('lift-log-list').refresh();
});

wendler.views.log.cards.LogList = {
    id:'log-list',
    xtype:'panel',
    layout: 'fit',
    listeners: {
      afterlayout: wendler.controller.logList.showHideHelpMessage
    },
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
            id:'no-log-help-text-container',
            html:'<div id="no-log-help-text">To track a lift, use the checkmark in the 5/3/1 view</div>',
            hidden:true
        },
        {
            id:'lift-log-list',
            listeners:{
                itemtap:wendler.controller.logList.showEditLogEntry
            },
            xtype:'list',
            store:wendler.stores.LiftLog,
            itemCls:'lift-log-row',
            itemTpl:'<table><tbody><tr>' +
                '<td><span class="lift-name">{liftName}</span></td>' +
                '<td><span class="reps">{reps}x</span> <span class="weight">{weight}</span></td>' +
                '<td colspan="2" class="date-week">' +
                '<span class="date">{[wendler.controller.log.formatDate(values.date)]}</span> ' +
                '<span class="week">Week {week}</span>' +
                '</td>' +
                '</tr></tbody></table>'
        }
    ]
};