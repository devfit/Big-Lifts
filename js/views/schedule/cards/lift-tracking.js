"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftTracking');

wendler.controller.liftTracking.returnToLiftTemplate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'right'});
};

wendler.views.liftSchedule.LiftTracking = {
    xtype:'formpanel',
    id:'lift-tracking',
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Log',
            items:[
                {
                    ui:'back',
                    text:'Back',
                    handler:wendler.controller.liftTracking.returnToLiftTemplate
                },
                {xtype:'spacer'},
                {
                    ui:'action',
                    text:'Save'
                }
            ]
        }
    ],
    items:[
        {
            xtype:'fieldset',
            style:'margin-top: 0',
            items:[
                {
                    //TODO: pre-populate reps with prescribed
                    id: 'last-set-reps',
                    xtype:'numberfield',
                    label:'Last set reps'
                }
            ]
        }
    ]
};