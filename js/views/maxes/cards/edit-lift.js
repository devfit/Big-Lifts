"use strict";
Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller', 'wendler.editLift');

wendler.maxes.currentEditingLiftProperty = null;

wendler.maxes.editLiftBackButtonPressed = function () {
    var formValues = Ext.getCmp('edit-lift-form').getValues();
    formValues.name = formValues.name.trim();
    formValues.propertyName = wendler.models.Lift.sanitizePropertyName(formValues.name);

    var currentModel = wendler.maxes.controller.getCurrentLiftModel();
    formValues.order = currentModel.get('order');

    var newLiftModel = Ext.create('Lift', formValues);
    var errors = newLiftModel.validate();

    if (errors.isValid()) {
        newLiftModel.set('id', currentModel.data.id);

        wendler.editLift.updateAssociatedLiftCompletion(currentModel.get('propertyName'), newLiftModel.get('propertyName'));

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

        if (somethingSaved) {
            wendler.maxes.controller.rebuildMaxesList();
            wendler.liftSchedule.liftSelector.refreshLiftSelectorLifts();
        }

        wendler.maxes.controller.doneWithEditing();
    }
    else {
        wendler.maxes.controller.handleInvalidLift(errors);
    }
};

wendler.editLift.updateAssociatedLiftCompletion = function (oldPropertyName, newPropertyName) {
    if (oldPropertyName !== newPropertyName) {
        wendler.stores.lifts.LiftCompletion.each(function (record) {
            if (record.get('liftPropertyName') === oldPropertyName) {
                record.set('liftPropertyName', newPropertyName);
                record.save();
            }
        });
        wendler.stores.lifts.LiftCompletion.sync();
    }
};

wendler.maxes.controller.getCurrentLiftModel = function () {
    var liftIndex = wendler.stores.lifts.Lifts.find(
        'propertyName', wendler.maxes.currentEditingLiftProperty,
        false, true, true);
    return wendler.stores.lifts.Lifts.getAt(liftIndex);
};

wendler.maxes.controller.deleteLiftButtonPressed = function () {
    Ext.Msg.confirm("Confirm", "Delete Lift?", function (text) {
        if (text === "yes") {
            var liftModel = wendler.maxes.controller.getCurrentLiftModel();
            var propertyName = liftModel.data.propertyName;

            wendler.stores.lifts.Lifts.remove(liftModel);
            wendler.stores.lifts.Lifts.sync();
            wendler.maxes.controller.rebuildMaxesList();

            if (wendler.liftSchedule.currentLiftProperty === propertyName) {
                wendler.liftSchedule.currentLiftProperty = null;
            }

            wendler.maxes.controller.doneWithEditing();
        }
    });
};

wendler.maxes.controller.setupEditLift = function (propertyName) {
    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', propertyName);
    wendler.maxes.currentEditingLiftProperty = propertyName;
    Ext.getCmp('edit-lift-form').setValues(lift.data);
};

wendler.maxes.cards.editLiftPanel = {
    xtype:'panel',
    id:'maxes-edit-lift-panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.maxes.editLiftBackButtonPressed);
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
                    handler:wendler.maxes.editLiftBackButtonPressed,
                    ui:'back'
                },
                {xtype:'spacer'},
                {
                    id:'delete-lift-button',
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:wendler.maxes.controller.deleteLiftButtonPressed
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
                    items:[
                        {
                            xtype:'textfield',
                            name:'name',
                            label:'Name'
                        },
                        {
                            xtype:'textfield',
                            name:'max',
                            label:'Max'
                        },
                        {
                            xtype:'textfield',
                            name:'cycleIncrease',
                            labelWidth:'66%',
                            label:'Cycle Increase'
                        }
                    ]
                }
            ]
        }
    ]
};