Ext.define("Biglifts.views.MaxesForm", {
    extend: 'Ext.form.Panel',
    xtype: 'maxesform',
    showHideMeetGoals: function () {
        var template = biglifts.stores.Template.first();
        if (template.get('hasMeetGoals')) {
            this.meetGoals.show();
        }
        else {
            this.meetGoals.hide();
        }
    },
    updateTrainingPercentageDisplay: function () {
        var trainingMaxPercentage = biglifts.stores.w.Settings.first().data['trainingMaxPercentage'];
        this.trainingMaxes.setTitle('<span id="training-max-percentage-indicator">' + trainingMaxPercentage + '</span>%');
        this.trainingMaxes.removeAll(true);
        biglifts.stores.lifts.Lifts.each(this.createTrainingMaxesInput, this);
    },
    buildMaxesFromStore: function () {
        biglifts.stores.lifts.Lifts.each(this.createMaxesInput, this);
        biglifts.stores.lifts.Lifts.each(this.createTrainingMaxesInput, this);
    },
    createMaxesInput: function (record) {
        var liftName = record.data.name;
        var liftProperty = record.data.propertyName;

        this.maxesFormItems.add({
            id: 'maxes-' + liftProperty,
            xtype: 'numberfield',
            name: liftProperty,
            label: liftName,
            value: record.data.max
        });

        this.meetGoals.add({
            id: 'meet-goal-' + liftProperty,
            xtype: 'numberfield',
            name: liftProperty,
            label: liftName,
            value: record.data.max
        });
    },
    createTrainingMaxesInput: function (record) {
        var trainingMaxPercentage = biglifts.stores.w.Settings.first().data['trainingMaxPercentage'] / 100.0;
        var trainingMax = util.roundNumber(trainingMaxPercentage * record.data.max, '0.5', 'normal');
        var liftProperty = record.data.propertyName;

        this.trainingMaxes.add({
            id: 'maxes-' + liftProperty + '-training',
            xtype: 'textfield',
            name: liftProperty + "-training",
            value: trainingMax,
            readOnly: true
        });
    },
    showHideTrainingMaxes: function () {
        var settings = biglifts.stores.w.Settings.first();

        if (settings.data['useTrainingMax']) {
            if (this.trainingMaxesPanel.isHidden()) {
                this.trainingMaxesPanel.flex = 1;
                this.trainingMaxesPanel.show();
            }
        }
        else {
            if (!this.trainingMaxesPanel.isHidden()) {
                this.trainingMaxesPanel.flex = 0;
                this.trainingMaxesPanel.hide();
            }
        }
    },
    rebuildMaxesList: function () {
        biglifts.stores.lifts.Lifts.clearFilter(true);
        biglifts.stores.lifts.Lifts.filter('enabled', true);

        this.maxesFormItems.removeAll(true);
        this.trainingMaxes.removeAll(true);
        this.buildMaxesFromStore();
    },
    liftValuesChanged: function (el, newValue) {
        var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', el.getName());
        lift.set('max', newValue);
        biglifts.stores.lifts.Lifts.sync();
    },
    editLiftButtonPressed: function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-panel'));
    },
    meetGoalsChanged: function (el, newValue) {
        var meetGoal = biglifts.stores.lifts.MeetGoals.findRecord('propertyName', el.getName());
        meetGoal.set('weight', newValue);
        meetGoal.save();
        biglifts.stores.lifts.MeetGoals.sync();
    },
    barPlateButtonPressed: function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('bar-plate-setup-panel'));
    },
    addLiftButtonPressed: function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'));
    },
    bindListeners: function () {
        biglifts.stores.lifts.Lifts.addListener('beforesync', this.updatePowerliftingTotal, this);
        biglifts.stores.LiftLog.addListener('beforesync', this.updatePowerliftingTotal, this);

        biglifts.stores.w.Settings.addListener('beforesync', this.updateTrainingPercentageDisplay, this);
        biglifts.stores.w.Settings.addListener('beforesync', this.showHideTrainingMaxes, this);
        biglifts.stores.Template.addListener('beforesync', this.showHideMeetGoals, this);
    },
    destroyListeners: function () {
        biglifts.stores.lifts.Lifts.removeListener('beforesync', this.updatePowerliftingTotal, this);
        biglifts.stores.LiftLog.removeListener('beforesync', this.updatePowerliftingTotal, this);

        biglifts.stores.w.Settings.removeListener('beforesync', this.updateTrainingPercentageDisplay, this);
        biglifts.stores.w.Settings.removeListener('beforesync', this.showHideTrainingMaxes, this);
        biglifts.stores.Template.removeListener('beforesync', this.showHideMeetGoals, this);
    },
    updatePowerliftingTotal: function () {
        var me = this;
        util.powerliftingTotal.getTotal(function (total) {
            if (total === -1) {
                me.powerliftingTotal.hide();
            }
            else {
                me.powerliftingTotal.show();
                me.powerliftingTotal.setData({total: total});
            }
        });
    },
    config: {
        id: 'maxes-form',
        scroll: 'vertical',
        cls: 'start-page',
        listeners: {
            painted: function () {
                biglifts.stores.lifts.Lifts.clearFilter(true);
                biglifts.stores.lifts.Lifts.filter('enabled', true);
                biglifts.navigation.unbindBackEvent();

                this.rebuildMaxesList();
                this.showHideMeetGoals();

                if (!this._painted) {
                    this._painted = true;
                    this.bindListeners();
                }
            },
            destroy: function () {
                this.destroyListeners();
            },
            initialize: function () {
                var me = this;
                if (biglifts.toggles.BarLoading) {
                    me.add({
                        xtype: 'toolbar',
                        docked: 'bottom',
                        ui: 'light',
                        items: [
                            {xtype: 'spacer'},
                            {
                                handler: Ext.bind(me.barPlateButtonPressed, me),
                                ui: 'action',
                                text: 'Bar/Plates'
                            }
                        ]
                    });
                }

                me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: 'Lifts',
                    items: [
                        {
                            ui: 'action',
                            text: 'Edit',
                            handler: Ext.bind(me.editLiftButtonPressed, me)
                        },
                        {xtype: 'spacer'},
                        {
                            iconCls: 'add',
                            iconMask: true,
                            handler: Ext.bind(me.addLiftButtonPressed, me),
                            ui: 'action'
                        }
                    ]
                });

                var maxesHbox = me.add({
                    xtype: 'panel',
                    layout: {
                        type: 'hbox'
                    },
                    padding: 0,
                    bodyPadding: 0
                });

                var maxesPanel = maxesHbox.add({
                    xtype: 'panel',
                    flex: 3,
                    bodyPadding: 0
                });

                this.maxesFormItems = maxesPanel.add({
                    xtype: 'fieldset',
                    cls: 'fieldset-title-no-margin',
                    style: 'margin-bottom:0.5em',
                    title: 'Maxes',
                    defaults: {
                        listeners: {
                            change: Ext.bind(me.liftValuesChanged, me)
                        },
                        labelWidth: '45%',
                        useClearIcon: true
                    }
                });

                this.trainingMaxesPanel = maxesHbox.add({
                    xtype: 'panel',
                    flex: 1,
                    bodyPadding: 0
                });

                this.trainingMaxes = this.trainingMaxesPanel.add({
                    xtype: 'fieldset',
                    cls: 'fieldset-title-no-margin'
                });

                this.powerliftingTotal = me.add({
                    tpl: '<b>Powerlifting Total:</b> {total}',
                    cls: 'powerlifting-total',
                    data: {
                        total: 0
                    }
                });
                this.updatePowerliftingTotal();

                this.meetGoals = me.add({
                    hidden: true,
                    xtype: 'fieldset',
                    cls: 'fieldset-title-no-margin',
                    style: 'margin-top:5px',
                    title: 'Meet Goals',
                    defaults: {
                        listeners: {
                            change: Ext.bind(me.meetGoalsChanged, me)
                        },
                        labelWidth: '45%',
                        useClearIcon: true
                    }
                });

                this.updateTrainingPercentageDisplay();
                this.buildMaxesFromStore();
            }
        }
    }
});