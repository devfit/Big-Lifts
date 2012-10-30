"use strict";
Ext.define('biglifts.views.Assistance', {
    extend:'Ext.Panel',
    config:{
        id:'assistance',
        title:'Asst.',
        iconCls:'icnAssistance',
        layout:'card',
        activeItem:0,
        items:[
            {xtype:'assistancechooser'},
            {xtype:'assistanceliftchooser'},
            biglifts.views.liftSchedule.assistance.BoringButBig,
            biglifts.views.liftSchedule.assistance.BoringButBigMovementEditor,
            biglifts.views.liftSchedule.assistance.Bodyweight,
            biglifts.views.liftSchedule.assistance.BodyweightMovementEditor,
            biglifts.views.liftSchedule.assistance.Custom,
            biglifts.views.liftSchedule.assistance.CustomMovementEditor,
            {
                xtype:'boringbutbignotes',
                id:'boring-but-big-notes'
            }
        ]
    }
});

