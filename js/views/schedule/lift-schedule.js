"use strict";
Ext.ns('biglifts.views', 'biglifts.liftSchedule');

biglifts.liftSchedule.currentShowingMax = -1;
biglifts.liftSchedule.currentLiftProperty = null;
biglifts.liftSchedule.currentWeek = 1;

Ext.define('biglifts.views.LiftSchedule', {
    extend:'Ext.Panel',
    config:{
        id:'lift-schedule',
        title:'Lift!',
        iconCls:'icnBarbell',
        layout:'card',
        listeners:{
            initialize:function () {
                this.add(biglifts.views.liftSchedule.liftSelector);
                this.setActiveItem(0);
            },
            painted:function () {
                if (!this._painted) {
                    this._painted = true;

                    this.add([
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
                        }
                    ]);
                }
            }
        }
    }
});