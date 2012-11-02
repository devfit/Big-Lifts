"use strict";
Ext.ns('biglifts.maxes.cards', 'biglifts.maxes.controller', 'biglifts.editLift');

biglifts.maxes.currentEditingLiftProperty = null;

biglifts.maxes.editLiftBackButtonPressed = function () {
    var formValues = Ext.getCmp('edit-lift-form').getValues();
    formValues.name = formValues.name.trim();
    formValues.propertyName = biglifts.models.Lift.sanitizePropertyName(formValues.name);

    var currentModel = biglifts.maxes.controller.getCurrentLiftModel();
    formValues.order = currentModel.get('order');

    var newLiftModel = Ext.create('Lift', formValues);
    var errors = newLiftModel.validate();

    if (errors.isValid()) {
        newLiftModel.set('id', currentModel.data.id);

        biglifts.editLift.updateAssociatedLiftCompletion(currentModel.get('propertyName'), newLiftModel.get('propertyName'));

        var somethingSaved = false;
        for (var key in newLiftModel.getData()) {
            var currentValue = currentModel.get(key);
            var newValue = newLiftModel.get(key);
            if (currentValue !== newValue) {
                somethingSaved = true;
                currentModel.set(key, newLiftModel.get(key));
                currentModel.save();
            }
        }

        biglifts.stores.lifts.Lifts.sync();
        biglifts.maxes.controller.doneWithEditing();
    }
    else {
        biglifts.maxes.controller.handleInvalidLift(errors);
    }
};

biglifts.editLift.updateAssociatedLiftCompletion = function (oldPropertyName, newPropertyName) {
    if (oldPropertyName !== newPropertyName) {
        biglifts.stores.lifts.LiftCompletion.each(function (record) {
            if (record.get('liftPropertyName') === oldPropertyName) {
                record.set('liftPropertyName', newPropertyName);
                record.save();
            }
        });
        biglifts.stores.lifts.LiftCompletion.sync();
    }
};

biglifts.maxes.controller.getCurrentLiftModel = function () {
    var liftIndex = biglifts.stores.lifts.Lifts.find(
        'propertyName', biglifts.maxes.currentEditingLiftProperty,
        false, true, true);
    return biglifts.stores.lifts.Lifts.getAt(liftIndex);
};

biglifts.maxes.controller.deleteLiftButtonPressed = function () {
    Ext.Msg.confirm("Confirm", "Delete Lift?", function (text) {
        if (text === "yes") {
            var liftModel = biglifts.maxes.controller.getCurrentLiftModel();
            var propertyName = liftModel.data.propertyName;

            biglifts.stores.lifts.Lifts.remove(liftModel);
            biglifts.stores.lifts.Lifts.sync();
            biglifts.maxes.controller.rebuildMaxesList();

            if (biglifts.liftSchedule.currentLiftProperty === propertyName) {
                biglifts.liftSchedule.currentLiftProperty = null;
            }

            biglifts.maxes.controller.doneWithEditing();
        }
    });
};

biglifts.maxes.controller.setupEditLift = function (propertyName) {
    var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', propertyName);
    biglifts.maxes.currentEditingLiftProperty = propertyName;

    var formValues = _.clone(lift.data);
    formValues.customBarWeight = null;

    Ext.getCmp('edit-lift-form').setValues(formValues);
};

biglifts.maxes.cards.editLiftPanel = {
    xtype:'panel',
    id:'maxes-edit-lift-panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.maxes.editLiftBackButtonPressed);
        }
    },
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Edit",
            items:[
                {
                    text:'Back',
                    handler:biglifts.maxes.editLiftBackButtonPressed,
                    ui:'back'
                },
                {xtype:'spacer'},
                {
                    id:'delete-lift-button',
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:biglifts.maxes.controller.deleteLiftButtonPressed
                }
            ]
        },
        {
            id:'edit-lift-form',
            xtype:'formpanel',
            items:[
                {
                    xtype:'fieldset',
                    margin:'0 0 10 0',
                    defaults:{
                        labelWidth:'40%'
                    },
                    listeners:{
                        initialize:function () {
                            this.add([
                                {
                                    xtype:'textfield',
                                    name:'name',
                                    label:'Name'
                                },
                                {
                                    xtype:'numberfield',
                                    name:'max',
                                    label:'Max'
                                },
                                {
                                    xtype:'numberfield',
                                    name:'cycleIncrease',
                                    labelWidth:'66%',
                                    label:'Cycle Increase'
                                }
                            ]);

                            if (biglifts.toggles.BarLoading) {
                                this.add({
                                    xtype:'numberfield',
                                    name:'customBarWeight',
                                    labelWidth:'66%',
                                    label:'Bar Weight'
                                });
                            }
                        }
                    }
                }
            ]
        }
    ]
};