"use strict";
Ext.ns('wendler.liftSchedule.controller', 'wendler.views.liftSchedule');

wendler.liftSchedule.controller.unmarkAllLifts = function () {
    wendler.stores.lifts.LiftCompletion.each(function (r) {
        r.set('completed', false);
        r.save();
    });

    wendler.liftSchedule.liftCompletionChange();
};

wendler.liftSchedule.controller.saveAndCloseLiftCompletedScreen = function () {
    var currentCycle = wendler.stores.CurrentCycle.first();

    var newCycle = Ext.getCmp('lifts-completed').getValues()['new-cycle'];
    currentCycle.set('cycle', newCycle);
    currentCycle.save();
    wendler.stores.CurrentCycle.sync();

    wendler.liftSchedule.controller.unmarkAllLifts();

    if (Ext.getCmp('increase-maxes-toggle').getValue() === 1) {
        wendler.liftSchedule.increaseMaxesByCycleIncrease();
    }

    wendler.liftSchedule.controller.closeLiftCompletedScreen();
};

wendler.liftSchedule.controller.closeLiftCompletedScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(wendler.liftSchedule.lastActiveTab,
        {type:'slide', direction:'up'});
};

wendler.liftSchedule.increaseMaxesByCycleIncrease = function () {
    wendler.stores.lifts.Lifts.each(function (r) {
        var max = r.data.max;
        var cycleIncrease = r.data.cycleIncrease;
        r.set('max', max + cycleIncrease);
        r.save();
    });

    wendler.stores.lifts.Lifts.sync();
};

wendler.liftSchedule.controller.setNextCycleDefault = function () {
    var formValues = Ext.getCmp('lifts-completed').getValues();
    var currentCycle = wendler.stores.CurrentCycle.first();
    formValues['new-cycle'] = currentCycle.data.cycle + 1;
    Ext.getCmp('lifts-completed').setValues(formValues);
};

wendler.views.liftSchedule.LiftsCompletedScreen = {
    id:'lifts-completed',
    xtype:'formpanel',
    listeners:{
        show:function () {
            Ext.get('increase-maxes-help-image').addListener('tap',
                wendler.liftSchedule.controller.showIncreaseMaxesHelpScreen);
            wendler.liftSchedule.controller.setNextCycleDefault();
            wendler.navigation.setBackFunction(wendler.liftSchedule.controller.closeLiftCompletedScreen);
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Finish Cycle?',
            items:[
                {
                    id:'complete-cycle-back-button',
                    xtype:'button',
                    text:'Cancel',
                    ui:'back',
                    handler:wendler.liftSchedule.controller.closeLiftCompletedScreen
                }
            ]
        },
        {
            xtype:'fieldset',
            style:'margin-top: 0',
            cls:'fieldset-no-margin',
            defaults:{
                labelWidth:'66%'
            },
            items:[
                {
                    name:'new-cycle',
                    xtype:'numberfield',
                    label:'New cycle'
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
                    handler:wendler.liftSchedule.controller.saveAndCloseLiftCompletedScreen
                }
            ]
        }
    ]
};