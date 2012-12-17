"use strict";
Ext.define('biglifts.views.ss.More', {
    extend: 'Ext.Panel',
    showReset: function () {
        this.setActiveItem(this.resetPanel);
    },
    config: {
        id: 'ss-more',
        title: 'More',
        iconCls: 'more',
        layout: 'card',
        listeners: {
            painted: function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize: function () {
                var me = this;
                me.moreInfoList = me.add(Ext.create('biglifts.views.ss.MoreInfoList'));
                me.add(Ext.create('biglifts.views.ss.SettingsForm'));
                me.resetPanel = this.add(Ext.create('biglifts.views.Reset', {
                    backFunction: function () {
                        me.setActiveItem(me.moreInfoList);
                    }
                }));
                me.setActiveItem(0);
            }
        }
    }
});

