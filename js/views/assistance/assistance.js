"use strict";
Ext.define('biglifts.views.Assistance', {
    extend:'Ext.Panel',
    getRestTimer:function () {
        return this.restTimer;
    },
    doLastAssistanceFor:function (liftRecord) {
        this.assistanceLiftChooser.setCurrentLift(liftRecord);
        var assistanceType = biglifts.stores.assistance.ActivityLog.getLastAssistanceType();
        var assistanceMapping = {
            'BBB':this.boringButBig,
            'SST':this.sst,
            'Custom':this.triumvirate,
            'Bodyweight':this.bodyweight
        };

        var nextAssistance = assistanceMapping[assistanceType];
        if (nextAssistance) {
            this.setActiveItem(nextAssistance);
        }
        else {
            this.setActiveItem(this.assistanceChooser);
        }
        Ext.getCmp('main-tab-panel').setActiveItem(this);
    },
    config:{
        id:'assistance',
        title:'Asst.',
        iconCls:'icnAssistance',
        layout:'card',
        listeners:{
            initialize:function () {
                this.assistanceChooser = this.add(Ext.create('biglifts.views.AssistanceChooser'));
                this.assistanceLiftChooser = this.add(Ext.create('biglifts.views.AssistanceLiftChooser'));
                this.boringButBig = this.add(Ext.create('biglifts.views.BoringButBig'));
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

