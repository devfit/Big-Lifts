"use strict";
Ext.ns('wendler.views', 'wendler.stores', 'wendler.maxes.controller');

wendler.views.Maxes = Ext.extend(Ext.Panel, {
    id: 'maxes-panel',
    title: 'Lifts',
    iconCls: 'bookmarks',
    layout: 'card',
    defaults:{
        fullscreen: true
    },
    items: [
        new wendler.maxes.cards.maxesForm(),
        new wendler.maxes.cards.editMaxesList(),
        new wendler.maxes.cards.editLiftPanel(),
        new wendler.maxes.cards.addLiftPanel()
    ]
});