Ext.ns('biglifts.views.liftSchedule.assistance');

Ext.define("biglifts.views.BoringButBig", {
    xtype:'boringbutbig',
    extend:"Ext.Panel",
    addMovement:function () {
        var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', Ext.getCmp('assistance-lift-chooser').currentLiftProperty);
        var bbbMovement = {
            sets:5,
            reps:10,
            weight:0,
            movement_lift_id:null,
            lift_id:lift.get('id'),
            name:''
        };

        biglifts.stores.assistance.BoringButBig.add(bbbMovement);
        biglifts.stores.assistance.BoringButBig.sync();
        biglifts.liftSchedule.assistance.boringButBig.showEditBbbMovement(biglifts.stores.assistance.BoringButBig.last());
    },
    editBbbMovement:function (dataview, index) {
        var movement = biglifts.stores.assistance.BoringButBig.getAt(index);
        biglifts.liftSchedule.assistance.boringButBig.showEditBbbMovement(movement);
    },
    filterLifts:function () {
        biglifts.stores.assistance.BoringButBig.clearFilter(true);
        var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', Ext.getCmp('assistance-lift-chooser').currentLiftProperty);
        biglifts.stores.assistance.BoringButBig.filter("lift_id", lift.get('id'));
    },
    showRestTimer:function () {
        var restTimer = Ext.getCmp('rest-timer');
        restTimer.setBack(function () {
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big'));
        });
        Ext.getCmp('assistance').setActiveItem(restTimer);
    },
    showNotesEditor:function () {
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('boring-but-big-notes'));
    },
    liftsComplete:function () {
        biglifts.stores.assistance.BoringButBig.each(function (movement) {
            var assistanceRecord = {
                movement:biglifts.stores.assistance.BoringButBig.getNameForRecord(movement.data),
                assistanceType:'BBB',
                sets:movement.get('sets'),
                reps:movement.get('reps'),
                weight:biglifts.stores.assistance.BoringButBig.getWeightForRecord(movement.data),
                timestamp:new Date().getTime(),
                notes:biglifts.liftSchedule.assistance.boringButBig.currentNotes,
                cycle:biglifts.stores.CurrentCycle.getCurrentCycle()
            };
            biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
            biglifts.stores.assistance.ActivityLog.sync();
        });

        Ext.getCmp('assistance').setActiveItem(0);
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    getPlateBreakdown:function (values) {
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
    formatUnits:function (values) {
        var weight = biglifts.weight.format(biglifts.stores.assistance.BoringButBig.getWeightForRecord(values));
        return weight > 0 ? biglifts.stores.Settings.first().get('units') : '';
    },
    formatWeight:function (values) {
        var weight = biglifts.weight.format(biglifts.stores.assistance.BoringButBig.getWeightForRecord(values));
        return weight > 0 ? weight : '';
    },

    percentageChange:function (event) {
        var newValue = event.target.value;
        biglifts.stores.assistance.BoringButBigPercentage.first().set('percentage', newValue);
        biglifts.stores.assistance.BoringButBigPercentage.sync();
        Ext.getCmp('boring-but-big-list').refresh();
    },

    config:{
        layout:'fit',
        listeners:{
            painted:function () {
                this.filterLifts();
                biglifts.navigation.setBackFunction(function () {
                    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                });
            },
            initialize:function () {
                var me = this;
                me.add([
                    {
                        xtype:'toolbar',
                        docked:'top',
                        title:"BBB",
                        items:[
                            {
                                text:'Back',
                                ui:'back',
                                handler:function () {
                                    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                                }
                            },
                            {xtype:'spacer'},
                            {
                                cls:'rest-timer-button',
                                iconCls:'clock',
                                iconMask:true,
                                ui:'decline',
                                handler:Ext.bind(me.showRestTimer, me)
                            },
                            {
                                id:'boring-but-big-done-button',
                                text:'Save',
                                ui:'confirm',
                                handler:Ext.bind(me.liftsComplete, me)
                            }
                        ]
                    },
                    {
                        xtype:'toolbar',
                        ui:'light',
                        docked:'top',
                        items:[
                            {
                                xtype:'button',
                                text:'Notes',
                                handler:Ext.bind(me.showNotesEditor, me)
                            },
                            {
                                xtype:'panel',
                                width:'100%',
                                id:'bbbTopBar',
                                style:'text-align:right',
                                html:'<label for="bbbPercentage">%</label><input type="number" name="bbbPercentage" value=""/>',
                                listeners:{
                                    painted:function () {
                                        var bbbPercentageInput = Ext.get(this.element.query('input[name="bbbPercentage"]')[0]);
                                        bbbPercentageInput.dom.value = biglifts.stores.assistance.BoringButBigPercentage.first().get('percentage');

                                        if (!this._painted) {
                                            this._painted = true;
                                            bbbPercentageInput.addListener('keyup', me.percentageChange);
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype:'toolbar',
                        docked:'bottom',
                        cls:'custom-movement-toolbar',
                        items:[
                            {
                                xtype:'button',
                                ui:'confirm',
                                text:'Add...',
                                handler:Ext.bind(me.addMovement, me)
                            }
                        ]
                    },
                    {
                        id:'boring-but-big-list',
                        flex:2,
                        xtype:'list',
                        store:biglifts.stores.assistance.BoringButBig,
                        itemTpl:"<table class='assistance-table'><tbody><tr>" +
                            "<td width='50%'><span class='name'>{[biglifts.stores.assistance.BoringButBig.getNameForRecord(values)]}</b></td>" +
                            "<td width='20%'>{sets} sets</td>" +
                            "<td style='text-align:right;' width='30%'>{reps}x " +
                            "<span class='weight'>{[Ext.getCmp('boring-but-big').formatWeight(values)]}</span>" +
                            "{[Ext.getCmp('boring-but-big').formatUnits(values)]}</td>" +
                            "</tr></tbody></table>{[Ext.getCmp('boring-but-big').getPlateBreakdown(values)]}",
                        listeners:{
                            initialize:function (list) {
                                list.addListener('itemtap', Ext.bind(me.editBbbMovement, me));
                            }
                        }
                    }
                ]);
            },
            painted:function () {
                if (!this._painted) {
                    this._painted = true;
                    biglifts.stores.assistance.BoringButBig.addListener('beforesync', function () {
                        Ext.getCmp('boring-but-big-list').refresh();
                    });
                }
            }
        }
    }
});

biglifts.views.liftSchedule.assistance.BoringButBig = {
    id:'boring-but-big',
    xtype:'boringbutbig'
};