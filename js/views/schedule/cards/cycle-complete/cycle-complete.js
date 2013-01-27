"use strict";
Ext.ns('biglifts.liftSchedule.cycleComplete', 'biglifts.views.liftSchedule');

biglifts.liftSchedule.cycleComplete.unmarkAllLifts = function () {
    biglifts.stores.lifts.LiftCompletion.each(function (r) {
        r.set('completed', false);
    });

    biglifts.stores.lifts.LiftCompletion.sync();
};

biglifts.liftSchedule.cycleComplete.saveAndCloseLiftCompletedScreen = function () {
    var currentCycle = biglifts.stores.CurrentCycle.first();

    var newCycle = Ext.getCmp('cycle-complete').getValues()['new-cycle'];
    currentCycle.set('cycle', newCycle);
    biglifts.stores.CurrentCycle.sync();

    biglifts.liftSchedule.cycleComplete.unmarkAllLifts();

    if (Ext.getCmp('increase-maxes-toggle').getValue() === 1) {
        biglifts.liftSchedule.increaseMaxesByCycleIncrease();
    }

    biglifts.liftSchedule.cycleComplete.closeLiftCompletedScreen();
};

biglifts.liftSchedule.cycleComplete.closeLiftCompletedScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(biglifts.liftSchedule.lastActiveTab);
};

biglifts.liftSchedule.increaseMaxesByCycleIncrease = function () {
    biglifts.stores.lifts.Lifts.each(function (r) {
        var max = r.data.max;
        var cycleIncrease = r.data.cycleIncrease;
        r.set('max', max + cycleIncrease);
    });

    biglifts.stores.lifts.Lifts.sync();
};

biglifts.liftSchedule.cycleComplete.setNextCycleDefault = function () {
    var formValues = Ext.getCmp('cycle-complete').getValues();
    var currentCycle = biglifts.stores.CurrentCycle.first();
    formValues['new-cycle'] = currentCycle.data.cycle + 1;
    Ext.getCmp('cycle-complete').setValues(formValues);
};

biglifts.liftSchedule.cycleComplete.showIncreaseMaxesHelpScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('increase-maxes-help'));
};

biglifts.views.liftSchedule.LiftsCompletedScreen = {
    id:'cycle-complete',
    xtype:'formpanel',
    listeners:{
        initialize:function () {
            this.add({
                docked:'top',
                xtype:'toolbar',
                title:'Finish Cycle?',
                items:[
                    {
                        id:'complete-cycle-back-button',
                        xtype:'button',
                        text:'Cancel',
                        ui:'back',
                        handler:biglifts.liftSchedule.cycleComplete.closeLiftCompletedScreen
                    }
                ]
            });

            this.cycleFieldset = this.add({
                xtype:'fieldset',
                style:'margin-top: 0',
                cls:'fieldset-no-margin',
                defaults:{
                    labelWidth:'66%'
                }
            });

            this.cycleFieldset.add({
                name:'new-cycle',
                xtype:'numberfield',
                label:'New cycle'
            });

            this.increaseMaxesToggle = this.cycleFieldset.add({
                id:'increase-maxes-toggle',
                xtype:'togglefield',
                label:'Increase maxes <img class="help-image" style="float:right" src="images/question.png"/>',
                value:1
            });

            this.cycleFieldset.add({
                id:'lifts-complete-done-button',
                xtype:'button',
                text:'Done',
                handler:biglifts.liftSchedule.cycleComplete.saveAndCloseLiftCompletedScreen
            });
        },
        painted:function () {
            if (!this._painted) {
                this._painted = true;
                this.increaseMaxesToggle.element.down('img').addListener('tap',
                    biglifts.liftSchedule.cycleComplete.showIncreaseMaxesHelpScreen);
            }
            biglifts.liftSchedule.cycleComplete.setNextCycleDefault();
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.cycleComplete.closeLiftCompletedScreen);
        }
    }
};