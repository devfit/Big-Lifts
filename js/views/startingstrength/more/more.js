"use strict";
Ext.define('biglifts.views.ss.More', {
    extend:'Ext.Panel',
    config:{
        title:'More',
        iconCls:'more',
        layout:'card',
        listeners:{
            initialize:function () {
                this.add(Ext.create('biglifts.views.ss.MoreInfoList'));
                this.setActiveItem(0);
            }
        }
    }
});

