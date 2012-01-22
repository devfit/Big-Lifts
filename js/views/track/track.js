"use strict";
Ext.ns('wendler.views', 'wendler.controller.log');

wendler.controller.log.backToMore = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list'), {type:'slide', direction:'right'});
};

wendler.stores.LiftLog.addListener('beforesync', function () {
    Ext.getCmp('lift-log-list').refresh();
    wendler.controller.log.showHideHelpMessage();
});

wendler.controller.log.formatDate = function (date) {
    return date.format('m/d/Y');
};

wendler.controller.log.showHideHelpMessage = function () {
    if (wendler.stores.LiftLog.getCount() == 0) {
        Ext.getCmp('no-log-help-text-container').show();
    }
    else {
        Ext.getCmp('no-log-help-text-container').hide();
    }
};

wendler.views.Log = Ext.extend(Ext.Panel, {
    id:'log',
    iconCls:'bookmarks',
    layout:'fit',
    title:'Track',
    listeners:{
        beforeshow: wendler.controller.log.showHideHelpMessage
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
});