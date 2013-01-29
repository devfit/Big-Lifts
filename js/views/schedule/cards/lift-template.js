Ext.define('biglifts.views.LiftTemplate', {
    extend:'Ext.Panel',
    constructor:function () {
        this.callParent(arguments);

        this.topToolbar = this.add({
            xtype:'toolbar',
            docked:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:Ext.bind(this.returnToLiftSelect, this)
                },
                {xtype:'spacer'},
                {
                    cls:'rest-timer-button',
                    iconCls:'clock',
                    iconMask:true,
                    ui:'decline',
                    handler:Ext.bind(this.showRestTimer, this)
                },
                {
                    style:'z-index: 11',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:Ext.bind(this.showLiftTracking, this)
                }
            ]
        });

        this.repsToolbar = this.add({
            xtype:'toolbar',
            ui:'light',
            hidden:true,
            docked:'top',
            cls:'reps-toolbar'
        });

        this.repsToBeatPanel = this.repsToolbar.add({
            xtype:'component',
            cls:'reps-panel',
            width:'100%',
            tpl:'<table><tr>' +
                '<td width="40%">' +
                'Best: ~{lastEstimate}' +
                '</td>' +
                '<td width="60%" style="text-align:right">' +
                ' <span>Reps to beat: {repsToBeat}</span>' +
                '</td>' +
                '</tr></table>',
            data:{
                lastEstimate:0,
                repsToBeat:0
            }
        });

        this.liftList = this.add({
            xtype:'list',
            store:biglifts.stores.lifts.LiftProgression,
            itemCls:'lift-row',
            itemTpl:new Ext.XTemplate('<p class="{[this.getLiftRowClass (values)]}"><span class="reps">{reps}</span> ' +
                '<span class="weight">{[this.formatLiftWeight(values)]}</span>' +
                '<span class="percentage"><span class="warmup-indicator">[warm]</span> {percentage}%</span></p>' +
                (biglifts.toggles.BarLoading ?
                    '<p class="bar-loader-breakdown">{[util.plates.getFormattedPlateList(' +
                        'this.formatLiftWeight(values),biglifts.liftSchedule.currentLiftProperty)]}</p>' : ''), {
                getLiftRowClass:function (values) {
                    return (values.amrap ? 'amrap ' : '') + (values.warmup ? 'warmup ' : '');
                },
                formatLiftWeight:function (values) {
                    var max = null;
                    if (values.goalLift) {
                        max = biglifts.stores.lifts.MeetGoals.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty).get('weight');
                    }
                    else {
                        max = biglifts.weight.lowerMaxToTrainingMax(biglifts.liftSchedule.currentShowingMax);
                    }
                    return biglifts.weight.format(max, values.percentage);
                }
            })
        });
    },
    showForRecord:function (record) {
        this.topToolbar.setTitle(record.get('name'));
        biglifts.liftSchedule.currentLiftProperty = record.get('propertyName');
        Ext.getCmp('lift-schedule').setActiveItem(this);
    },
    getEffectiveWeek:function () {
        if (biglifts.stores.WeekRotation.getCount() === 0) {
            return biglifts.liftSchedule.currentWeek;
        }
        else {
            var rotation = biglifts.stores.WeekRotation.findRecord('liftProperty', biglifts.liftSchedule.currentLiftProperty);
            var startingWeek = rotation.get('startingWeek');

            return ((biglifts.liftSchedule.currentWeek + startingWeek - 2) % 4) + 1;
        }
    },
    updateLiftValues:function () {
        if (!biglifts.liftSchedule.currentLiftProperty) {
            return;
        }

        var liftRecord = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty);

        var settings = biglifts.stores.w.Settings.first();
        var showWarmupSets = settings.get('showWarmupSets');

        biglifts.liftSchedule.currentShowingMax = liftRecord.data.max;

        biglifts.stores.lifts.LiftProgression.clearFilter();
        biglifts.stores.lifts.LiftProgression.filter("week", this.getEffectiveWeek());

        var me = this;
        if (!showWarmupSets) {
            biglifts.stores.lifts.LiftProgression.filterBy(function (record) {
                return !record.get('warmup') && record.data.week === me.getEffectiveWeek();
            });
        }

        this.setupBestOneRepMax();
    },
    returnToLiftSelect:function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    },
    setupBestOneRepMax:function () {
        if (this.getEffectiveWeek() === 4) {
            this.repsToolbar.hide();
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

            this.repsToolbar.show();
            var repsToBeat = util.formulas.calculateRepsToBeatWeight(bestLogRecordOneRepEstimate, lastSetMax);
            this.repsToBeatPanel.setData({lastEstimate:bestLogRecordOneRepEstimate, repsToBeat:repsToBeat})
        }
        else {
            this.repsToolbar.hide();
        }
    },
    showRestTimer:function () {
        var restTimer = Ext.getCmp('lift-schedule').getRestTimer();
        restTimer.setBack(function () {
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
        });

        Ext.getCmp('lift-schedule').setActiveItem(restTimer);
    },
    showLiftTracking:function () {
        var liftProgression = biglifts.stores.lifts.LiftProgression.findRecord('set', 6).data;
        var reps = liftProgression.reps;
        var weight = biglifts.weight.format(biglifts.weight.lowerMaxToTrainingMax(biglifts.liftSchedule.currentShowingMax), liftProgression.percentage);

        Ext.getCmp('lift-tracking').showFor({
            'reps':reps,
            'weight':weight,
            'estimated-one-rep-max':util.formulas.estimateOneRepMax(weight, reps),
            'notes':''
        });
    },
    bindListeners:function () {
        biglifts.stores.lifts.LiftProgression.addListener('beforesync', this.updateLiftValues, this);
        biglifts.stores.lifts.Lifts.addListener('beforesync', this.updateLiftValues, this);
        biglifts.stores.lifts.MeetGoals.addListener('beforesync', this.updateLiftValues, this);
    },
    destroyListeners:function () {
        biglifts.stores.lifts.LiftProgression.removeListener('beforesync', this.updateLiftValues, this);
        biglifts.stores.lifts.Lifts.removeListener('beforesync', this.updateLiftValues, this);
        biglifts.stores.lifts.MeetGoals.removeListener('beforesync', this.updateLiftValues, this);
    },
    config:{
        id:'lift-template',
        layout:'fit',
        listeners:{
            painted:function () {
                if (!this._painted) {
                    this._painted = true;
                    this.bindListeners();
                }

                this.updateLiftValues();
                biglifts.navigation.setBackFunction(Ext.bind(this.returnToLiftSelect, this));
            },
            destroy:function () {
                this.destroyListeners();
            }
        }
    }
});
