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
    wendler.liftSchedule.controller.setupLiftSelector();
    wendler.liftSchedule.controller.updateLiftValues();
};

wendler.views.LiftSchedule = Ext.extend(Ext.Panel, {
    id:'lift-schedule',
    title:'5/3/1',
    iconCls:'icnBarbell',
    layout:'card',
    cardSwitchAnimation:'slide',
    activeItem:0,
    listeners:{
        beforeshow:wendler.liftSchedule.controller.setupLiftSchedule,
        afterlayout:wendler.liftSchedule.controller.setupLiftSchedule
    },
    items:[wendler.views.liftSchedule.liftSelector, wendler.views.liftSchedule.liftTemplate,
        wendler.views.liftSchedule.LiftsCompletedScreen, wendler.views.liftSchedule.IncreaseMaxesHelp,
        wendler.views.liftSchedule.LiftSettings, wendler.views.EditLiftPercentages, wendler.views.EditPercentage,
        wendler.views.liftSchedule.LiftTracking,
        new wendler.views.log.cards.NotesEditor({
            id:'first-log-notes-editor',
            _returnCallback:wendler.controller.liftTracking.returnFromEditNotes
        })
    ]
});