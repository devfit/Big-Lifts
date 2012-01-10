"use strict";
Ext.ns('wendler.views', 'wendler.liftSchedule.controller');

wendler.liftSchedule.currentShowingMax = -1;
wendler.liftSchedule.currentLiftProperty = null;
wendler.liftSchedule.currentWeek = 1;

wendler.liftSchedule.controller.liftCompletionChange = function () {
    wendler.liftSchedule.controller.setupListDoneIcons();
    wendler.liftSchedule.controller.setupWeekMarkLiftsButton();

    if (wendler.liftSchedule.controller.allLiftsAreCompleted()) {
        wendler.liftSchedule.controller.showLiftsCompletedScreen();
    }
};

wendler.liftSchedule.controller.allLiftsAreCompleted = function () {
    var completedUniques = wendler.stores.lifts.LiftCompletion.collect('completed');
    return completedUniques.length === 1 && completedUniques[0] === true;
};

wendler.views.LiftSchedule = Ext.extend(Ext.Panel, {
    id:'lift-schedule',
    title:'5/3/1',
    iconCls:'time',
    layout:'card',
    cardSwitchAnimation:'slide',
    activeItem: 0,
    items:[wendler.views.liftSchedule.liftSelector, wendler.views.liftSchedule.liftTemplate,
        wendler.views.liftSchedule.LiftsCompletedScreen, wendler.views.liftSchedule.IncreaseMaxesHelp,
        wendler.views.liftSchedule.LiftSettings, wendler.views.EditLiftPercentages, wendler.views.EditPercentage, wendler.views.liftSchedule.LiftTracking
    ]
});