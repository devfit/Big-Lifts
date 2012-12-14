"use strict";
Ext.ns('biglifts.views', 'biglifts.liftSchedule');

biglifts.liftSchedule.currentShowingMax = -1;
biglifts.liftSchedule.currentLiftProperty = null;
biglifts.liftSchedule.currentWeek = 1;

Ext.define('biglifts.views.LiftSchedule', {
    extend: 'Ext.Panel',
    config: {
        id: 'lift-schedule',
        title: 'Lift!',
        iconCls: 'icnBarbell',
        layout: 'card',
        listeners: {
            initialize: function () {
                this.add([
                    biglifts.views.liftSchedule.liftSelector,
                    biglifts.views.liftSchedule.liftTemplate,
                    biglifts.views.liftSchedule.LiftsCompletedScreen,
                    biglifts.views.liftSchedule.IncreaseMaxesHelp,
                    biglifts.views.liftSchedule.LiftSettings,
                    Ext.create('biglifts.views.templates.CustomWeekEditor'),
                    Ext.create('biglifts.views.EditProgression'),
                    Ext.create('biglifts.views.LiftTracking'),
                    biglifts.views.liftSchedule.RestTimer,
                    {
                        xtype: 'firstlognoteseditor',
                        id: 'first-log-notes-editor'
                    }
                ]);
                this.setActiveItem(0);
            }
        }
    }
});