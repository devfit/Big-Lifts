"use strict";
Ext.ns('biglifts.views.liftSchedule', 'biglifts.liftSchedule.liftTemplate');

biglifts.liftSchedule.liftTemplate.showLiftTracking = function () {
    var liftProgression = biglifts.stores.lifts.LiftProgression.findRecord('set', 6).data;
    var reps = liftProgression.reps;
    var weight = biglifts.weight.format(biglifts.weight.lowerMaxToTrainingMax(biglifts.liftSchedule.currentShowingMax), liftProgression.percentage);
    var formValues = {
        'reps': reps,
        'weight': weight,
        'estimated-one-rep-max': util.formulas.estimateOneRepMax(weight, reps),
        'notes': ''
    };

    var liftTracking = Ext.getCmp('lift-tracking');
    liftTracking.setNotes('');
    Ext.getCmp('lift-schedule').setActiveItem(liftTracking);
    liftTracking.setValues(formValues);
};


biglifts.liftSchedule.liftTemplate.formatLiftWeight = function (values) {
    var max = null;
    if (values.goalLift) {
        max = biglifts.stores.lifts.MeetGoals.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty).get('weight');
    }
    else {
        max = biglifts.weight.lowerMaxToTrainingMax(biglifts.liftSchedule.currentShowingMax);
    }
    return biglifts.weight.format(max, values.percentage);
};

biglifts.liftSchedule.liftTemplate.getLiftRowClass = function (values) {
    return (values.amrap ? 'amrap ' : '') + (values.warmup ? 'warmup ' : '');
};

biglifts.liftSchedule.liftTemplate.getEffectiveWeek = function () {
    if (biglifts.stores.WeekRotation.getCount() === 0) {
        return biglifts.liftSchedule.currentWeek;
    }
    else {
        var rotation = biglifts.stores.WeekRotation.findRecord('liftProperty', biglifts.liftSchedule.currentLiftProperty);
        var startingWeek = rotation.get('startingWeek');

        return ((biglifts.liftSchedule.currentWeek + startingWeek - 2) % 4) + 1;
    }
};

biglifts.liftSchedule.liftTemplate.updateLiftValues = function () {
    if (!biglifts.liftSchedule.currentLiftProperty) {
        return;
    }

    var liftRecord = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty);
    if (liftRecord === null) {
        if (Ext.getCmp('lift-schedule').getActiveItem() !== Ext.getCmp('lift-selector')) {
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
        }
        return;
    }

    var settings = biglifts.stores.w.Settings.first();
    if (settings) {
        var showWarmupSets = settings.get('showWarmupSets');
        biglifts.liftSchedule.currentShowingMax = liftRecord.data.max;
        biglifts.stores.lifts.LiftProgression.clearFilter();
        biglifts.stores.lifts.LiftProgression.filter("week", biglifts.liftSchedule.liftTemplate.getEffectiveWeek());

        if (!showWarmupSets) {
            biglifts.stores.lifts.LiftProgression.filterBy(function (record) {
                return !record.get('warmup') && record.data.week === biglifts.liftSchedule.liftTemplate.getEffectiveWeek();
            });
        }

        biglifts.liftSchedule.liftTemplate.setupBestOneRepMax();
    }
};

biglifts.liftSchedule.liftTemplate.setupBestOneRepMax = function () {
    if (biglifts.liftSchedule.liftTemplate.getEffectiveWeek() === 4) {
        Ext.getCmp('reps-to-beat-toolbar').hide();
        return;
    }

    var liftRecord = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty);
    var bestLogRecordOneRepEstimate = null;
    biglifts.stores.LiftLog.each(function (r) {
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
        var lastSetMax = biglifts.weight.format(biglifts.weight.lowerMaxToTrainingMax(biglifts.liftSchedule.currentShowingMax), biglifts.stores.lifts.LiftProgression.last().get('percentage'));

        Ext.get('last-one-rep-estimate').setHtml(bestLogRecordOneRepEstimate);
        Ext.get('reps-needed-to-beat-last-estimate').setHtml(util.formulas.calculateRepsToBeatWeight(bestLogRecordOneRepEstimate, lastSetMax));
        Ext.getCmp('reps-to-beat-toolbar').show();
    }
    else {
        Ext.getCmp('reps-to-beat-toolbar').hide();
    }
};

biglifts.liftSchedule.liftTemplate.returnToLiftSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
};

biglifts.liftSchedule.liftTemplate.showRestTimer = function () {
    var restTimer = Ext.getCmp('rest-timer');
    restTimer.setBack(function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
    });

    Ext.getCmp('lift-schedule').setActiveItem(restTimer);
};

biglifts.liftSchedule.liftTemplate.formatPercentage = function (value) {
    return value;
};

biglifts.views.liftSchedule.liftTemplate = {
    xtype: 'panel',
    id: 'lift-template',
    layout: 'fit',
    items: [
        {
            xtype: 'toolbar',
            id: 'lift-template-toolbar',
            docked: 'top',
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: biglifts.liftSchedule.liftTemplate.returnToLiftSelect
                },
                {xtype: 'spacer'},
                {
                    cls: 'rest-timer-button',
                    iconCls: 'clock',
                    iconMask: true,
                    ui: 'decline',
                    handler: biglifts.liftSchedule.liftTemplate.showRestTimer
                },
                {
                    style: 'z-index: 11',
                    id: 'mark-lift-completed-button',
                    iconCls: 'done',
                    iconMask: true,
                    ui: 'action',
                    handler: biglifts.liftSchedule.liftTemplate.showLiftTracking
                }
            ]
        },
        {
            xtype: 'toolbar',
            id: 'reps-to-beat-toolbar',
            ui: 'light',
            hidden: true,
            docked: 'top',
            items: [
                {
                    id: 'reps-to-beat-panel',
                    xtype: 'panel',
                    width: '100%',
                    html: '<table class="reps-to-beat-text"><tr>' +
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
            id: 'lift-template-list',
            xtype: 'list',
            store: biglifts.stores.lifts.LiftProgression,
            itemCls: 'lift-row',
            itemTpl: '<p class="{[biglifts.liftSchedule.liftTemplate.getLiftRowClass (values)]}"><span class="reps">{reps}</span> ' +
                '<span class="weight">{[biglifts.liftSchedule.liftTemplate.formatLiftWeight(values)]}</span>' +
                '<span class="percentage"><span class="warmup-indicator">[warm]</span> {[biglifts.liftSchedule.liftTemplate.formatPercentage(values.percentage)]}%</span></p>' +
                (biglifts.toggles.BarLoading ?
                    '<p class="bar-loader-breakdown">{[util.plates.getFormattedPlateList(' +
                        'biglifts.liftSchedule.liftTemplate.formatLiftWeight(values),biglifts.liftSchedule.currentLiftProperty)]}</p>' : '')
        }
    ],
    listeners: {
        painted: function () {
            if (!this._painted) {
                this._painted = true;
                biglifts.stores.lifts.LiftProgression.addListener('beforesync', function () {
                    Ext.getCmp('lift-template-list').refresh();
                });

                biglifts.stores.lifts.Lifts.addListener('beforesync', biglifts.liftSchedule.liftTemplate.updateLiftValues);
                biglifts.stores.lifts.MeetGoals.addListener('beforesync', biglifts.liftSchedule.liftTemplate.updateLiftValues);
            }

            biglifts.navigation.setBackFunction(biglifts.liftSchedule.liftTemplate.returnToLiftSelect);
            biglifts.liftSchedule.liftTemplate.updateLiftValues();
        }
    }
};
