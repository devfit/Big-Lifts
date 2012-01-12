"use strict";
Ext.ns('wendler.views', 'wendler.settings.liftPercentages', 'wendler.controller.liftPercentages');

wendler.settings.liftPercentages.getCurrentProgression = function () {
    var progressionIndex = wendler.stores.lifts.LiftProgression.findBy(function (r) {
        return r.data.set == wendler.settings.liftPercentages.currentSet && r.data.week == wendler.settings.liftPercentages.currentWeek;
    });
    return wendler.stores.lifts.LiftProgression.getAt(progressionIndex);
}
wendler.controller.liftPercentages.setupEditLiftProgression = function () {
    Ext.getCmp('edit-percentage')._rendered = true;
    var progression = wendler.settings.liftPercentages.getCurrentProgression();
    Ext.get('edit-percentage-label').setHTML('Week ' + wendler.settings.liftPercentages.currentWeek + ", Set " + wendler.settings.liftPercentages.currentSet);
    Ext.getCmp('percentage-edit-input').setValue(progression.data.percentage);
};

wendler.controller.liftPercentages.showEditLiftProgression = function (week, set) {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-percentage'), {type:'slide', direction:'left'});
};

wendler.controller.liftPercentages.saveAndReturnToLiftSettings = function () {
    var progression = wendler.settings.liftPercentages.getCurrentProgression();
    var newPercentage = Ext.getCmp('percentage-edit-input').getValue();
    progression.set('percentage', newPercentage);
    progression.save();
    wendler.controller.liftPercentages.returnToLiftSettings();
};

wendler.controller.liftPercentages.returnToLiftSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'), {type:'slide', direction:'right'});
};

wendler.views.EditPercentage = {
    xtype:'formpanel',
    id:'edit-percentage',
    _rendered:false,
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.controller.liftPercentages.returnToLiftSettings);
            if (this._rendered) {
                wendler.controller.liftPercentages.setupEditLiftProgression();
            }
        },
        afterlayout:wendler.controller.liftPercentages.setupEditLiftProgression
    },
    dockedItems:[
        {
            id:'edit-percentage-toolbar',
            xtype:'toolbar',
            title:'Percentages',
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
        }
    ],
    items:[
        {
            xtype:'fieldset',
            style:'margin-top: 0px',
            items:[
                {
                    id:'percentage-edit-input',
                    xtype:'numberfield',
                    labelWidth:'50%',
                    label:'<div id="edit-percentage-label"></div>'
                }
            ]
        }
    ]
};