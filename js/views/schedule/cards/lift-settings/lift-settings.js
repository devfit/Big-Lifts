Ext.ns('biglifts.views.liftSchedule', 'biglifts.liftSettings', 'biglifts.liftProgressions');

biglifts.views.liftSchedule.LiftSettings = {
    id:'lift-settings',
    xtype:'carousel',
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.liftSettings.returnToLiftSelectFromSettings);
        }
    },
    defaults:{
        xtype:'formpanel',
        scroll:'vertical'
    },
    items:[
        biglifts.liftSettings.templates.fresher,
        biglifts.liftSettings.templates.heavier,
        biglifts.liftSettings.templates.powerlifting,
        biglifts.liftSettings.templates.rotating,
        biglifts.liftSettings.templates.custom
    ]
};