"use strict";
Ext.ns('wendler.views', 'wendler.settings.liftPercentages', 'wendler.controller.liftPercentages');

wendler.settings.liftPercentages.getCurrentProgression = function () {
    var progressionIndex = wendler.stores.lifts.LiftProgression.findBy(function (r) {
        return r.data.set == wendler.settings.liftPercentages.currentSet && r.data.week == wendler.settings.liftPercentages.currentWeek;
    });
    return wendler.stores.lifts.LiftProgression.getAt(progressionIndex);
};

wendler.controller.liftPercentages.setupEditLiftProgression = function () {
    var progression = wendler.settings.liftPercentages.getCurrentProgression();
    Ext.get('edit-progression-title').setHtml('Week ' + wendler.settings.liftPercentages.currentWeek + ", Set " + wendler.settings.liftPercentages.currentSet);
    Ext.getCmp('reps-edit-input').setValue(progression.data.reps);
    Ext.getCmp('percentage-edit-input').setValue(progression.data.percentage);
};

wendler.controller.liftPercentages.showEditLiftProgression = function (week, set) {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-percentage'), {type:'slide', direction:'left'});
};

wendler.controller.liftPercentages.saveAndReturnToLiftSettings = function () {
    var progression = wendler.settings.liftPercentages.getCurrentProgression();
    var newPercentage = Ext.getCmp('percentage-edit-input').getValue();
    var newReps = Ext.getCmp('reps-edit-input').getValue();
    progression.set('percentage', newPercentage);
    progression.set('reps', newReps);
    progression.save();
    wendler.controller.liftPercentages.returnToLiftSettings();
};

wendler.controller.liftPercentages.returnToLiftSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'), {type:'slide', direction:'right'});
};

wendler.views.EditPercentage = {
    xtype:'formpanel',
    id:'edit-percentage',
    bodyStyle:'padding-top: 0px',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.controller.liftPercentages.returnToLiftSettings);
            wendler.controller.liftPercentages.setupEditLiftProgression();
        }
    },
    items:[
        {
            id:'edit-percentage-toolbar',
            xtype:'toolbar',
            docked:'top',
            title:'Progression',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Cancel',
                    handler:wendler.controller.liftPercentages.returnToLiftSettings
                },
                {
                    xtype:'spacer'
                },
                {
                    id:'edit-percentage-save-button',
                    xtype:'button',
                    ui:'action',
                    text:'Save',
                    handler:wendler.controller.liftPercentages.saveAndReturnToLiftSettings
                }
            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            style:'margin-top: 0px',
            title:"<div id='edit-progression-title'>Week 1, Set 1</div>",
            items:[
                {
                    id:'reps-edit-input',
                    xtype:'numberfield',
                    labelWidth:'50%',
                    label:'Reps'
                },
                {
                    id:'percentage-edit-input',
                    xtype:'numberfield',
                    labelWidth:'50%',
                    label:'Percentage'
                }
            ]
        }
    ]
};