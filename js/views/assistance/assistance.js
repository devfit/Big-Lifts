"use strict";
Ext.define('biglifts.views.Assistance', {
    extend: 'Ext.Panel',
    getRestTimer: function () {
        return this.restTimer;
    },
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
                    Ext.create('biglifts.views.BoringButBig'),
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

                this.add(Ext.create('biglifts.views.SimplestStrengthTemplate'));

                this.restTimer = this.add(Ext.create('biglifts.views.RestTimer'));

                this.setActiveItem(0);
            }
        }
    }
});

