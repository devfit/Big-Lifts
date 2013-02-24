"use strict";
Ext.define('biglifts.views.Assistance', {
    extend:'Ext.Panel',
    getRestTimer:function () {
        return this.restTimer;
    },
    doLastAssistanceFor:function (liftRecord) {

    },
    config:{
        id:'assistance',
        title:'Asst.',
        iconCls:'icnAssistance',
        layout:'card',
        listeners:{
            initialize:function () {
                this.assistanceChooser = Ext.create('biglifts.views.AssistanceChooser');
                this.assistanceLiftChooser = Ext.create('biglifts.views.AssistanceLiftChooser');
                this.boringButBig = Ext.create('biglifts.views.BoringButBig');
                this.add(Ext.create('biglifts.views.BoringButBigMovementEditor'));

                this.bodyweight = this.add(Ext.create('biglifts.views.BodyWeight'));
                this.add(Ext.create('BodyweightMovementEditor'));

                this.triumvirate = this.add(Ext.create('biglifts.views.Triumvirate'));
                this.add(Ext.create('TriumvirateMovementEditor'));

                this.add({
                    xtype:'boringbutbignotes',
                    id:'boring-but-big-notes'
                });

                this.sst = this.add(Ext.create('biglifts.views.SimplestStrengthTemplate'));
                this.add(Ext.create('biglifts.views.SimplestStrengthTemplateMaxes'));
                this.add(Ext.create('biglifts.views.SimplestStrengthTemplateEditLift'));

                this.restTimer = this.add(Ext.create('biglifts.views.RestTimer'));

                this.setActiveItem(0);
            }
        }
    }
});

