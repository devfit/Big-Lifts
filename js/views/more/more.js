"use strict";
Ext.ns('wendler.views', 'wendler.controller.more', 'wendler.more');

Ext.define('Wendler.views.More', {
    extend:'Ext.Panel',
    config:{
        id:'more',
        title:'More',
        iconCls:'more',
        layout:'card',
        activeItem:0,
        items:[
            wendler.views.MoreInfoList
//            new wendler.views.Settings()
        ]
    }
});

