"use strict";
Ext.ns('biglifts.views', 'biglifts.liftSchedule');

biglifts.liftSchedule.currentShowingMax = -1;
biglifts.liftSchedule.currentLiftProperty = null;
biglifts.liftSchedule.currentWeek = 1;

biglifts.stores.lifts.LiftCompletion.addListener('update', biglifts.liftSchedule.liftSelector.setupListDoneIcons);

Ext.define('biglifts.views.LiftSchedule', {
    extend:'Ext.Panel',
    config:{
        id:'lift-schedule',
        title:'Lift!',
        iconCls:'icnBarbell',
        layout:'card',
        activeItem:0,
        items:[
            biglifts.views.liftSchedule.liftSelector,
            biglifts.views.liftSchedule.liftTemplate,
            biglifts.views.liftSchedule.LiftsCompletedScreen,
            biglifts.views.liftSchedule.IncreaseMaxesHelp,
            biglifts.views.liftSchedule.LiftSettings,
            biglifts.views.EditLiftPercentages,
            biglifts.views.EditProgression,
            biglifts.views.liftSchedule.LiftTracking,
            biglifts.views.liftSchedule.RestTimer,
            biglifts.views.liftSchedule.assistance.AssistanceChooser,
            biglifts.views.liftSchedule.assistance.BoringButBig,
            biglifts.views.liftSchedule.assistance.BoringButBigMovementEditor,
            biglifts.views.liftSchedule.assistance.Bodyweight,
            biglifts.views.liftSchedule.assistance.BodyweightMovementEditor,
            biglifts.views.liftSchedule.assistance.Custom,
            biglifts.views.liftSchedule.assistance.CustomMovementEditor,
            {
                xtype:'firstlognoteseditor',
                id:'first-log-notes-editor'
            },
            {
                xtype:'boringbutbignotes',
                id:'boring-but-big-notes'
            }
        ],
        listeners:{
            show:biglifts.liftSchedule.liftSelector.setupLiftSelector,
            activeitemchange:biglifts.liftSchedule.liftSelector.setupLiftSelector
        }
    }
});