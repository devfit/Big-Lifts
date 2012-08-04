"use strict";
Ext.ns('wendler.views', 'wendler.liftSchedule');

wendler.liftSchedule.currentShowingMax = -1;
wendler.liftSchedule.currentLiftProperty = null;
wendler.liftSchedule.currentWeek = 1;

wendler.liftSchedule.liftCompletionChange = function () {
    wendler.liftSchedule.liftSelector.setupListDoneIcons();
};
wendler.stores.lifts.LiftCompletion.addListener('update', wendler.liftSchedule.liftCompletionChange);

Ext.define('Wendler.views.LiftSchedule', {
    extend:'Ext.Panel',
    config:{
        id:'lift-schedule',
        title:'5/3/1',
        iconCls:'icnBarbell',
        layout:'card',
        activeItem:0,
        items:[
            wendler.views.liftSchedule.liftSelector,
            wendler.views.liftSchedule.liftTemplate,
            wendler.views.liftSchedule.LiftsCompletedScreen,
            wendler.views.liftSchedule.IncreaseMaxesHelp,
            wendler.views.liftSchedule.LiftSettings,
            wendler.views.EditLiftPercentages,
            wendler.views.EditPercentage,
            wendler.views.liftSchedule.LiftTracking,
            wendler.views.liftSchedule.RestTimer,
            wendler.views.liftSchedule.assistance.AssistanceChooser,
            wendler.views.liftSchedule.assistance.BoringButBig,

            {
                xtype:'firstlognoteseditor',
                id:'first-log-notes-editor'
            }
        ],
        listeners:{
            show:wendler.liftSchedule.liftSelector.setupLiftSelector,
            activeitemchange:wendler.liftSchedule.liftSelector.setupLiftSelector
        }
    }
});