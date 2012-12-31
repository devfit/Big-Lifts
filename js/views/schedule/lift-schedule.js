"use strict";
Ext.ns('biglifts.views', 'biglifts.liftSchedule');

biglifts.liftSchedule.currentShowingMax = -1;
biglifts.liftSchedule.currentLiftProperty = null;
biglifts.liftSchedule.currentWeek = 1;

Ext.define('biglifts.views.LiftSchedule', {
    extend: 'Ext.Panel',
    getRestTimer: function () {
        return this.restTimer;
    },
    config: {
        id: 'lift-schedule',
        title: 'Lift!',
        iconCls: 'icnBarbell',
        layout: 'card',
        listeners: {
            initialize: function () {
                this.add([
                    Ext.create('biglifts.views.LiftSelector'),
                    biglifts.views.liftSchedule.liftTemplate,
                    biglifts.views.liftSchedule.LiftsCompletedScreen,
                    biglifts.views.liftSchedule.IncreaseMaxesHelp,
                    biglifts.views.liftSchedule.LiftSettings,
                    Ext.create('biglifts.views.templates.CustomWeekEditor'),
                    Ext.create('biglifts.views.EditProgression'),
                    Ext.create('biglifts.views.LiftTracking')]);

                this.restTimer = this.add(Ext.create('biglifts.views.RestTimer'));

                this.add({
                    xtype: 'firstlognoteseditor',
                    id: 'first-log-notes-editor'
                });
                this.setActiveItem(0);
            }
        }
    }
});