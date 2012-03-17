"use strict";
Ext.ns('wendler.liftSchedule.controller', 'wendler.views.liftSchedule');

wendler.liftSchedule.controller.showIncreaseMaxesHelpScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('increase-maxes-help'),
        {type:'slide', direction:'right'});
};

wendler.liftSchedule.controller.closeIncreaseMaxesHelpScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lifts-completed'),
        {type:'slide', direction:'left'});
};

wendler.views.liftSchedule.IncreaseMaxesHelp = {
    id:'increase-maxes-help',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.controller.closeIncreaseMaxesHelpScreen);
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Max Increases',
            items:[
                {
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.controller.closeIncreaseMaxesHelpScreen
                }
            ]
        },
        {
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<table style="width:100%"><tbody><tr>' +
                '<td style="width:33%">{name}</td>' +
                '<td style="width:33%;color:green">+{cycleIncrease}</td>' +
                '<td style="width:34%">{max} → {[values.max+values.cycleIncrease]}</td>' +
                '</tr></tbody></table>'
        }
    ]
};