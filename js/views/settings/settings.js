"use strict";
Ext.define('biglifts.views.Settings', {
    extend: "Ext.Panel",
    backToMore: function () {
        Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list'));
    },
    config: {
        id: 'settings',
        iconCls: 'settings',
        layout: 'card',
        scroll: 'vertical',
        listeners: {
            initialize: function () {
                var me = this;
                me.add([
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Settings',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Back',
                                ui: 'back',
                                handler: Ext.bind(me.backToMore, me)
                            }
                        ]
                    },
                    Ext.create('biglifts.views.SettingsForm')
                ]);
            },
            painted: function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.backToMore, this));
            }
        }
    }
});