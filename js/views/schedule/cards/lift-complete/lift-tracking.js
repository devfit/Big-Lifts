"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftTracking');

wendler.controller.liftTracking.logLift = function (data) {
    wendler.stores.LiftLog.add(
        {
            liftName:data.liftName,
            reps:data.reps,
            week:data.week,
            weight:data.weight,
            cycle:data.cycle,
            date:new Date(),
            units:wendler.stores.Settings.first().data.units
        });

    wendler.stores.LiftLog.sync();
};

wendler.controller.liftTracking.logAndShowTracking = function () {
    var liftProgression = wendler.stores.lifts.LiftProgression.findRecord('set', 6);
    var liftName = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).data.name;
    var expectedReps = liftProgression.data.reps;
    var reps = Ext.getCmp('last-set-reps').getValue();
    var week = wendler.liftSchedule.currentWeek;
    var weight = wendler.liftSchedule.controller.formatLiftWeight(wendler.liftSchedule.currentShowingMax, liftProgression.data.percentage);
    var cycle = wendler.stores.CurrentCycle.first().data.cycle;
    var units = wendler.stores.Settings.first().data.units;

    wendler.controller.liftTracking.logLift({liftName:liftName, reps:reps, week:week, weight:weight, cycle:cycle, units:units, expectedReps:expectedReps});
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
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
                {xtype:'spacer'},
                {
                    id:'log-lift-save-button',
                    ui:'confirm',
                    text:'Save',
                    handler:wendler.controller.liftTracking.logAndShowTracking
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