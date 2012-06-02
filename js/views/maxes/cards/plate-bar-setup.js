Ext.ns('wendler.maxes.barSetup', 'wendler.maxes.controller');

wendler.maxes.barSetup.backButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
};

wendler.maxes.barSetup.platesValueChanged = function (field, newCount) {
    var name = field.getName();
    var plateWeight = parseFloat(name.substring(0, name.indexOf(wendler.maxes.barSetup.PLATE_SUFFIX)));

    var plateRecord = wendler.stores.Plates.findRecord('weightInLbs', plateWeight);
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
    var customPlatesContainer = Ext.getCmp('custom-plates-container');
    if (wendler.stores.BarWeight.first().get('useCustomPlates')) {
        customPlatesContainer.show();
    }
    else {
        customPlatesContainer.hide();
    }
};

wendler.maxes.barSetup.removeLastPlate = function () {
    if (wendler.stores.Plates.getCount() > 0) {
        var lastPlate = wendler.stores.Plates.last();
        wendler.stores.Plates.remove(lastPlate);
        wendler.stores.Plates.sync();
        wendler.maxes.barSetup.setupCustomPlatesFieldSet(Ext.getCmp('plates-setup-fieldset'));
    }
};

wendler.maxes.barSetup.addNewPlate = function () {
    var plateValues = Ext.getCmp('bar-setup-form').getValues();
    var weight = plateValues.newPlateWeight;
    var units = plateValues.newPlateUnits;

    if( weight > 0 ){
        wendler.stores.Plates.add({weight:weight, units:units, count:2});
        wendler.stores.Plates.sync();
        wendler.maxes.barSetup.setupCustomPlatesFieldSet(Ext.getCmp('plates-setup-fieldset'));
    }
};

wendler.maxes.barSetup.PLATE_SUFFIX = '-lbs';

wendler.maxes.barSetup.setupCustomPlatesFieldSet = function (fieldSet) {
    fieldSet.removeAll();
    wendler.stores.Plates.each(function (r) {
        fieldSet.add({
            name:r.get('weight') + wendler.maxes.barSetup.PLATE_SUFFIX,
            xtype:'numberfield',
            label:r.get('weight') + r.get('units'),
            value:r.get('count')
        });
    });
};

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
                    style:'margin-top: 0; margin-bottom: 0.5em',
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
                    id:'custom-plates-container',
                    xtype:'container',
                    hidden:true,
                    items:[
                        {
                            id:'plates-setup-fieldset',
                            xtype:'fieldset',
                            cls:'fieldset-title-no-margin',
                            style:'margin-top: 0; margin-bottom: 0.5em',
                            title:'Weight<span style="float:right">#</span>',
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
                                    wendler.maxes.barSetup.setupCustomPlatesFieldSet(this);
                                }
                            }
                        },
                        {
                            xtype:'button',
                            text:'Remove',
                            ui:'decline',
                            handler:wendler.maxes.barSetup.removeLastPlate
                        },
                        {
                            xtype:'fieldset',
                            style:'margin-top:0.5em; margin-bottom: 0.5em',
                            defaults:{
                                labelWidth:'33%'
                            },
                            items:[
                                {
                                    name:'newPlateWeight',
                                    xtype:'numberfield',
                                    label:'Weight'
                                },
                                {
                                    xtype:'selectfield',
                                    name:'newPlateUnits',
                                    label:"Units",
                                    options:wendler.settings.options.units
                                }
                            ]
                        },
                        {
                            xtype:'button',
                            text:'Add',
                            ui:'confirm',
                            handler:wendler.maxes.barSetup.addNewPlate
                        }
                    ]
                }
            ]
        }
    ]
};