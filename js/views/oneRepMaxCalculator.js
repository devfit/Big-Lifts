"use strict";
Ext.ns('biglifts', 'biglifts.views', 'biglifts.oneRepMax', 'biglifts.oneRepMax');

biglifts.oneRepMax.estimateOneRepMax = function () {
    var weight = Ext.getCmp('one-rep-weight').getValue();
    var reps = Ext.getCmp('one-rep-reps').getValue();
    var estimate = util.formulas.estimateOneRepMax(weight, reps);
    Ext.getCmp('one-rep-estimate').setValue(estimate);
};

biglifts.oneRepMax.useEstimateForLift = function () {
    var lift = Ext.getCmp('use-lift-select').getValue();
    var estimate = Ext.getCmp('one-rep-estimate').getValue();

    var maxesInput = Ext.getCmp('maxes-' + lift);
    maxesInput.setValue(estimate);
    maxesInput.fireEvent('change', maxesInput, estimate);

    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('maxes-panel'), {
        type:'slide',
        direction:'left'
    });
};

Ext.define('biglifts.views.OneRepMaxCalculator', {
    extend:'Ext.Panel',
    config:{
        id:'one-rep-max-calculator',
        title:'1-Rep',
        iconCls:'search',
        listeners:{
            show:function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize:biglifts.oneRepMax.estimateOneRepMax
        },
        layout:'fit',
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                title:"1-Rep Calc"
            },
            {
                xtype:'formpanel',
                scroll:'vertical',
                items:[
                    {
                        xtype:'fieldset',
                        instructions:'Weight*(1+Reps*0.033)',
                        margin:'0',
                        style:'margin-top: 0',
                        defaults:{
                            labelWidth:'35%',
                            listeners:{
                                change:biglifts.oneRepMax.estimateOneRepMax
                            }
                        },
                        items:[
                            {
                                id:'one-rep-weight',
                                xtype:'numberfield',
                                name:'weight',
                                label:'Weight',
                                value:200
                            },
                            {
                                id:'one-rep-reps',
                                xtype:'numberfield',
                                name:'reps',
                                label:'Reps',
                                value:10
                            },
                            {
                                xtype:'spacer',
                                height:7,
                                style:'background-color: #36393D'
                            },
                            {
                                id:'one-rep-estimate',
                                xtype:'numberfield',
                                name:'calculatedMax',
                                label:'Max',
                                cls:'one-rep-max-estimate',
                                readOnly:true
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        title:'Use For...',
                        instructions:'Auto-fill max',
                        margin:'0',
                        items:[
                            {
                                id:'use-lift-select',
                                name:'use-for-lift-select',
                                xtype:'selectfield',
                                valueField:'propertyName',
                                displayField:'name',
                                label:'Lift',
                                store:biglifts.stores.lifts.Lifts
                            },
                            {
                                xtype:'spacer',
                                height:15
                            },
                            {
                                xtype:'button',
                                id:'use-max-button',
                                text:'Use Max',
                                handler:biglifts.oneRepMax.useEstimateForLift
                            }
                        ]
                    }
                ]
            }
        ]
    }
});