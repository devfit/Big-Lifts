"use strict";
Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller', 'wendler.editLift');

wendler.maxes.currentEditingLiftProperty = null;

wendler.maxes.controller.editLiftBackButtonPressed = function () {
    var newName = Ext.getCmp('edit-lift-new-name').getValue().trim();
    var newMax = Ext.getCmp('edit-lift-new-max').getValue();
    var newPropertyName = wendler.models.Lift.sanitizePropertyName(newName);
    var newCycleIncrease = Ext.getCmp('edit-lift-cycle-increase').getValue();

    var currentModel = wendler.maxes.controller.getCurrentLiftModel();
    var oldOrder = currentModel.get('order');

    var newLiftModel = Ext.create('Lift', {name:newName, propertyName:newPropertyName, cycleIncrease:newCycleIncrease, max:newMax, order:oldOrder});

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
        wendler.stores.lifts.LiftCompletion.each(function(record){
            if( record.get('liftPropertyName') === oldPropertyName ){
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
    wendler.navigation.setBackFunction(wendler.maxes.controller.editLiftBackButtonPressed);
    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', propertyName);
    wendler.maxes.currentEditingLiftProperty = propertyName;
    Ext.getCmp('maxes-edit-lift-toolbar').setTitle(lift.data.name);
    Ext.getCmp('edit-lift-new-name').setValue(lift.data.name);
    Ext.getCmp('edit-lift-new-max').setValue(lift.data.max);
    Ext.getCmp('edit-lift-cycle-increase').setValue(lift.data.cycleIncrease);
};

wendler.maxes.cards.editLiftPanel = {
    xtype:'panel',
    id:'maxes-edit-lift-panel',
    layout:'fit',
    items:[
        {
            id:'maxes-edit-lift-toolbar',
            xtype:'toolbar',
            docked:'top',
            items:[
                {
                    id:'edit-lift-back-button',
                    text:'Back',
                    handler:wendler.maxes.controller.editLiftBackButtonPressed,
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
                            name:'edit-lift-new-name',
                            id:'edit-lift-new-name',
                            label:'Name'
                        },
                        {
                            xtype:'textfield',
                            name:'edit-lift-new-max',
                            id:'edit-lift-new-max',
                            label:'Max'
                        },
                        {
                            xtype:'textfield',
                            name:'edit-lift-cycle-increase',
                            id:'edit-lift-cycle-increase',
                            label:'Increase at end of cycle'
                        }
                    ]
                }
            ]
        }
    ]
};