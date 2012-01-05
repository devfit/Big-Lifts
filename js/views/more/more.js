"use strict";
Ext.ns('wendler.views', 'wendler.controller.more', 'wendler.more');

wendler.views.More = Ext.extend(Ext.Panel, {
    id:'more',
    title:'More',
    iconCls:'more',
    layout: 'card',
    activeItem: 0,
    items:[
        wendler.views.MoreInfoList,
        new wendler.views.Settings()
    ]
});

