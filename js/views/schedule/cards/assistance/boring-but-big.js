Ext.ns('wendler.views.liftSchedule.assistance', 'wendler.liftSchedule.assistance.boringButBig');
Ext.define('BoringButBigLift', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'weight', type:'string'},
            {name:'reps', type:'int'},
            {name:'percentage', type:'int'},
            {name:'set', type:'int'}
        ],
        proxy:{
            type:'memory',
            id:'lift-log-proxy'
        }
    }
});

wendler.liftSchedule.assistance.boringButBig.liftStore = Ext.create('Ext.data.Store', {
    model:'BoringButBigLift'
});

wendler.liftSchedule.assistance.boringButBig.setupAssistanceLiftStore = function (bbbPercentage) {
    if (!bbbPercentage) {
        bbbPercentage = 0;
    }

    var store = wendler.liftSchedule.assistance.boringButBig.liftStore;
    store.removeAll();

    var liftWeight = wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax, bbbPercentage);

    for (var i = 0; i < 5; i++) {
        store.add({
            set:(i + 1),
            weight:liftWeight,
            reps:'10',
            percentage:bbbPercentage
        });
    }
};

wendler.liftSchedule.assistance.boringButBig.returnToAssistanceSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('assistance-chooser'));
};

wendler.liftSchedule.assistance.boringButBig.showRestTimer = function () {
    wendler.restTimer.backLocation = 'boring-but-big';
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('rest-timer'));
};

wendler.liftSchedule.assistance.boringButBig.percentageChange = function (event) {
    var newValue = event.target.value;
    wendler.liftSchedule.assistance.boringButBig.setupAssistanceLiftStore(newValue);
};

wendler.liftSchedule.assistance.boringButBig.liftsComplete = function () {
    wendler.liftSchedule.assistance.boringButBig.saveAssistanceWork();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

wendler.liftSchedule.assistance.boringButBig.saveAssistanceWork = function () {
    var liftName = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).get('name');
    var bbbPercentage = parseInt(Ext.getCmp('boring-but-big').element.query('[name=bbbPercentage]')[0].value);
    var weight = wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax, bbbPercentage);

    var assistanceRecord = {
        movement:liftName,
        assistanceType:'BBB',
        sets:5,
        reps:10,
        weight:weight,
        timestamp:new Date().getTime()
    };

    wendler.stores.assistance.ActivityLog.add(assistanceRecord);
    wendler.stores.assistance.ActivityLog.sync();
};

wendler.liftSchedule.assistance.boringButBig.setCurrentLiftTitle = function () {
    var toolbar = Ext.getCmp('boring-but-big').down('toolbar');
    var liftName = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).get('name');
    toolbar.setTitle(liftName);
};

wendler.views.liftSchedule.assistance.BoringButBig = {
    xtype:'panel',
    id:'boring-but-big',
    layout:'fit',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.assistance.boringButBig.returnToAssistanceSelect
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
            itemCls:'lift-row',
            itemTpl:'<p class="reps-weight"><span class="reps">{reps}</span> ' +
                '<span class="weight">{weight}</span>' +
                '<span class="percentage">{percentage}%</span></p>' +
                (wendler.toggles.BarLoading ?
                    '<p class="bar-loader-breakdown">' +
                        '{[values.set > 1 ? "" : wendler.liftSchedule.liftTemplate.getPlateList(wendler.liftSchedule.liftTemplate.formatLiftWeight(' +
                        'wendler.liftSchedule.currentShowingMax,values.percentage))]}' +
                        '</p>' :
                    '')
        }
    ],
    listeners:{
        show:function () {
            wendler.liftSchedule.currentLiftProperty = 'squat';
            wendler.liftSchedule.currentShowingMax = 200;

            wendler.liftSchedule.assistance.boringButBig.setCurrentLiftTitle();
            wendler.liftSchedule.assistance.boringButBig.setupAssistanceLiftStore(50);
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.boringButBig.returnToAssistanceSelect);
        }
    }
};