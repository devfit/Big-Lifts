"use strict";
Ext.ns('wendler.views', 'wendler.controller.log');

wendler.controller.log.backToMore = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list'), {type:'slide', direction:'right'});
};

wendler.stores.LiftLog.addListener('beforesync', function () {
    Ext.getCmp('lift-log-list').refresh();
});

wendler.controller.log.formatDate = function (date) {
    return date.format('m/d/Y');
};

wendler.views.Log = Ext.extend(Ext.Panel, {
    id:'log',
    iconCls:'bookmarks',
    layout:'fit',
    title:'Track',
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