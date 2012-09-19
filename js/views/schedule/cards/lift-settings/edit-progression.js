"use strict";
Ext.ns('wendler.views', 'wendler.settings.liftPercentages', 'wendler.liftPercentages');

wendler.settings.liftPercentages.getCurrentProgression = function () {
    var progressionIndex = wendler.stores.lifts.LiftProgression.findBy(function (r) {
        return r.data.set == wendler.settings.liftPercentages.currentSet && r.data.week == wendler.settings.liftPercentages.currentWeek;
    });
    return wendler.stores.lifts.LiftProgression.getAt(progressionIndex);
};

wendler.liftPercentages.setupEditLiftProgression = function () {
    var progression = wendler.settings.liftPercentages.getCurrentProgression();
    Ext.get('edit-progression-title').setHtml('Week ' + wendler.settings.liftPercentages.currentWeek + ", Set " + wendler.settings.liftPercentages.currentSet);
    Ext.getCmp('edit-progression').setRecord(progression);
};

wendler.liftPercentages.showEditLiftProgression = function (currentSet) {
    if (currentSet) {
        wendler.settings.liftPercentages.currentSet = currentSet;
    }

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-progression'), {type:'slide', direction:'left'});
};

wendler.liftPercentages.returnToLiftSettings = function () {
    var progression = wendler.settings.liftPercentages.getCurrentProgression();
    var values = Ext.getCmp('edit-progression').getValues();
    progression.set('percentage', values.percentage);
    progression.set('reps', values.reps);
    progression.set('amrap', values.amrap);
    progression.set('warmup', values.warmup);
    progression.save();

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'), {type:'slide', direction:'right'});
};

wendler.views.EditProgression = {
    xtype:'formpanel',
    id:'edit-progression',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftPercentages.returnToLiftSettings);
            wendler.liftPercentages.setupEditLiftProgression();
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
                    handler:wendler.liftPercentages.returnToLiftSettings
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