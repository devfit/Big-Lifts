"use strict";
Ext.define('biglifts.views.More', {
    extend: 'Ext.Panel',
    showReset: function () {
        this.setActiveItem(this.resetPanel);
    },
    config: {
        id: 'more',
        title: 'More',
        iconCls: 'more',
        layout: 'card',
        listeners: {
            initialize: function () {
                var me = this;
                me.moreInfoList = this.add(Ext.create('biglifts.views.531.MoreInfoList'));
                me.settingsPanel = this.add(Ext.create('biglifts.views.Settings'));
                me.resetPanel = this.add(Ext.create('biglifts.views.Reset', {
                    backFunction: function () {
                        me.setActiveItem(me.moreInfoList);
                    }
                }));

                if (biglifts.toggles.Assistance) {
                    this.add(
                        Ext.create('biglifts.views.OneRepMaxCalculator', {
                            id: 'one-rep-max-calculator',
                            backFunction: function () {
                                me.setActiveItem(me.moreInfoList);
                            }
                        })
                    );
                }

                this.setActiveItem(0);
            }
        }
    }
});

