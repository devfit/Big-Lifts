"use strict";
Ext.ns('wendler.views', 'wendler.controller.settings');

wendler.controller.settings.backToMore = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list-panel'), {type:'slide', direction:'right'});
};

wendler.views.Settings = {
    xtype:'panel',
    id:'settings',
    iconCls:'settings',
    layout:'card',
    scroll:'vertical',
    cardSwitchAnimation:'slide',
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.controller.settings.backToMore);
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
                    handler:wendler.controller.settings.backToMore
                }
            ]
        },
        wendler.views.SettingsForm
    ]
};