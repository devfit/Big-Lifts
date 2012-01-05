"use strict";
Ext.ns('wendler.views');

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
                    ui:'back'
                }
            ]
        }
    ],
    items:[
        Ext.getCmp('settings-form')
    ]
});