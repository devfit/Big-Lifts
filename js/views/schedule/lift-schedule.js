"use strict";
Ext.ns('wendler.views', 'wendler.liftSchedule.controller');

wendler.liftSchedule.currentShowingMax = -1;
wendler.liftSchedule.currentLiftProperty = null;
wendler.liftSchedule.currentWeek = 1;

wendler.liftSchedule.controller.liftCompletionChange = function () {
    wendler.liftSchedule.controller.setupListDoneIcons();
};
wendler.stores.lifts.LiftCompletion.addListener('update', wendler.liftSchedule.controller.liftCompletionChange);

wendler.liftSchedule.controller.setupLiftSchedule = function () {
    wendler.data.disasterRecovery();
    wendler.liftSchedule.controller.setupLiftSelector();
};

Ext.define('Wendler.views.LiftSchedule', {
    extend:'Ext.Panel',
    config:{
        id:'lift-schedule',
        title:'5/3/1',
        iconCls:'icnBarbell',
        layout:'card',
        activeItem:0,
        items:[
            wendler.views.liftSchedule.liftSelector, wendler.views.liftSchedule.liftTemplate,
            wendler.views.liftSchedule.LiftsCompletedScreen, wendler.views.liftSchedule.IncreaseMaxesHelp,
            wendler.views.liftSchedule.LiftSettings, wendler.views.EditLiftPercentages, wendler.views.EditPercentage,
            wendler.views.liftSchedule.LiftTracking,
            {
                xtype:'firstlognoteseditor',
                id:'first-log-notes-editor'
            }
        ],
        listeners:{
            show:wendler.liftSchedule.controller.setupLiftSchedule,
            activeitemchange:wendler.liftSchedule.controller.setupLiftSchedule
        }
    }
});