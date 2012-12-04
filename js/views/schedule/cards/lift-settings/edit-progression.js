"use strict";
Ext.ns('biglifts.views', 'biglifts.settings.liftPercentages', 'biglifts.liftPercentages');

biglifts.settings.liftPercentages.getCurrentProgression = function () {
    var progressionIndex = biglifts.stores.lifts.LiftProgression.findBy(function (r) {
        return r.data.set == biglifts.settings.liftPercentages.currentSet && r.data.week == biglifts.settings.liftPercentages.currentWeek;
    });
    return biglifts.stores.lifts.LiftProgression.getAt(progressionIndex);
};

biglifts.liftPercentages.setupEditLiftProgression = function () {
    var progression = biglifts.settings.liftPercentages.getCurrentProgression();
    Ext.get('edit-progression-title').setHtml('Week ' + biglifts.settings.liftPercentages.currentWeek + ", Set " + biglifts.settings.liftPercentages.currentSet);
    Ext.getCmp('edit-progression').setRecord(progression);
};

biglifts.liftPercentages.showEditLiftProgression = function (currentSet) {
    if (currentSet) {
        biglifts.settings.liftPercentages.currentSet = currentSet;
    }

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-progression'));
};

biglifts.liftPercentages.returnToLiftSettings = function () {
    var progression = biglifts.settings.liftPercentages.getCurrentProgression();
    var values = Ext.getCmp('edit-progression').getValues();
    progression.set('percentage', values.percentage);
    progression.set('reps', values.reps);
    progression.set('amrap', values.amrap);
    progression.set('warmup', values.warmup);
    biglifts.stores.lifts.LiftProgression.sync();

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'));
};

biglifts.views.EditProgression = {
    xtype:'formpanel',
    id:'edit-progression',
    listeners:{
        painted:function () {
            biglifts.navigation.setBackFunction(biglifts.liftPercentages.returnToLiftSettings);
            biglifts.liftPercentages.setupEditLiftProgression();
        }
    },
    items:[
        {
            id:'edit-progression-toolbar',
            xtype:'toolbar',
            docked:'top',
            title:'Edit',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Back',
                    handler:biglifts.liftPercentages.returnToLiftSettings
                }
            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            style:'margin-top: 0px',
            title:"<div id='edit-progression-title'>Week 1, Set 1</div>",
            defaults:{
                labelWidth:'50%'
            },
            items:[
                {
                    id:'reps-edit-input',
                    xtype:'numberfield',
                    name:'reps',
                    label:'Reps'
                },
                {
                    xtype:'checkboxfield',
                    label:'AMRAP',
                    name:'amrap'
                },
                {
                    xtype:'checkboxfield',
                    label:'Warmup',
                    name:'warmup'
                },
                {
                    id:'percentage-edit-input',
                    xtype:'numberfield',
                    name:'percentage',
                    label:'Percentage'
                }
            ]
        }
    ]
};