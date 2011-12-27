"use strict";
Ext.ns('wendler.liftSchedule.controller', 'wendler.views.liftSchedule');

wendler.liftSchedule.controller.closeIncreaseMaxesHelpScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lifts-completed'),
        {type:'slide', direction:'down'});
};

wendler.views.liftSchedule.IncreaseMaxesHelp = {
    id:'increase-maxes-help',
    xtype:'panel',
    items:[
        {
            html: 'huzzah'
        }
    ]
};