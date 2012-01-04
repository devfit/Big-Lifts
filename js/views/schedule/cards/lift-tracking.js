"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftTracking');

wendler.controller.liftTracking.returnToLiftTemplate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'right'});
};

wendler.controller.liftTracking.logLift = function (liftName, reps, week, weight, cycle) {
    var existingLogIndex = wendler.stores.LiftLog.findBy(function(m){
        return m.data.cycle === cycle && m.data.week === week && m.data.liftName === liftName;
    });

    if( existingLogIndex > 0 ){
        var existingLog = wendler.stores.LiftLog.getAt(existingLogIndex);
        existingLog.set('reps', reps);
        existingLog.set('weight', weight);
        existingLog.save();
    }
    else{
        var log = Ext.ModelMgr.create({liftName:liftName, reps:reps, week:week, weight:weight, cycle:cycle}, 'LiftLog');
        log.save();
    }
};

wendler.controller.liftTracking.logAndReturnToLiftTemplate = function () {
    var liftProgression = wendler.stores.lifts.LiftProgression.findRecord('set', 6);
    var liftName = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).data.name;
    var expectedReps = liftProgression.data.reps;
    var reps = Ext.getCmp('last-set-reps').getValue();
    var week = wendler.liftSchedule.currentWeek;
    var weight = wendler.liftSchedule.controller.formatLiftWeight(wendler.liftSchedule.currentShowingMax, liftProgression.data.percentage);
    var cycle = wendler.stores.CurrentCycle.first().data.cycle;

    wendler.controller.liftTracking.logLift(liftName, reps, week, weight, cycle);
    wendler.controller.liftTracking.returnToLiftTemplate();
};

wendler.controller.liftTracking.showLiftTracking = function () {
    var lastSetReps = wendler.stores.lifts.LiftProgression.findRecord('set', 6).data.reps;
    Ext.getCmp('last-set-reps').setValue(lastSetReps);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-tracking'), {type:'slide', direction:'left'});
};

wendler.views.liftSchedule.LiftTracking = {
    xtype:'formpanel',
    id:'lift-tracking',
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Log',
            items:[
                {
                    ui:'back',
                    text:'Back',
                    handler:wendler.controller.liftTracking.returnToLiftTemplate
                },
                {xtype:'spacer'},
                {
                    ui:'action',
                    text:'Save',
                    handler:wendler.controller.liftTracking.logAndReturnToLiftTemplate
                }
            ]
        }
    ],
    items:[
        {
            xtype:'fieldset',
            style:'margin-top: 0',
            items:[
                {
                    id:'last-set-reps',
                    xtype:'numberfield',
                    label:'Last set reps'
                }
            ]
        }
    ]
};