Ext.ns('biglifts.views.liftSchedule.assistance', 'biglifts.liftSchedule.assistance.boringButBig');

biglifts.liftSchedule.assistance.boringButBig.showRestTimer = function () {
    biglifts.restTimer.backLocation = 'boring-but-big';
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('rest-timer'));
};

biglifts.liftSchedule.assistance.boringButBig.percentageChange = function (event) {
    var newValue = event.target.value;
    biglifts.stores.assistance.BoringButBigPercentage.first().set('percentage', newValue);
    biglifts.stores.assistance.BoringButBigPercentage.sync();
    Ext.getCmp('boring-but-big-list').refresh();
};

biglifts.liftSchedule.assistance.boringButBig.liftsComplete = function () {
    biglifts.stores.assistance.BoringButBig.each(function (movement) {
        var assistanceRecord = {
            movement:biglifts.stores.assistance.BoringButBig.getNameForRecord(movement.data),
            assistanceType:'BBB',
            sets:movement.get('sets'),
            reps:movement.get('reps'),
            weight:biglifts.stores.assistance.BoringButBig.getWeightForRecord(movement.data),
            timestamp:new Date().getTime(),
            notes:biglifts.liftSchedule.assistance.boringButBig.currentNotes
        };
        biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
        biglifts.stores.assistance.ActivityLog.sync();
    });

    Ext.getCmp('assistance').setActiveItem(0);
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

biglifts.liftSchedule.assistance.boringButBig.filterLifts = function () {
    biglifts.stores.assistance.BoringButBig.clearFilter(true);
    var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.assistance.currentLiftProperty);
    biglifts.stores.assistance.BoringButBig.filter("lift_id", lift.get('id'));
};

biglifts.liftSchedule.assistance.boringButBig.showNotesEditor = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big-notes'));
};

biglifts.liftSchedule.assistance.boringButBig.editBbbMovement = function (dataview, index) {
    var movement = biglifts.stores.assistance.BoringButBig.getAt(index);
    biglifts.liftSchedule.assistance.boringButBig.showEditBbbMovement(movement);
};

biglifts.liftSchedule.assistance.boringButBig.addMovement = function () {
    var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.assistance.currentLiftProperty);
    var bbbMovement = {
        sets:5,
        reps:10,
        weight:null,
        movement_lift_id:null,
        lift_id:lift.get('id'),
        name:''
    };

    biglifts.stores.assistance.BoringButBig.add(bbbMovement);
    biglifts.stores.assistance.BoringButBig.sync();
    biglifts.liftSchedule.assistance.boringButBig.showEditBbbMovement(biglifts.stores.assistance.BoringButBig.last());
};

biglifts.stores.assistance.BoringButBig.addListener('beforesync', function () {
    var list = Ext.getCmp('boring-but-big-list');
    if (list) {
        list.refresh();
    }
});

biglifts.liftSchedule.assistance.boringButBig.getPlateBreakdown = function (values) {
    if (!values.movement_lift_id) {
        return "";
    }

    var max = biglifts.stores.lifts.Lifts.findRecord('id', values.movement_lift_id).get('max');
    var trainingAdjustedMax = biglifts.weight.lowerMaxToTrainingMax(max);
    var bbbWeight = trainingAdjustedMax * biglifts.stores.assistance.BoringButBigPercentage.first().get('percentage') / 100.0;
    var plateList = biglifts.liftSchedule.liftTemplate.getPlateList(
        biglifts.weight.format(bbbWeight));

    return "<table class='assistance-plate-breakdown'><tbody><tr>" +
        "<td width='70%'></td>" +
        "<td style='text-align:right;' width='30%'>" +
        '<p class="bar-loader-breakdown">' + plateList + '</p>' +
        "</td>" +
        "</tr></tbody></table>";
};

biglifts.views.liftSchedule.assistance.BoringButBig = {
    xtype:'panel',
    id:'boring-but-big',
    layout:'fit',
    items:[
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
                    id:'boring-but-big-rest-timer-button',
                    cls:'rest-timer-button',
                    iconCls:'clock',
                    iconMask:true,
                    ui:'decline',
                    handler:biglifts.liftSchedule.assistance.boringButBig.showRestTimer
                },
                {
                    id:'boring-but-big-done-button',
                    text:'Save',
                    ui:'confirm',
                    handler:biglifts.liftSchedule.assistance.boringButBig.liftsComplete
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
                    handler:biglifts.liftSchedule.assistance.boringButBig.showNotesEditor
                },
                {
                    xtype:'panel',
                    width:'100%',
                    id:'bbbTopBar',
                    style:'text-align:right',
                    html:'<label for="bbbPercentage">%</label><input type="number" name="bbbPercentage" value=""/>',
                    listeners:{
                        initialize:function () {
                            var bbbPercentageInput = Ext.get(this.element.query('input[name="bbbPercentage"]')[0]);
                            bbbPercentageInput.dom.value = biglifts.stores.assistance.BoringButBigPercentage.first().get('percentage');
                            bbbPercentageInput.addListener('keyup',
                                biglifts.liftSchedule.assistance.boringButBig.percentageChange);
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
                    handler:biglifts.liftSchedule.assistance.boringButBig.addMovement
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
                "<span class='weight'>{[biglifts.weight.format(biglifts.stores.assistance.BoringButBig.getWeightForRecord(values))]}</span>" +
                "{[biglifts.stores.Settings.first().get('units')]}</td>" +
                "</tr></tbody></table>{[biglifts.liftSchedule.assistance.boringButBig.getPlateBreakdown(values)]}",
            listeners:{
                initialize:function (list) {
                    list.addListener('itemtap', biglifts.liftSchedule.assistance.boringButBig.editBbbMovement);
                }
            }
        }
    ],
    listeners:{
        show:function () {
            biglifts.liftSchedule.assistance.boringButBig.filterLifts();
            biglifts.navigation.setBackFunction(function () {
                Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
            });
        }
    }
};