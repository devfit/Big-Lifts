"use strict";
Ext.define('biglifts.views.More', {
    extend:'Ext.Panel',
    config:{
        id:'more',
        title:'More',
        iconCls:'more',
        layout:'card',
        activeItem:0,
        items:[
            biglifts.views.MoreInfoList,
            biglifts.views.Settings
        ]
    }
});

