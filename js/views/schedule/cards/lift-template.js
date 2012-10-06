"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.liftSchedule.liftTemplate');

wendler.liftSchedule.liftTemplate.showLiftTracking = function () {
    var liftProgression = wendler.stores.lifts.LiftProgression.findRecord('set', 6).data;
    var reps = liftProgression.reps;
    var weight = wendler.weight.format(wendler.weight.lowerMaxToTrainingMax(wendler.liftSchedule.currentShowingMax), liftProgression.percentage);
    var formValues = {
        'reps':reps,
        'weight':weight,
        'estimated-one-rep-max':util.formulas.estimateOneRepMax(weight, reps),
        'notes':''
    };

    Ext.getCmp('lift-tracking').setValues(formValues);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-tracking'), {type:'slide', direction:'left'});
};


wendler.liftSchedule.liftTemplate.formatLiftWeight = function (values) {
    var max = null;
    if (values.goalLift) {
        max = wendler.stores.lifts.MeetGoals.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).get('weight');
    }
    else {
        max = wendler.weight.lowerMaxToTrainingMax(wendler.liftSchedule.currentShowingMax);
    }
    return wendler.weight.format(max, values.percentage);
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
    var barWeight = wendler.stores.BarWeight.first().get('weight');

    var allPlatePairs = wendler.liftSchedule.liftTemplate.getAllPlatePairs();

    var plates = util.formulas.buildPlateListForWeight(weight, barWeight, allPlatePairs);
    var totalWeight = _.reduce(plates, function (sum, plate) {
        return sum + plate * 2;
    }, 0) + barWeight;

    var plateString = plates.length === 0 ? "" : "[" + plates.join(',') + "]";
    if (totalWeight !== barWeight) {
        plateString = "<span class='invalid-plates'>" + plateString + " need plates" + "</span>";
    }

    return plateString;
};

wendler.liftSchedule.liftTemplate.getLiftRowClass = function (values) {
    return (values.amrap ? 'amrap ' : '') + (values.warmup ? 'warmup ' : '');
};

wendler.liftSchedule.liftTemplate.updateLiftValues = function () {
    if (!wendler.liftSchedule.currentLiftProperty) {
        return;
    }

    var liftRecord = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty);
    if (liftRecord === null) {
        if (Ext.getCmp('lift-schedule').getActiveItem() !== Ext.getCmp('lift-selector')) {
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
        }
        return;
    }

    var settings = wendler.stores.Settings.first();
    if (settings) {
        var showWarmupSets = settings.get('showWarmupSets');
        wendler.liftSchedule.currentShowingMax = liftRecord.data.max;
        wendler.stores.lifts.LiftProgression.clearFilter();
        wendler.stores.lifts.LiftProgression.filter("week", wendler.liftSchedule.currentWeek);

        if (!showWarmupSets) {
            wendler.stores.lifts.LiftProgression.filterBy(function (record) {
                return !record.get('warmup') && record.data.week == wendler.liftSchedule.currentWeek;
            });
        }

        wendler.liftSchedule.liftTemplate.setupBestOneRepMax();
    }
};

wendler.stores.lifts.Lifts.addListener('beforesync', wendler.liftSchedule.liftTemplate.updateLiftValues);
wendler.stores.lifts.MeetGoals.addListener('beforesync', wendler.liftSchedule.liftTemplate.updateLiftValues);

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
        var lastSetMax = wendler.weight.format(wendler.weight.lowerMaxToTrainingMax(wendler.liftSchedule.currentShowingMax), wendler.stores.lifts.LiftProgression.last().get('percentage'));

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

wendler.liftSchedule.liftTemplate.formatPercentage = function (value) {
    return value;
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
            itemTpl:'<p class="{[wendler.liftSchedule.liftTemplate.getLiftRowClass (values)]}"><span class="reps">{reps}</span> ' +
                '<span class="weight">{[wendler.liftSchedule.liftTemplate.formatLiftWeight(values)]}</span>' +
                '<span class="percentage"><span class="warmup-indicator">[warm]</span> {[wendler.liftSchedule.liftTemplate.formatPercentage(values.percentage)]}%</span></p>' +
                (wendler.toggles.BarLoading ?
                    '<p class="bar-loader-breakdown">{[wendler.liftSchedule.liftTemplate.getPlateList(' +
                        'wendler.liftSchedule.liftTemplate.formatLiftWeight(values)' +
                        ')]}</p>' : '')
        }
    ],
    listeners:{
        painted:function () {
            wendler.stores.lifts.LiftProgression.addListener('beforesync', function () {
                Ext.getCmp('lift-template-list').refresh();
            });
        },
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.liftTemplate.returnToLiftSelect);
            wendler.liftSchedule.liftTemplate.updateLiftValues();
            wendler.liftSchedule.liftTemplate.selectThreeLiftsFrom(0);
        }
    }
};
