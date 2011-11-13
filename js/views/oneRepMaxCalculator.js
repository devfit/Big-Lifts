"use strict";
Ext.ns('wendler', 'wendler.views', 'wendler.oneRepMax', 'wendler.oneRepMax.options', 'wendler.oneRepMax.controller');

wendler.oneRepMax.controller.buildLiftOptions = function() {
    var options = [];
    wendler.stores.lifts.Lifts.each(function(r) {
        options.push({text:r.data.name, value: r.data.propertyName});
    });
    Ext.getCmp('use-lift-select').setOptions(options);

};
wendler.appLoadCallbackFunctions.push(wendler.oneRepMax.controller.buildLiftOptions);


wendler.oneRepMax.controller.estimateOneRepMax = function() {
    var weight = Ext.getCmp('one-rep-weight').getValue();
    var reps = Ext.getCmp('one-rep-reps').getValue();
    var estimate = weight * (1 + reps * 0.033);
    Ext.getCmp('one-rep-estimate').setValue(estimate);
};

wendler.oneRepMax.controller.useEstimateForLift = function() {
    var lift = Ext.getCmp('use-lift-select').getValue();
    var estimate = Ext.getCmp('one-rep-estimate').getValue();

    var maxesInput = Ext.getCmp('maxes-' + lift);
    maxesInput.setValue(estimate);
    maxesInput.fireEvent('change', maxesInput, estimate);

    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('maxes-panel'), {
        type : 'slide',
        direction : 'left'
    });
};

wendler.views.OneRepMaxCalculator = Ext.extend(Ext.Panel, {
    title: '1-Rep Calc',
    iconCls: 'search',
    scroll: 'vertical',
    listeners:{
        afterlayout: wendler.oneRepMax.controller.estimateOneRepMax
    },
    dockedItems:[
        {
            dock: 'top',
            xtype: 'toolbar',
            title: "1-Rep Calc"
        }
    ],
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'fieldset',
                    instructions: 'Weight*(1+Reps*0.033)',
                    margin: '0',
                    style: 'margin-top: 0',
                    defaults: {
                        labelWidth: '35%',
                        listeners:{
                            change: wendler.oneRepMax.controller.estimateOneRepMax
                        }
                    },
                    items: [
                        {
                            id: 'one-rep-weight',
                            xtype: 'numberfield',
                            name: 'weight',
                            label: 'Weight',
                            value: 200
                        },
                        {
                            id: 'one-rep-reps',
                            xtype: 'numberfield',
                            name: 'reps',
                            label: 'Reps',
                            value: 10
                        },
                        {
                            xtype: 'spacer',
                            height: 7,
                            style: 'background-color: #36393D'
                        },
                        {
                            id: 'one-rep-estimate',
                            xtype: 'numberfield',
                            name: 'calculatedMax',
                            label: 'Max',
                            disabled: true,
                            disabledCls: 'disabledVisible'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Use For...',
                    instructions: 'Auto-fill max',
                    margin: '0',
                    items: [
                        {
                            id: 'use-lift-select',
                            name: 'use-for-lift-select',
                            xtype: 'selectfield',
                            label: 'Lift',
                            options: []
                        },
                        {
                            xtype: 'spacer',
                            height: 15
                        },
                        {
                            xtype: 'button',
                            name: 'use-button',
                            text: 'Use Max',
                            handler: wendler.oneRepMax.controller.useEstimateForLift
                        }
                    ]
                }
            ]
        }
    ]
});