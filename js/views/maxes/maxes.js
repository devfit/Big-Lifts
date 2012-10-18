"use strict";
Ext.ns('biglifts.views', 'biglifts.stores', 'biglifts.maxes.controller');

Ext.define('biglifts.views.Maxes', {
    extend:'Ext.Panel',
    config:{
        id:'maxes-panel',
        title:'Edit',
        iconCls:'settings',
        layout:'card',
        defaults:{
            fullscreen:true
        },
        items:[
            biglifts.maxes.cards.maxesForm,
            biglifts.maxes.cards.editMaxesList,
            biglifts.maxes.cards.editLiftPanel,
            biglifts.maxes.cards.addLiftPanel,
            biglifts.maxes.cards.ArrangeLifts,
            biglifts.maxes.barSetup.BarSetup
        ]
    }
});