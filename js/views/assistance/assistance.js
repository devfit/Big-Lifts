"use strict";
Ext.define('biglifts.views.Assistance', {
    extend: 'Ext.Panel',
    config: {
        id: 'assistance',
        title: 'Asst.',
        iconCls: 'icnAssistance',
        layout: 'card',
        listeners: {
            initialize: function () {
                this.add([
                    {xtype: 'assistancechooser'},
                    {xtype: 'assistanceliftchooser'},
                    biglifts.views.liftSchedule.assistance.BoringButBig,
                    Ext.create('biglifts.views.BoringButBigMovementEditor'),
                    biglifts.views.liftSchedule.assistance.Bodyweight,
                    biglifts.views.liftSchedule.assistance.BodyweightMovementEditor,
                    biglifts.views.liftSchedule.assistance.Custom,
                    biglifts.views.liftSchedule.assistance.CustomMovementEditor,
                    {
                        xtype: 'boringbutbignotes',
                        id: 'boring-but-big-notes'
                    }
                ]);

                this.setActiveItem(0);
            }
        }
    }
});

