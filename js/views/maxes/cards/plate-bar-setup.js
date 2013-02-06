Ext.define('biglifts.views.BarSetup', {
    extend:'Ext.Panel',
    PLATE_SUFFIX:'-lbs',
    platesValueChanged:function (field, newCount) {
        var name = field.getName();
        var plateWeight = parseFloat(name.substring(0, name.indexOf(this.PLATE_SUFFIX)));
        var plateRecord = biglifts.stores.Plates.findRecordByWeight(plateWeight);
        plateRecord.set('count', newCount);
        biglifts.stores.Plates.sync();
    },
    barValueChanged:function () {
        var barWeight = biglifts.stores.BarWeight.first();
        barWeight.set(this.barSetupForm.getValues());
        biglifts.stores.BarWeight.sync();
    },
    setupCustomPlatesFieldSet:function () {
        var me = this;
        var fieldSet = me.down('#plates-setup-fieldset');
        if (fieldSet) {
            fieldSet.removeAll();
            biglifts.stores.Plates.each(function (r) {
                fieldSet.add({
                    name:r.get('weight') + me.PLATE_SUFFIX,
                    xtype:'numberfield',
                    label:r.get('weight') + biglifts.stores.GlobalSettings.getUnits(),
                    value:r.get('count')
                });
            });
        }
    },
    removeLastPlate:function () {
        if (biglifts.stores.Plates.getCount() > 0) {
            var lastPlate = biglifts.stores.Plates.last();
            biglifts.stores.Plates.remove(lastPlate);
            biglifts.stores.Plates.sync();
        }
    },
    addNewPlate:function () {
        var weight = this.barSetupForm.getValues().newPlateWeight;
        var recordExists = biglifts.stores.Plates.findRecordByWeight(weight) !== null;
        if (weight > 0 && !recordExists) {
            biglifts.stores.Plates.add({weight:weight, count:2});
            biglifts.stores.Plates.sync();
        }
    },
    setBarWeightInput:function () {
        this.barWeightInput.setValue(biglifts.stores.BarWeight.first().get('weight'));
    },
    bindListeners:function () {
        biglifts.stores.BarWeight.addListener('beforesync', this.setBarWeightInput, this);
    },
    destroyListeners:function () {
        biglifts.stores.BarWeight.removeListener('beforesync', this.setBarWeightInput, this);
    },
    reloadData:function () {
        this.setupCustomPlatesFieldSet();
        this.setBarWeightInput();
    },
    config:{
        backFunction:null,
        layout:'fit',
        listeners:{
            painted:function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.getBackFunction(), this));
                this.reloadData();

                if (!this._painted) {
                    this._painted = true;
                    this.bindListeners();
                }
            },
            destroy:function () {
                this.destroyListeners();
            },
            initialize:function () {
                var me = this;
                me.add({
                    xtype:'toolbar',
                    docked:'top',
                    title:"Bar/Plates",
                    items:[
                        {
                            text:'Back',
                            handler:Ext.bind(me.getBackFunction(), me),
                            ui:'back'
                        }
                    ]
                });
                this.barSetupForm = me.add({
                    xtype:'formpanel'
                });

                this.barSetupFieldset = this.barSetupForm.add({
                    xtype:'fieldset',
                    style:'margin-top: 0; margin-bottom: 0.5em',
                    defaults:{
                        autoCapitalize:false,
                        autoCorrect:false,
                        autoComplete:false,
                        labelWidth:'50%',
                        listeners:{
                            change:Ext.bind(me.barValueChanged, me)
                        }
                    }
                });

                this.barWeightInput = this.barSetupFieldset.add({
                    xtype:'numberfield',
                    name:'weight',
                    label:'Bar Weight'
                });

                this.barSetupForm.add([
                    {
                        xtype:'container',
                        items:[
                            {
                                itemId:'plates-setup-fieldset',
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
                                        change:Ext.bind(me.platesValueChanged, me)
                                    }
                                },
                                listeners:{
                                    painted:function () {
                                        var fieldset = this;
                                        if (!this._painted) {
                                            this._painted = true;
                                            me.setupCustomPlatesFieldSet();
                                            biglifts.stores.Plates.addListener('beforesync', Ext.bind(me.setupCustomPlatesFieldSet, me));
                                        }
                                    }
                                }
                            },
                            {
                                xtype:'button',
                                text:'Remove',
                                ui:'decline',
                                handler:Ext.bind(me.removeLastPlate, me)
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
                                xtype:'button',
                                text:'Add',
                                ui:'confirm',
                                handler:Ext.bind(me.addNewPlate, me)
                            }
                        ]
                    }
                ]);
            }
        }
    }
});