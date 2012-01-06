"use strict";
Ext.ns('wendler.views', 'wendler.controller.settings');

wendler.controller.settings.backToMore = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list'), {type:'slide', direction:'right'});
};

wendler.views.Settings = Ext.extend(Ext.Panel, {
    id:'settings',
    iconCls:'settings',
    layout:'card',
    cardSwitchAnimation:'slide',
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Settings',
            items:[
                {
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    handler:wendler.controller.settings.backToMore
                }
            ]
        }
    ],
    items:[
        Ext.getCmp('settings-form')
    ]
});