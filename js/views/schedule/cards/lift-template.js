"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.liftSchedule.controller');

wendler.liftSchedule.controller.formatLiftWeight = function (max, percentage) {
    var settings = wendler.stores.Settings.first();
    var trainingMaxModifier = settings.get('use-training-max') == 1 ? 0.9 : 1.0;

    var unroundedWeight = max * percentage * trainingMaxModifier / 100.0;
    var roundingValue = wendler.stores.Settings.first().data['rounding-value'];
    var roundingType = wendler.stores.Settings.first().data['rounding-type'];
    return util.roundNumber(unroundedWeight, roundingValue, roundingType);
};

wendler.liftSchedule.controller.getRepsModifier = function (values) {
    return values.set === 6 ? '+' : 'x';
};

wendler.liftSchedule.controller.updateLiftValues = function () {
    var showWarmupSets = wendler.stores.Settings.first().data['show-warmup-sets'];

    var liftRecord = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty);
    if (liftRecord !== null) {
        wendler.liftSchedule.currentShowingMax = liftRecord.data.max;
        wendler.stores.lifts.LiftProgression.clearFilter();
        wendler.stores.lifts.LiftProgression.filter("week", wendler.liftSchedule.currentWeek);

        if (!showWarmupSets) {
            wendler.stores.lifts.LiftProgression.filterBy(function (record) {
                return record.data.set > 3 && record.data.week == wendler.liftSchedule.currentWeek;
            });
        }
    }
    else {
        if (Ext.getCmp('lift-schedule').getActiveItem() !== Ext.getCmp('lift-selector')) {
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
        }
    }
};
wendler.stores.Settings.addListener('update', wendler.liftSchedule.controller.updateLiftValues);

wendler.liftSchedule.controller.setupLiftCompleteToggle = function () {
    var completed = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty,
        wendler.liftSchedule.currentWeek).get('completed');
    wendler.liftSchedule.controller.showCorrectLiftCompleteButton(completed);
};

wendler.liftSchedule.controller.returnToLiftSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

wendler.liftSchedule.controller.markLiftCompleted = function () {
    wendler.liftSchedule.controller.persistLiftCompletion(true);
    wendler.controller.liftTracking.showLiftTracking();
};

wendler.liftSchedule.controller.unmarkLiftCompleted = function () {
    wendler.liftSchedule.controller.persistLiftCompletion(false);
};

wendler.liftSchedule.controller.persistLiftCompletion = function (completed) {
    var liftCompletion = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty, wendler.liftSchedule.currentWeek);
    liftCompletion.set('completed', completed);
    liftCompletion.save();

    wendler.liftSchedule.controller.showCorrectLiftCompleteButton(completed);
    wendler.liftSchedule.controller.liftCompletionChange();
};

wendler.liftSchedule.controller.showCorrectLiftCompleteButton = function (completed) {
    var unmarkButton = Ext.getCmp('unmark-lift-completed-button');
    var markButton = Ext.getCmp('mark-lift-completed-button');
    if (completed) {
        unmarkButton.show();
        markButton.hide();
    }
    else {
        markButton.show();
        unmarkButton.hide();
    }
};

wendler.views.liftSchedule.liftTemplate = {
    xtype:'panel',
    id:'lift-template',
    layout:'fit',
    items:[
        {
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            itemCls:'lift-row',
            itemTpl:'<p><span class="reps">{reps}{[wendler.liftSchedule.controller.getRepsModifier(values)]}</span> ' +
                '<span>{[wendler.liftSchedule.controller.formatLiftWeight(wendler.liftSchedule.currentShowingMax,values.percentage)]}</span>' +
                '<span class="percentage">{percentage}%</span></p>'
        }
    ],
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.controller.returnToLiftSelect);
            wendler.liftSchedule.controller.setupLiftCompleteToggle();
        }
    },
    dockedItems:[
        {
            xtype:'toolbar',
            id:'lift-template-toolbar',
            dock:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.controller.returnToLiftSelect
                },
                {xtype:'spacer'},
                {
                    hidden:true,
                    id:'mark-lift-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:wendler.liftSchedule.controller.markLiftCompleted
                },
                {
                    hidden:true,
                    id:'unmark-lift-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'confirm',
                    handler:wendler.liftSchedule.controller.unmarkLiftCompleted
                }
            ]
        }
    ]
}
;
