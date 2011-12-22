"use strict";
Ext.ns('wendler.liftSchedule.controller', 'wendler.liftSchedule.cards');
wendler.liftSchedule.lastActiveTab = null;
wendler.liftSchedule.controller.showLiftsCompletedScreen = function () {
    wendler.liftSchedule.lastActiveTab = Ext.getCmp('lift-schedule').getActiveItem();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lifts-completed'),
        {type:'slide', direction:'down'});
};

wendler.liftSchedule.controller.unmarkAllLifts = function () {
    wendler.stores.lifts.LiftCompletion.each(function (r) {
        r.set('completed', false);
        r.save();
    });

    wendler.liftSchedule.controller.liftCompletionChange();
};

wendler.liftSchedule.controller.closeLiftCompletedScreen = function () {
    if (Ext.getCmp('uncheck-all-lifts-toggle').getValue() === 1) {
        wendler.liftSchedule.controller.unmarkAllLifts();
    }

    Ext.getCmp('lift-schedule').setActiveItem(wendler.liftSchedule.lastActiveTab,
        {type:'slide', direction:'up'});
};

wendler.liftSchedule.cards.LiftsCompletedScreen = {
    id:'lifts-completed',
    xtype:'formpanel',
    items:[
        {
            xtype:'fieldset',
            title:"You have completed a cycle!",
            style:'margin-top: 0',
            items:[
                {
                    id:'uncheck-all-lifts-toggle',
                    xtype:'togglefield',
                    label:'Uncheck all lifts',
                    value:1
                },
//                {
//                    xtype:'togglefield',
//                    label: 'Increase maxes <img style="vertical-align:middle" src="images/question.png"/>',
//                    value: 1
//                },
                {
                    xtype:'button',
                    text:'Done',
                    handler:wendler.liftSchedule.controller.closeLiftCompletedScreen
                }
            ]
        },
    ]
};