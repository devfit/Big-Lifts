"use strict";
Ext.define('biglifts.views.AssistanceLiftChooser', {
    extend:'Ext.Panel',
    xtype:'assistanceliftchooser',
    config:{
        layout:'fit',
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'Assistance'
            },
            {
                xtype:'list',
                store:biglifts.stores.lifts.EnabledLifts,
                itemTpl:'{name}',
                onItemDisclosure:function () {

                }
            }
        ]
    }
});