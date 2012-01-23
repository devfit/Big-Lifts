"use strict";
Ext.ns('wendler.views', 'wendler.controller.log');

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
    layout:'card',
    title:'Track',
    listeners:{
        beforeshow:wendler.controller.log.showHideHelpMessage
    },
    items:[
        wendler.views.log.cards.LogList,
        wendler.views.log.cards.EditLogEntry
    ]
});