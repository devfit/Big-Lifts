"use strict";
Ext.ns('wendler.views', 'wendler.settings.liftPercentages', 'wendler.controller.liftPercentages');

wendler.controller.liftPercentages.setupAndShowEditLiftPercentages = function (week, set) {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-percentage'), {type:'slide', direction:'left'});
};

wendler.controller.liftPercentages.returnToLiftSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'), {type:'slide', direction:'right'});
};

wendler.views.EditPercentage = {
    id:'edit-percentage',
    dockedItems:[
        {
            id: 'edit-percentage-toolbar',
            xtype:'toolbar',
            title: '',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Back',
                    handler:wendler.controller.liftPercentages.returnToLiftSettings
                }
            ]
        }
    ]
};