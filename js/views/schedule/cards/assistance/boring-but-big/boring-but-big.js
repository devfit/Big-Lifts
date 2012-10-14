Ext.ns('wendler.views.liftSchedule.assistance', 'wendler.liftSchedule.assistance.boringButBig');

wendler.liftSchedule.assistance.boringButBig.showRestTimer = function () {
    wendler.restTimer.backLocation = 'boring-but-big';
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('rest-timer'));
};

wendler.liftSchedule.assistance.boringButBig.percentageChange = function (event) {
    var newValue = event.target.value;
    wendler.stores.assistance.BoringButBigPercentage.first().set('percentage', newValue);
    wendler.stores.assistance.BoringButBigPercentage.sync();
    Ext.getCmp('boring-but-big-list').refresh();
};

wendler.liftSchedule.assistance.boringButBig.liftsComplete = function () {
    wendler.stores.assistance.BoringButBig.each(function (movement) {
        var assistanceRecord = {
            movement:wendler.stores.assistance.BoringButBig.getNameForRecord(movement.data),
            assistanceType:'BBB',
            sets:movement.get('sets'),
            reps:movement.get('reps'),
            weight:wendler.stores.assistance.BoringButBig.getWeightForRecord(movement.data),
            timestamp:new Date().getTime(),
            notes:wendler.liftSchedule.assistance.boringButBig.currentNotes
        };
        wendler.stores.assistance.ActivityLog.add(assistanceRecord);
        wendler.stores.assistance.ActivityLog.sync();
    });

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

wendler.liftSchedule.assistance.boringButBig.filterLifts = function () {
    wendler.stores.assistance.BoringButBig.clearFilter();
    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty);
    wendler.stores.assistance.BoringButBig.filter("lift_id", lift.get('id'));
};

wendler.liftSchedule.assistance.boringButBig.showNotesEditor = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big-notes'));
};

wendler.liftSchedule.assistance.boringButBig.editBbbMovement = function (dataview, index) {
    var movement = wendler.stores.assistance.BoringButBig.getAt(index);
    wendler.liftSchedule.assistance.boringButBig.showEditBbbMovement(movement);
};

wendler.stores.assistance.BoringButBig.addListener('beforesync', function () {
    var list = Ext.getCmp('boring-but-big-list');
    if (list) {
        list.refresh();
    }
});

wendler.views.liftSchedule.assistance.BoringButBig = {
    xtype:'panel',
    id:'boring-but-big',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"BBB",
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.assistance.returnToAssistanceSelect
                },
                {xtype:'spacer'},
                {
                    id:'boring-but-big-rest-timer-button',
                    cls:'rest-timer-button',
                    iconCls:'clock',
                    iconMask:true,
                    ui:'decline',
                    handler:wendler.liftSchedule.assistance.boringButBig.showRestTimer
                },
                {
                    id:'boring-but-big-done-button',
                    text:'Save',
                    ui:'confirm',
                    handler:wendler.liftSchedule.assistance.boringButBig.liftsComplete
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
                    handler:wendler.liftSchedule.assistance.boringButBig.showNotesEditor
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
                            bbbPercentageInput.dom.value = wendler.stores.assistance.BoringButBigPercentage.first().get('percentage');
                            bbbPercentageInput.addListener('keyup',
                                wendler.liftSchedule.assistance.boringButBig.percentageChange);
                        }
                    }
                }
            ]
        },
        {
            id:'boring-but-big-list',
            flex:2,
            xtype:'list',
            store:wendler.stores.assistance.BoringButBig,
            itemTpl:"<table class='assistance-table'><tbody><tr>" +
                "<td width='50%'><span class='name'>{[wendler.stores.assistance.BoringButBig.getNameForRecord(values)]}</b></td>" +
                "<td width='20%'>{sets} sets</td>" +
                "<td style='text-align:right;' width='30%'>{reps}x " +
                "<span class='weight'>{[wendler.weight.format(wendler.stores.assistance.BoringButBig.getWeightForRecord(values))]}</span>" +
                "{[wendler.stores.Settings.first().get('units')]}</td>" +
                "</tr></tbody></table>",
            listeners:{
                initialize:function (list) {
                    list.addListener('itemtap', wendler.liftSchedule.assistance.boringButBig.editBbbMovement);
                }
            }
        },
        {
            flex:1,
            cls:'tap-to-edit',
            html:'Tap row to edit'
        }
    ],
    listeners:{
        show:function () {
            wendler.liftSchedule.assistance.boringButBig.filterLifts();
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.returnToAssistanceSelect);
        }
    }
};