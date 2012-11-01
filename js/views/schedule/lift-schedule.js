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
        listeners:{
            show:biglifts.liftSchedule.liftSelector.setupLiftSelector,
            painted:function () {
                this.add([biglifts.views.liftSchedule.liftSelector,
                    biglifts.views.liftSchedule.liftTemplate,
                    biglifts.views.liftSchedule.LiftsCompletedScreen,
                    biglifts.views.liftSchedule.IncreaseMaxesHelp,
                    biglifts.views.liftSchedule.LiftSettings,
                    biglifts.views.EditLiftPercentages,
                    biglifts.views.EditProgression,
                    biglifts.views.liftSchedule.LiftTracking,
                    biglifts.views.liftSchedule.RestTimer,
                    {
                        xtype:'firstlognoteseditor',
                        id:'first-log-notes-editor'
                    }]);

                this.setActiveItem(0);
            },
            activeitemchange:biglifts.liftSchedule.liftSelector.setupLiftSelector
        }
    }
});