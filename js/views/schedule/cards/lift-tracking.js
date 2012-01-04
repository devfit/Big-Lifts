"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftTracking');

wendler.controller.liftTracking.returnToLiftTemplate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'right'});
};

wendler.controller.liftTracking.showLiftTracking = function () {
    var lastSetReps = wendler.stores.lifts.LiftProgression.findRecord('set', 6).data.reps;
    Ext.getCmp('last-set-reps').setValue(lastSetReps);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-tracking'), {type:'slide', direction:'left'});
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
                    id:'last-set-reps',
                    xtype:'numberfield',
                    label:'Last set reps'
                }
            ]
        }
    ]
};