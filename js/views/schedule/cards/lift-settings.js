Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftSchedule');
wendler.liftSchedule.controller.returnToLiftSelectFromSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'up'});
};

wendler.views.liftSchedule.LiftSettings = {
    id:'lift-settings',
    xtype:'panel',
    html:'hello',
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Config',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.controller.returnToLiftSelectFromSettings
                }
            ]
        }
    ]
};