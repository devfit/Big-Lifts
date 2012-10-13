Ext.ns('wendler.views.liftSchedule.assistance', 'wendler.liftSchedule.assistance.boringButBig');

wendler.liftSchedule.assistance.boringButBig.showRestTimer = function () {
    wendler.restTimer.backLocation = 'boring-but-big';
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('rest-timer'));
};

wendler.liftSchedule.assistance.boringButBig.percentageChange = function (event) {
    var newValue = event.target.value;
    wendler.stores.assistance.BoringButBigPercentage.first().set('percentage', newValue);
    wendler.stores.assistance.BoringButBigPercentage.sync();
};

wendler.liftSchedule.assistance.boringButBig.liftsComplete = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big-log'));
};

wendler.views.liftSchedule.assistance.BoringButBig = {
    xtype:'panel',
    id:'boring-but-big',
    layout:'fit',
    title:'BBB',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.assistance.returnToAssistanceSelect
                },
                {xtype:'spacer'},
                {
                    style:'z-index: 11',
                    id:'boring-but-big-rest-timer-button',
                    cls:'rest-timer-button',
                    iconCls:'clock',
                    iconMask:true,
                    ui:'decline',
                    handler:wendler.liftSchedule.assistance.boringButBig.showRestTimer
                },
                {
                    style:'z-index: 11',
                    id:'boring-but-big-done-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
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
            xtype:'list',
            store:wendler.liftSchedule.assistance.boringButBig.liftStore,
            itemTpl:"<table class='triumvirate-table'><tbody><tr>" +
                "<td width='50%'><span class='name'>{name}</b></td><td width='20%'>{sets} sets</td><td style='text-align:right;' width='30%'>{reps}x " +
                "{[wendler.logList.getWeightDisplay(values.weight)]}" +
                "{[wendler.stores.Settings.first().get('units')]}</td>" +
                "</tr></tbody></table>"
        }
    ],
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.returnToAssistanceSelect);
        }
    }
};