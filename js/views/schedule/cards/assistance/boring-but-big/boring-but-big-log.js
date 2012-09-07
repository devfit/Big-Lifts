Ext.ns('wendler.liftSchedule.assistance.boringButBig');

wendler.liftSchedule.assistance.boringButBig.returnToBbbLift = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big'));
};

wendler.liftSchedule.assistance.boringButBig.saveAndShowTracking = function () {
    wendler.liftSchedule.assistance.boringButBig.saveAssistanceWork();
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
};

wendler.liftSchedule.assistance.boringButBig.showNotesEditor = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big-notes'));
};

wendler.liftSchedule.assistance.boringButBig.getBbbLiftWeight = function(){
    var bbbPercentage = parseInt(Ext.getCmp('boring-but-big').element.query('[name=bbbPercentage]')[0].value);
    return wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax, bbbPercentage);
};

wendler.liftSchedule.assistance.boringButBig.setupLogData = function () {
    var weight = wendler.liftSchedule.assistance.boringButBig.getBbbLiftWeight();

    Ext.getCmp('boring-but-big-log').setValues({
        sets:5,
        reps:15,
        weight:weight
    });
};

wendler.liftSchedule.assistance.boringButBig.saveAssistanceWork = function () {
    var liftName = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).get('name');

    var assistanceRecord = {
        movement:liftName,
        assistanceType:'BBB',
        sets:5,
        reps:10,
        weight:wendler.liftSchedule.assistance.boringButBig.getBbbLiftWeight(),
        timestamp:new Date().getTime()
    };
    wendler.stores.assistance.ActivityLog.add(assistanceRecord);
    wendler.stores.assistance.ActivityLog.sync();
};

wendler.liftSchedule.assistance.boringButBig.Log = {
    xtype:'formpanel',
    id:'boring-but-big-log',
    scroll:'vertical',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.boringButBig.returnToBbbLift);
            Ext.getCmp('bbb-log-toolbar').setTitle(
                wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).get('name')
            );
            wendler.liftSchedule.assistance.boringButBig.setupLogData();
        }
    },
    items:[
        {
            id:'bbb-log-toolbar',
            docked:'top',
            xtype:'toolbar',
            title:'',
            items:[
                {
                    id:'bbb-log-back-button',
                    ui:'back',
                    text:'Back',
                    handler:wendler.liftSchedule.assistance.boringButBig.returnToBbbLift
                },
                {xtype:'spacer'},
                {
                    id:'boring-but-big-save-log-button',
                    ui:'confirm',
                    text:'Save',
                    handler:wendler.liftSchedule.assistance.boringButBig.saveAndShowTracking
                }
            ]
        },
        {
            xtype:'fieldset',
            style:'margin-top: 0; margin-bottom:7px',
            defaults:{
                labelWidth:'50%'
            },
            items:[
                {
                    name:'sets',
                    xtype:'numberfield',
                    label:'Sets',
                    value:'5'
                },
                {
                    name:'reps',
                    xtype:'numberfield',
                    label:'Reps',
                    value:'10'
                },
                {
                    name:'weight',
                    xtype:'numberfield',
                    label:'Weight'
                }
            ]
        },
        {
            xtype:'panel',
            bodyPadding:0,
            layout:'fit',
            html:'<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                '<div id="bbb-log-notes" class="log-notes"><div class="notes-empty-text">Tap to edit</div></div>',
            listeners:{
                painted:function () {
                    Ext.get('bbb-log-notes').addListener('tap', wendler.liftSchedule.assistance.boringButBig.showNotesEditor);
                }
            }
        }
    ]
};