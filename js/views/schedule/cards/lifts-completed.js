"use strict";
Ext.ns('wendler.liftSchedule.controller', 'wendler.views.liftSchedule');
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

    if (Ext.getCmp('increase-maxes-toggle').getValue() === 1) {
        wendler.liftSchedule.controller.increaseMaxesByCycleIncrease();
    }

    Ext.getCmp('lift-schedule').setActiveItem(wendler.liftSchedule.lastActiveTab,
        {type:'slide', direction:'up'});
};

wendler.liftSchedule.controller.increaseMaxesByCycleIncrease = function () {
    wendler.stores.lifts.Lifts.each(function (r) {
        var max = r.data.max;
        var cycleIncrease = r.data.cycleIncrease;
        r.set('max', max + cycleIncrease);
        r.save();
    });

    wendler.stores.lifts.Lifts.sync();
};

wendler.views.liftSchedule.LiftsCompletedScreen = {
    id:'lifts-completed',
    xtype:'formpanel',
    listeners:{
        afterlayout:function () {
            Ext.get('increase-maxes-help-image').addListener('click',
                wendler.liftSchedule.controller.showIncreaseMaxesHelpScreen);
        },
        beforeshow:function () {
            wendler.navigation.backFunction = wendler.liftSchedule.controller.closeLiftCompletedScreen;
        }
    },
    items:[
        {
            xtype:'fieldset',
            title:"You have completed a cycle!",
            style:'margin-top: 0',
            defaults:{
                labelWidth:'66%'
            },
            items:[
                {
                    id:'uncheck-all-lifts-toggle',
                    xtype:'togglefield',
                    label:'Uncheck all lifts',
                    value:1
                },
                {
                    id:'increase-maxes-toggle',
                    xtype:'togglefield',
                    label:'Increase maxes <img id="increase-maxes-help-image" style="float:right" src="images/question.png"/>',
                    value:1
                },
                {
                    id:'lifts-complete-done-button',
                    xtype:'button',
                    text:'Done',
                    handler:wendler.liftSchedule.controller.closeLiftCompletedScreen
                }
            ]
        }
    ]
};