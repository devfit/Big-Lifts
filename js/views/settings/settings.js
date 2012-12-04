"use strict";
Ext.ns('biglifts.views', 'biglifts.controller.settings');

biglifts.controller.settings.backToMore = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list'));
};

biglifts.views.Settings = {
    xtype:'panel',
    id:'settings',
    iconCls:'settings',
    layout:'card',
    scroll:'vertical',
    listeners:{
        painted:function () {
            biglifts.navigation.setBackFunction(biglifts.controller.settings.backToMore);
        }
    },
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:'Settings',
            items:[
                {
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    handler:biglifts.controller.settings.backToMore
                }
            ]
        },
        biglifts.views.SettingsForm
    ]
};