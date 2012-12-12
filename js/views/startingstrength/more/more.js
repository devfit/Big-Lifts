"use strict";
Ext.define('biglifts.views.ss.More', {
    extend: 'Ext.Panel',
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
                this.add(Ext.create('biglifts.views.ss.MoreInfoList'));
                this.add(Ext.create('biglifts.views.ss.SettingsForm'));
                this.setActiveItem(0);
            }
        }
    }
});

