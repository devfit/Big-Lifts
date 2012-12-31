"use strict";
Ext.ns('biglifts.views', 'biglifts.stores', 'biglifts.maxes.controller');

Ext.define('biglifts.views.Maxes', {
    extend: 'Ext.Panel',
    config: {
        id: 'maxes-panel',
        title: 'Edit',
        iconCls: 'settings',
        layout: 'card',
        listeners: {
            initialize: function () {
                this.add([
                    Ext.create("Biglifts.views.MaxesForm"),
                    biglifts.maxes.cards.editMaxesList,
                    biglifts.maxes.cards.editLiftPanel,
                    Ext.create('biglifts.views.AddLiftPanel'),
                    Ext.create('biglifts.views.ArrangeLifts'),
                    Ext.create('biglifts.views.BarSetup')]);
                this.setActiveItem(0);
            }
        }
    }
});