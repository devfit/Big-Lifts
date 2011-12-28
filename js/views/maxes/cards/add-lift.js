Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.handleInvalidLift = function(errors){
    var nameErrors = errors.getByField('propertyName');
    var maxErrors = errors.getByField('max');
    var cycleIncreaseErrors = errors.getByField('cycleIncrease');
    var messages = [];

    if (nameErrors.length > 0) {
        for (var i in nameErrors) {
            var nameError = nameErrors[i];
            if (nameError.message === "must be present") {
                messages.push("Invalid lift name");
            }
            else if (nameError.message === "nonunique") {
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

    Ext.Msg.alert('Error', messages.join('<br/>'));
};

wendler.maxes.controller.addLiftDoneButtonPressed = function () {
    var liftName = Ext.getCmp('add-lift-new-name').getValue();
    var liftMax = Ext.getCmp('add-lift-new-max').getValue();
    var liftProperty = wendler.models.Lift.sanitizePropertyName(liftName);
    var cycleIncrease = Ext.getCmp('add-lift-cycle-increase').getValue();

    var newLiftModel = Ext.ModelMgr.create(
        {name:liftName, propertyName:liftProperty, max:liftMax, cycleIncrease:cycleIncrease}, 'Lift');
    var errors = newLiftModel.validate();

    if (!errors.isValid()) {
        wendler.maxes.controller.handleInvalidLift(errors);
    }
    else {
        wendler.stores.lifts.Lifts.add(newLiftModel);
        wendler.stores.lifts.Lifts.sync();

        wendler.stores.migrations.liftCompletionMigration();
        wendler.maxes.controller.rebuildMaxesList();

        Ext.getCmp('maxes-add-lift-form').reset();
        wendler.maxes.controller.returnToEditLiftList();
    }
};

wendler.maxes.controller.addLiftCancelButtonPressed = function () {
    Ext.getCmp('maxes-add-lift-form').reset();
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.cards.addLiftPanel = {
    xtype:'panel',
    id:'maxes-add-lift-panel',
    items:[
        {
            xtype:'formpanel',
            id:'maxes-add-lift-form',
            items:[
                {
                    xtype:'fieldset',
                    style:'margin-top: 0',
                    defaults:{
                        autoCapitalize:false,
                        autoCorrect:false,
                        autoComplete:false,
                        labelWidth:'40%'
                    },
                    items:[
                        {
                            xtype:'textfield',
                            name:'add-lift-new-name',
                            id:'add-lift-new-name',
                            label:'Name'
                        },
                        {
                            xtype:'textfield',
                            name:'add-lift-new-max',
                            id:'add-lift-new-max',
                            label:'Max'
                        },
                        {
                            xtype:'textfield',
                            name:'add-lift-cycle-increase',
                            id:'add-lift-cycle-increase',
                            label:'Increase at end of cycle',
                            value:10
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            title:"New Lift",
            items:[
                {
                    id:'add-lift-cancel-button',
                    text:'Cancel',
                    handler:wendler.maxes.controller.addLiftCancelButtonPressed,
                    ui:'action'
                },
                {xtype:'spacer'},
                {
                    id:'add-lift-done-button',
                    text:'Done',
                    handler:wendler.maxes.controller.addLiftDoneButtonPressed,
                    ui:'action'
                }
            ]
        }
    ]
};