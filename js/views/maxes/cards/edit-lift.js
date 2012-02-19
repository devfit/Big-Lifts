"use strict";
Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.setAndFindInvalidLiftErrors = function (errors, messages, oldPropertyName, newPropertyName) {
    var nameErrors = errors.getByField('propertyName');
    var maxErrors = errors.getByField('max');
    var cycleIncreaseErrors = errors.getByField('cycleIncrease');
    if (nameErrors.length > 0) {
        for (var i = 0; i < nameErrors.length; i++) {
            var nameError = nameErrors[i];
            if (nameError.message === "must be present") {
                messages.push("Invalid lift name");
            }
            else if (nameError.message === "nonunique" && oldPropertyName !== newPropertyName) {
                messages.push("Name must be unique");
            }
        }
    }
    if (maxErrors.length > 0) {
        messages.push("Max must be > 0");
    }
    if (cycleIncreaseErrors.length > 0) {
        messages.push("Cycle Increase must be > 0");
    }
};

wendler.maxes.currentEditingLiftProperty = null;

wendler.maxes.controller.editLiftBackButtonPressed = function () {
    var newName = Ext.getCmp('edit-lift-new-name').getValue();
    var newCycleIncrease = Ext.getCmp('edit-lift-cycle-increase').getValue();
    var newPropertyName = wendler.models.Lift.sanitizePropertyName(newName);
    var newMax = Ext.getCmp('edit-lift-new-max').getValue();

    var currentModel = wendler.maxes.controller.getCurrentLiftModel();
    var oldPropertyName = currentModel.get('propertyName');

    var newLiftConfiguration = {name:newName, propertyName:newPropertyName, cycleIncrease:newCycleIncrease, max:newMax};
    var copyModel = Ext.ModelMgr.create(newLiftConfiguration, 'Lift');
    var errors = copyModel.validate();
    var messages = [];

    wendler.maxes.controller.setAndFindInvalidLiftErrors(errors, messages, oldPropertyName, newPropertyName);

    if (messages.length === 0) {
        currentModel.set(newLiftConfiguration);
        currentModel.save();
        wendler.maxes.controller.rebuildMaxesList();
        wendler.maxes.controller.doneWithEditing();
    }
    else {
        Ext.Msg.alert('Error', messages.join('<br/>'));
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

wendler.maxes.cards.editLiftPanel = {
    xtype:'panel',
    id:'maxes-edit-lift-panel',
    items:[
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
    ],
    dockedItems:[
        {
            id:'maxes-edit-lift-toolbar',
            xtype:'toolbar',
            dock:'top',
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
        }
    ],
    _setup:function (propertyName) {
        wendler.navigation.setBackFunction(wendler.maxes.controller.editLiftBackButtonPressed);

        var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', propertyName);
        wendler.maxes.currentEditingLiftProperty = propertyName;
        Ext.getCmp('maxes-edit-lift-toolbar').setTitle(lift.data.name);
        Ext.getCmp('edit-lift-new-name').setValue(lift.data.name);
        Ext.getCmp('edit-lift-new-max').setValue(lift.data.max);
        Ext.getCmp('edit-lift-cycle-increase').setValue(lift.data.cycleIncrease);
    }
};