"use strict";
Ext.ns('wendler.views', 'wendler.stores', 'wendler.maxes.controller');

Ext.define('Wendler.views.Maxes', {
    extend:'Ext.Panel',
    config:{
        id:'maxes-panel',
        title:'Lifts',
        iconCls:'settings',
        layout:'card',
        defaults:{
            fullscreen:true
        },
        items:[
            wendler.maxes.cards.maxesForm,
            wendler.maxes.cards.editMaxesList,
            wendler.maxes.cards.editLiftPanel,
            wendler.maxes.cards.addLiftPanel,
            wendler.maxes.cards.ArrangeLifts
        ]
    }
});