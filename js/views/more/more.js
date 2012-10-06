"use strict";
Ext.define('Wendler.views.More', {
    extend:'Ext.Panel',
    config:{
        id:'more',
        title:'More',
        iconCls:'more',
        layout:'card',
        activeItem:0,
        items:[
            wendler.views.MoreInfoList,
            wendler.views.Settings
        ]
    }
});

