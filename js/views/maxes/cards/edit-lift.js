"use strict";
Ext.ns('biglifts.maxes.cards', 'biglifts.maxes.controller', 'biglifts.editLift');

biglifts.maxes.currentEditingLiftProperty = null;

biglifts.maxes.editLiftBackButtonPressed = function () {
    var formValues = Ext.getCmp('edit-lift-form').getValues();
    formValues.name = formValues.name.trim();
    formValues.propertyName = biglifts.models.Lift.sanitizePropertyName(formValues.name);

    var currentModel = biglifts.maxes.controller.getCurrentLiftModel();
    var oldPropertyName = currentModel.get('propertyName');
    for (var key in formValues) {
        currentModel.set(key, formValues[key]);
    }

    var errors = currentModel.validate();
    var errorItems = errors.items;
    if (errors.isValid() || errorItems.length === 1 && errorItems[0]._message === "nonunique") {
        biglifts.editLift.updateAssociatedLiftCompletion(oldPropertyName, currentModel.get('propertyName'));
        biglifts.stores.lifts.Lifts.sync();
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
    }
    else {
        currentModel.reject();
        biglifts.maxes.controller.handleInvalidLift(errors);
    }
};

biglifts.editLift.updateAssociatedLiftCompletion = function (oldPropertyName, newPropertyName) {
    if (oldPropertyName !== newPropertyName) {
        biglifts.stores.lifts.LiftCompletion.each(function (record) {
            if (record.get('liftPropertyName') === oldPropertyName) {
                record.set('liftPropertyName', newPropertyName);
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

            if (biglifts.liftSchedule.currentLiftProperty === propertyName) {
                biglifts.liftSchedule.currentLiftProperty = null;
            }

            Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
        }
    });
};

biglifts.maxes.controller.setupEditLift = function (propertyName) {
    var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', propertyName);
    biglifts.maxes.currentEditingLiftProperty = propertyName;

    Ext.getCmp('edit-lift-form').setValues(_.clone(lift.data));
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