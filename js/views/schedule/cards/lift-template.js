"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.liftSchedule.liftTemplate');

wendler.liftSchedule.liftTemplate.showLiftTracking = function () {
    var liftProgression = wendler.stores.lifts.LiftProgression.findRecord('set', 6).data;
    var reps = liftProgression.reps;
    var weight = wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax, liftProgression.percentage);
    var formValues = {
        'reps':reps,
        'weight':weight,
        'estimated-one-rep-max':util.formulas.estimateOneRepMax(weight, reps),
        'notes':''
    };

    Ext.getCmp('lift-tracking').setValues(formValues);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-tracking'), {type:'slide', direction:'left'});
};


wendler.liftSchedule.liftTemplate.formatLiftWeight = function (max, percentage) {
    var settings = wendler.stores.Settings.first();
    var trainingMaxPercentage = wendler.stores.Settings.first().data['trainingMaxPercentage'] / 100.0;
    var trainingMaxModifier = settings.get('useTrainingMax') == 1 ? trainingMaxPercentage : 1.0;

    var unroundedWeight = max * percentage * trainingMaxModifier / 100.0;
    var roundingValue = wendler.stores.Settings.first().data['roundingValue'];
    var roundingType = wendler.stores.Settings.first().data['roundingType'];
    return util.roundNumber(unroundedWeight, roundingValue, roundingType);
};

wendler.liftSchedule.liftTemplate.getAllPlatePairs = function () {
    var platePairs = {};
    wendler.stores.Plates.each(function (r) {
        var weight = r.get('weight');
        platePairs[weight] = parseInt(r.get('count') / 2);
    });

    return platePairs;
};

wendler.liftSchedule.liftTemplate.getPlateList = function (weight) {
    var barWeightConfig = wendler.stores.BarWeight.first();
    var barWeight = barWeightConfig.get('weight');

    var allPlatePairs = wendler.liftSchedule.liftTemplate.getAllPlatePairs();

    var plates = util.formulas.buildPlateListForWeight(weight, barWeight, allPlatePairs);

    if (plates.length === 0) {
        return ""
    }

    return "[" + plates.join(',') + "]";
};

wendler.liftSchedule.liftTemplate.getLiftRowClass = function (values) {
    var className = '';

    if (values.set === 6 && values.week !== 4) {
        className += 'amrap '
    }

    if (values.set <= 3) {
        className += 'warmup'
    }

    return className;
};

wendler.liftSchedule.liftTemplate.updateLiftValues = function () {
    var showWarmupSets = wendler.stores.Settings.first().data['showWarmupSets'];

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

        wendler.liftSchedule.liftTemplate.setupBestOneRepMax();
    }
    else {
        if (Ext.getCmp('lift-schedule').getActiveItem() !== Ext.getCmp('lift-selector')) {
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
        }
    }
};

wendler.liftSchedule.liftTemplate.setupBestOneRepMax = function () {
    if (wendler.liftSchedule.currentWeek === 4) {
        Ext.getCmp('reps-to-beat-toolbar').hide();
        return;
    }

    var liftRecord = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty);
    var bestLogRecordOneRepEstimate = null;
    wendler.stores.LiftLog.each(function (r) {
        if (r.get('liftName') === liftRecord.get('name')) {
            var weight = parseFloat(r.get('weight'));
            var reps = r.get('reps');
            var estimateOneRep = util.formulas.estimateOneRepMax(weight, reps);
            if (_.isNull(bestLogRecordOneRepEstimate)) {
                bestLogRecordOneRepEstimate = estimateOneRep;
            }
            else if (estimateOneRep > bestLogRecordOneRepEstimate) {
                bestLogRecordOneRepEstimate = estimateOneRep;
            }
        }
    });

    if (!_.isNull(bestLogRecordOneRepEstimate)) {
        var lastSetMax = wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax,
            wendler.stores.lifts.LiftProgression.last().get('percentage'));

        Ext.get('last-one-rep-estimate').setHtml(bestLogRecordOneRepEstimate);
        Ext.get('reps-needed-to-beat-last-estimate').setHtml(util.formulas.calculateRepsToBeatWeight(bestLogRecordOneRepEstimate, lastSetMax));
        Ext.getCmp('reps-to-beat-toolbar').show();
    }
    else {
        Ext.getCmp('reps-to-beat-toolbar').hide();
    }
};

wendler.liftSchedule.liftTemplate.selectThreeLiftsFrom = function (startIndex) {
    var end = startIndex + 2;
    var lastIndex = wendler.stores.lifts.LiftProgression.getCount() - 1;
    if (end > lastIndex) {
        end = lastIndex;
    }
    if (startIndex > lastIndex - 2) {
        startIndex = lastIndex - 2;
    }

    Ext.getCmp('lift-template-list').selectRange(startIndex, end);
};

wendler.liftSchedule.liftTemplate.returnToLiftSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

wendler.liftSchedule.liftTemplate.markLiftCompleted = function () {
    wendler.liftSchedule.liftTemplate.showLiftTracking();
};

wendler.liftSchedule.liftTemplate.showRestTimer = function () {
    wendler.restTimer.backLocation = 'lift-template';
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('rest-timer'), {type:'slide', direction:'right'});
};

wendler.liftSchedule.liftTemplate.persistLiftCompletion = function () {
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
            xtype:'toolbar',
            id:'lift-template-toolbar',
            docked:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.liftTemplate.returnToLiftSelect
                },
                {xtype:'spacer'},
                {
                    style:'z-index: 11',
                    id:'rest-timer-button',
                    cls:'rest-timer-button',
                    iconCls:'clock',
                    iconMask:true,
                    ui:'decline',
                    handler:wendler.liftSchedule.liftTemplate.showRestTimer
                },
                {
                    style:'z-index: 11',
                    id:'mark-lift-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:wendler.liftSchedule.liftTemplate.markLiftCompleted
                }
            ]
        },
        {
            xtype:'toolbar',
            id:'reps-to-beat-toolbar',
            ui:'light',
            hidden:true,
            docked:'top',
            items:[
                {
                    id:'reps-to-beat-panel',
                    xtype:'panel',
                    width:'100%',
                    html:'<table class="reps-to-beat-text"><tr>' +
                        '<td width="40%">' +
                        'Best: ~<span id="last-one-rep-estimate">000</span>' +
                        '</td>' +
                        '<td width="60%" style="text-align:right">' +
                        ' <span>Reps to beat: <span id="reps-needed-to-beat-last-estimate">00</span></span>' +
                        '</td>' +
                        '</tr></table>'
                }
            ]
        },
        {
            id:'lift-template-list',
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            selectedCls:'lift-row-selected',
            itemCls:'lift-row',
            listeners:{
                itemtap:function (c, index) {
                    wendler.liftSchedule.liftTemplate.selectThreeLiftsFrom(index);
                }
            },
            itemTpl:'<p class="reps-weight {[wendler.liftSchedule.liftTemplate.getLiftRowClass (values)]}"><span class="reps">{reps}</span> ' +
                '<span>{[wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax,values.percentage)]}</span>' +
                '<span class="percentage"><span class="warmup-indicator">[warm]</span> {percentage}%</span></p>' +
                (wendler.toggles.BarLoading ?
                    '<p class="bar-loader-breakdown">{[wendler.liftSchedule.liftTemplate.getPlateList(' +
                        'wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax,values.percentage)' +
                        ')]}</p>' : '')
        }
    ],
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.liftTemplate.returnToLiftSelect);
            wendler.liftSchedule.liftTemplate.updateLiftValues();
            wendler.liftSchedule.liftTemplate.selectThreeLiftsFrom(0);
        }
    }
};
