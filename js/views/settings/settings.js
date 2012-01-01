"use strict";
Ext.ns('wendler.views');

wendler.views.Settings = Ext.extend(Ext.Panel, {
    id: 'settings',
    title: 'Settings',
    iconCls: 'settings',
    layout: 'card',
    cardSwitchAnimation:'slide',
    items:[
        Ext.getCmp('settings-form')
    ]
});