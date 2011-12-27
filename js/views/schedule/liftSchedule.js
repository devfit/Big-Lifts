"use strict";
Ext.ns('wendler.views', 'wendler.liftSchedule.controller');

wendler.liftSchedule.currentShowingMax = -1;
wendler.liftSchedule.currentLiftProperty = null;
wendler.liftSchedule.currentWeek = 1;

wendler.liftSchedule.controller.updateLiftValues = function () {
    var showWarmupSets = wendler.stores.Settings.first().data['show-warmup-sets'];

    if (wendler.liftSchedule.currentLiftProperty) {
        wendler.liftSchedule.currentShowingMax = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).data.max;
        wendler.stores.lifts.LiftProgression.clearFilter();
        wendler.stores.lifts.LiftProgression.filter("week", wendler.liftSchedule.currentWeek);

        if (!showWarmupSets) {
            wendler.stores.lifts.LiftProgression.filterBy(function (record) {
                return record.data.set > 3 && record.data.week == wendler.liftSchedule.currentWeek;
            });
        }
    }
};

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
    listeners:{
        afterlayout:wendler.liftSchedule.controller.setupLiftSelector,
        beforeshow:wendler.liftSchedule.controller.updateLiftValues
    },
    items:[wendler.views.liftSchedule.liftSelector, wendler.views.liftSchedule.liftTemplate,
        wendler.views.liftSchedule.LiftsCompletedScreen, wendler.views.liftSchedule.IncreaseMaxesHelp ]
});