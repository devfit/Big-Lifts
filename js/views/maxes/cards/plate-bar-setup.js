Ext.ns('biglifts.maxes.barSetup', 'biglifts.maxes.controller');

biglifts.maxes.barSetup.backButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
};

biglifts.maxes.barSetup.platesValueChanged = function (field, newCount) {
    var name = field.getName();
    var plateWeight = parseFloat(name.substring(0, name.indexOf(biglifts.maxes.barSetup.PLATE_SUFFIX)));

    var plateRecord = biglifts.stores.Plates.findRecord('weight', plateWeight);
    plateRecord.set('count', newCount);
    plateRecord.save();
};

biglifts.maxes.barSetup.barValueChanged = function () {
    var barPlateValues = Ext.getCmp('bar-setup-form').getValues();
    var barWeight = biglifts.stores.BarWeight.first();
    barWeight.set(barPlateValues);
    barWeight.save();
};

biglifts.maxes.barSetup.removeLastPlate = function () {
    if (biglifts.stores.Plates.getCount() > 0) {
        var lastPlate = biglifts.stores.Plates.last();
        biglifts.stores.Plates.remove(lastPlate);
        biglifts.stores.Plates.sync();
        biglifts.maxes.barSetup.setupCustomPlatesFieldSet(Ext.getCmp('plates-setup-fieldset'));
    }
};

biglifts.maxes.barSetup.addNewPlate = function () {
    var plateValues = Ext.getCmp('bar-setup-form').getValues();
    var weight = plateValues.newPlateWeight;

    var recordExists = biglifts.stores.Plates.findBy(function (p) {
        return p.get('weight') == weight;
    }) !== -1;

    if (weight > 0 && !recordExists) {
        biglifts.stores.Plates.add({weight:weight, count:2});
        biglifts.stores.Plates.sync();
        biglifts.maxes.barSetup.setupCustomPlatesFieldSet(Ext.getCmp('plates-setup-fieldset'));
    }
};

biglifts.maxes.barSetup.PLATE_SUFFIX = '-lbs';

biglifts.maxes.barSetup.setupCustomPlatesFieldSet = function (fieldSet) {
    if (fieldSet) {
        var settings = biglifts.stores.Settings.first();
        fieldSet.removeAll();
        biglifts.stores.Plates.each(function (r) {
            fieldSet.add({
                name:r.get('weight') + biglifts.maxes.barSetup.PLATE_SUFFIX,
                xtype:'numberfield',
                label:r.get('weight') + settings.get('units'),
                value:r.get('count')
            });
        });
    }
};

biglifts.maxes.barSetup.platesAreDefault = function (comparisonPlates) {
    var actualPlateWeights = [];
    biglifts.stores.Plates.each(function (p) {
        actualPlateWeights.push({weight:p.get('weight'), count:p.get('count')});
    });

    return _.isEqual(actualPlateWeights, comparisonPlates);
};

biglifts.maxes.barSetup.adjustPlatesForUnits = function (units) {
    if (units == 'kg' && biglifts.maxes.barSetup.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_LBS)) {
        biglifts.stores.Plates.removeAll();
        biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_KG);
    }
    else if (units == 'lbs' && biglifts.maxes.barSetup.platesAreDefault(biglifts.stores.Plates.DEFAULT_PLATES_KG)) {
        biglifts.stores.Plates.removeAll();
        biglifts.stores.Plates.add(biglifts.stores.Plates.DEFAULT_PLATES_LBS);
    }

    var barWeight = biglifts.stores.BarWeight.first();
    if (units === 'kg' && barWeight.get('weight') === 45) {
        barWeight.set('weight', 20.4);
    }
    else if (units === 'kg' && barWeight.get('weight') === 20.4) {
        barWeight.set('weight', 45);
    }

    biglifts.maxes.barSetup.setupCustomPlatesFieldSet(Ext.getCmp('plates-setup-fieldset'));
};

biglifts.maxes.barSetup.BarSetup = {
    xtype:'panel',
    id:'bar-plate-setup-panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.maxes.barSetup.backButtonPressed);
            Ext.getCmp('bar-setup-form').setRecord(biglifts.stores.BarWeight.first());
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
                    handler:biglifts.maxes.barSetup.backButtonPressed,
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
                            change:biglifts.maxes.barSetup.barValueChanged
                        }
                    },
                    items:[
                        {
                            xtype:'numberfield',
                            name:'weight',
                            label:'Bar Weight'
                        }
                    ]
                },
                {
                    id:'custom-plates-container',
                    xtype:'container',
                    items:[
                        {
                            id:'plates-setup-fieldset',
                            xtype:'fieldset',
                            cls:'fieldset-title-no-margin',
                            style:'margin-top: 0; margin-bottom: 0.5em',
                            title:'Plates<span style="float:right">#</span>',
                            defaults:{
                                autoCapitalize:false,
                                autoCorrect:false,
                                autoComplete:false,
                                labelWidth:'50%',
                                listeners:{
                                    change:biglifts.maxes.barSetup.platesValueChanged
                                }
                            },
                            listeners:{
                                initialize:function () {
                                    biglifts.maxes.barSetup.setupCustomPlatesFieldSet(this);
                                }
                            }
                        },
                        {
                            id:'remove-custom-plate-button',
                            xtype:'button',
                            text:'Remove',
                            ui:'decline',
                            handler:biglifts.maxes.barSetup.removeLastPlate
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
                                }
                            ]
                        },
                        {
                            id:'add-new-custom-plate-button',
                            xtype:'button',
                            text:'Add',
                            ui:'confirm',
                            handler:biglifts.maxes.barSetup.addNewPlate
                        }
                    ]
                }
            ]
        }
    ]
};