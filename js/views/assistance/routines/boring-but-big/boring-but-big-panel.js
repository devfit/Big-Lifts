Ext.define("biglifts.views.BoringButBigPanel", {
    extend: "Ext.Panel",
    addMovement: function () {
        var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', Ext.getCmp('assistance-lift-chooser').currentLiftProperty);
        var bbbMovement = {
            sets: 5,
            reps: 10,
            weight: 0,
            movement_lift_id: null,
            lift_id: lift.get('id'),
            name: ''
        };

        biglifts.stores.assistance.BoringButBig.addWithOrder(bbbMovement);
        biglifts.stores.assistance.BoringButBig.sync();
        Ext.getCmp('bbb-movement-editor').showEditBbbMovement(biglifts.stores.assistance.BoringButBig.last());
    },
    arrange: function () {
        this.getParent().showArrange();
    },
    editBbbMovement: function (dataview, index) {
        Ext.getCmp('bbb-movement-editor').showEditBbbMovement(biglifts.stores.assistance.BoringButBig.getAt(index));
    },
    filterLifts: function () {
        biglifts.stores.assistance.BoringButBig.clearFilter(true);
        var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', Ext.getCmp('assistance-lift-chooser').currentLiftProperty);
        biglifts.stores.assistance.BoringButBig.filter("lift_id", lift.get('id'));
    },
    showRestTimer: function () {
        var assistance = Ext.getCmp('assistance');
        var restTimer = assistance.getRestTimer();
        restTimer.setBack(function () {
            assistance.setActiveItem(Ext.getCmp('boring-but-big'));
        });
        assistance.setActiveItem(restTimer);
    },
    showNotesEditor: function () {
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('boring-but-big-notes'));
    },
    liftsComplete: function () {
        var me = this;
        biglifts.stores.assistance.BoringButBig.each(function (movement) {
            var assistanceRecord = {
                movement: biglifts.stores.assistance.BoringButBig.getNameForRecord(movement.data),
                assistanceType: 'BBB',
                sets: movement.get('sets'),
                reps: movement.get('reps'),
                weight: biglifts.stores.assistance.BoringButBig.getWeightForRecord(movement.data),
                timestamp: new Date().getTime(),
                notes: me.currentNotes,
                cycle: biglifts.stores.CurrentCycle.getCurrentCycle()
            };
            biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
            biglifts.stores.assistance.ActivityLog.sync();
        });

        Ext.getCmp('assistance').setActiveItem(0);
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    getPlateBreakdown: function (values) {
        if (!values.movement_lift_id) {
            return "";
        }

        var max = biglifts.stores.lifts.Lifts.findRecord('id', values.movement_lift_id).get('max');
        var trainingAdjustedMax = biglifts.weight.lowerMaxToTrainingMax(max);
        var bbbWeight = trainingAdjustedMax * biglifts.stores.assistance.BoringButBigPercentage.first().get('percentage') / 100.0;

        var formattedWeight = biglifts.weight.format(bbbWeight);

        var plateList = util.plates.getFormattedPlateList(formattedWeight, Ext.getCmp('assistance-lift-chooser').currentLiftProperty);

        return "<table class='assistance-plate-breakdown'><tbody><tr>" +
            "<td width='70%'></td>" +
            "<td style='text-align:right;' width='30%'>" +
            '<p class="bar-loader-breakdown">' + plateList + '</p>' +
            "</td>" +
            "</tr></tbody></table>";
    },
    formatUnits: function (values) {
        var weight = biglifts.weight.format(biglifts.stores.assistance.BoringButBig.getWeightForRecord(values));
        return weight > 0 ? biglifts.stores.GlobalSettings.getUnits() : '';
    },
    formatWeight: function (values) {
        var weight = biglifts.weight.format(biglifts.stores.assistance.BoringButBig.getWeightForRecord(values));
        return weight > 0 ? weight : '';
    },
    percentageChange: function () {
        var newValue = parseInt(this.element.query('input[name="bbbPercentage"]')[0].value);
        biglifts.stores.assistance.BoringButBigPercentage.first().set('percentage', newValue);
        biglifts.stores.assistance.BoringButBigPercentage.sync();
        this.bbbList.refresh();
    },
    config: {
        id: 'boring-but-big-panel',
        layout: 'fit',
        listeners: {
            initialize: function () {
                var me = this;
                me.topToolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: "BBB",
                    items: [
                        {
                            text: 'Back',
                            ui: 'back',
                            handler: function () {
                                Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                            }
                        },
                        {xtype: 'spacer'},
                        {
                            cls: 'rest-timer-button',
                            iconCls: 'clock',
                            iconMask: true,
                            ui: 'decline',
                            handler: Ext.bind(me.showRestTimer, me)
                        },
                        {
                            text: 'Save',
                            ui: 'confirm',
                            handler: Ext.bind(me.liftsComplete, me)
                        }
                    ]
                });

                me.add({
                    xtype: 'toolbar',
                    ui: 'light',
                    docked: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Notes',
                            handler: Ext.bind(me.showNotesEditor, me)
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            id: 'bbbTopBar',
                            style: 'text-align:right',
                            html: '<label for="bbbPercentage">%</label><input type="number" name="bbbPercentage" value=""/>',
                            listeners: {
                                painted: function () {
                                    var bbbPercentageInput = Ext.get(this.element.query('input[name="bbbPercentage"]')[0]);
                                    bbbPercentageInput.dom.value = biglifts.stores.assistance.BoringButBigPercentage.first().get('percentage');

                                    if (!this._painted) {
                                        this._painted = true;
                                        bbbPercentageInput.addListener('keyup', Ext.bind(me.percentageChange, me));
                                    }
                                }
                            }
                        }
                    ]
                });

                me.bottomToolbar = me.add({
                        xtype: 'toolbar',
                        docked: 'bottom',
                        cls: 'unstyled-toolbar',
                        items: [
                            {
                                xtype: 'button',
                                ui: 'confirm',
                                text: 'Add...',
                                handler: Ext.bind(me.addMovement, me)
                            },
                            {
                                xtype: 'spacer'
                            },
                            {
                                xtype: 'button',
                                text: 'Arrange',
                                handler: Ext.bind(me.arrange, me)
                            }
                        ]
                    }
                );

                me.bbbList = me.add({
                    id: 'boring-but-big-list',
                    flex: 2,
                    xtype: 'list',
                    store: biglifts.stores.assistance.BoringButBig,
                    itemTpl: "<table class='assistance-table'><tbody><tr>" +
                        "<td width='50%'><span class='name'>{[biglifts.stores.assistance.BoringButBig.getNameForRecord(values)]}</b></td>" +
                        "<td width='20%'>{sets} sets</td>" +
                        "<td style='text-align:right;' width='30%'>{reps}x " +
                        "<span class='weight'>{[Ext.getCmp('boring-but-big-panel').formatWeight(values)]}</span>" +
                        "{[Ext.getCmp('boring-but-big-panel').formatUnits(values)]}</td>" +
                        "</tr></tbody></table>{[Ext.getCmp('boring-but-big-panel').getPlateBreakdown(values)]}",
                    listeners: {
                        initialize: function (list) {
                            list.addListener('itemtap', Ext.bind(me.editBbbMovement, me));
                        }
                    }
                });
            },
            painted: function () {
                var me = this;
                me.filterLifts();
                biglifts.navigation.setBackFunction(function () {
                    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                });

                if (!me._painted) {
                    me._painted = true;
                    biglifts.stores.assistance.BoringButBig.addListener('beforesync', function () {
                        me.bbbList.refresh();
                    });
                }
            }
        }
    }
});