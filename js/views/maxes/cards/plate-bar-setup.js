Ext.ns('wendler.maxes.barSetup', 'wendler.maxes.controller');

wendler.maxes.barSetup.backButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
};

wendler.maxes.barSetup.platesValueChanged = function (field, newCount) {
    var name = field.getName();
    var plateWeight = parseFloat(name.substring(0,name.indexOf(wendler.maxes.barSetup.PLATE_SUFFIX)));

    var plateRecord = wendler.stores.Plates.findRecord('weightInLbs',plateWeight);
    plateRecord.set('count', newCount);
    plateRecord.save();
};

wendler.maxes.barSetup.barValueChanged = function () {
    var barPlateValues = Ext.getCmp('bar-setup-form').getValues();
    var barWeight = wendler.stores.BarWeight.first();
    barWeight.set(barPlateValues);
    barWeight.save();
    wendler.maxes.barSetup.showHidePlateSetup();
};

wendler.maxes.barSetup.showHidePlateSetup = function () {
    if (wendler.stores.BarWeight.first().get('useCustomPlates')) {
        Ext.getCmp('plates-setup-fieldset').show();
    }
    else {
        Ext.getCmp('plates-setup-fieldset').hide();
    }
};

wendler.maxes.barSetup.PLATE_SUFFIX = '-lbs';

wendler.maxes.barSetup.BarSetup = {
    xtype:'panel',
    id:'bar-plate-setup-panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.maxes.barSetup.backButtonPressed);
            Ext.getCmp('bar-setup-form').setRecord(wendler.stores.BarWeight.first());
            wendler.maxes.barSetup.showHidePlateSetup();
        }
    },
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Bar/Plates",
            items:[
                {
                    id:'bar-setup-back-button',
                    text:'Back',
                    handler:wendler.maxes.barSetup.backButtonPressed,
                    ui:'back'
                }
            ]
        },
        {
            xtype:'formpanel',
            id:'bar-setup-form',
            items:[
                {
                    id:'bar-setup-fieldset',
                    xtype:'fieldset',
                    style:'margin-top: 0',
                    defaults:{
                        autoCapitalize:false,
                        autoCorrect:false,
                        autoComplete:false,
                        labelWidth:'50%',
                        listeners:{
                            change:wendler.maxes.barSetup.barValueChanged
                        }
                    },
                    items:[
                        {
                            xtype:'numberfield',
                            name:'weight',
                            label:'Bar Weight'
                        },
                        {
                            id:'use-custom-plates-toggle',
                            xtype:'togglefield',
                            name:'useCustomPlates',
                            label:'Custom Plates?'
                        }
                    ]
                },
                {
                    id:'plates-setup-fieldset',
                    hidden:true,
                    xtype:'fieldset',
                    cls:'fieldset-title-no-margin',
                    style:'margin-top: 0',
                    title:'Plates',
                    defaults:{
                        autoCapitalize:false,
                        autoCorrect:false,
                        autoComplete:false,
                        labelWidth:'50%',
                        listeners:{
                            change:wendler.maxes.barSetup.platesValueChanged
                        }
                    },
                    listeners:{
                        initialize:function () {
                            var fieldSet = this;
                            wendler.stores.Plates.each(function (r) {
                                fieldSet.add({
                                    name:r.get('weightInLbs') + wendler.maxes.barSetup.PLATE_SUFFIX,
                                    xtype:'numberfield',
                                    label:r.get('weightInLbs') + "lbs/" + util.formulas.lbsToKg(r.get('weightInLbs')) + "kg",
                                    value:r.get('count')
                                });
                            })
                        }
                    }
                }
            ]
        }
    ]
};