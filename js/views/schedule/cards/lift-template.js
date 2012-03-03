"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.liftSchedule.controller');

wendler.liftSchedule.controller.formatLiftWeight = function (max, percentage) {
    var settings = wendler.stores.Settings.first();
    var trainingMaxPercentage = wendler.stores.Settings.first().data['training-max-percentage'] / 100.0;
    var trainingMaxModifier = settings.get('use-training-max') == 1 ? trainingMaxPercentage : 1.0;

    var unroundedWeight = max * percentage * trainingMaxModifier / 100.0;
    var roundingValue = wendler.stores.Settings.first().data['rounding-value'];
    var roundingType = wendler.stores.Settings.first().data['rounding-type'];
    return util.roundNumber(unroundedWeight, roundingValue, roundingType);
};

wendler.liftSchedule.controller.getLastRepsModifier = function (values) {
    return (values.set === 6 && values.week !== 4) ? 'last' : '';
};

wendler.liftSchedule.controller.updateLiftValues = function () {
    if (Ext.getCmp('lift-template')._hasBeenRendered) {
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
    }
};

wendler.liftSchedule.controller.returnToLiftSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

wendler.liftSchedule.controller.markLiftCompleted = function () {
    wendler.controller.liftTracking.showLiftTracking();
};

wendler.liftSchedule.controller.persistLiftCompletion = function () {
    var liftCompletion = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty, wendler.liftSchedule.currentWeek);
    liftCompletion.set('completed', true);
    liftCompletion.save();
    wendler.stores.lifts.LiftCompletion.sync();
};

wendler.views.liftSchedule.liftTemplate = {
    xtype:'panel',
    id:'lift-template',
    layout:'fit',
    items:[
        {
            id:'lift-template-list',
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            itemCls:'lift-row',
            itemTpl:'<p><span class="reps {[wendler.liftSchedule.controller.getLastRepsModifier(values)]}">{reps}</span> ' +
                '<span>{[wendler.liftSchedule.controller.formatLiftWeight(wendler.liftSchedule.currentShowingMax,values.percentage)]}</span>' +
                '<span class="percentage">{percentage}%</span></p>'
        }
    ],
    _hasBeenRendered:false,
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.controller.returnToLiftSelect);
        },
        afterlayout:function () {
            this._hasBeenRendered = true;
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
                    id:'mark-lift-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:wendler.liftSchedule.controller.markLiftCompleted
                }
            ]
        }
    ]
}
;
