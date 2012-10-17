Ext.ns('biglifts.maxes.cards', 'biglifts.maxes.controller');

biglifts.maxes.controller.handleInvalidLift = function (errors) {
    var nameErrors = errors.getByField('propertyName');
    var maxErrors = errors.getByField('max');
    var cycleIncreaseErrors = errors.getByField('cycleIncrease');
    var messages = [];

    if (nameErrors.length > 0) {
        for (var i in nameErrors) {
            var nameError = nameErrors[i];
            if (nameError.getMessage() === "must be present") {
                messages.push("Invalid lift name");
            }
            else if (nameError.getMessage() === "nonunique") {
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

biglifts.maxes.controller.findNextOrdering = function () {
    var orders = [];
    util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
        orders = _.map(biglifts.stores.lifts.Lifts.getRange(), function (record) {
            return record.data.order;
        });
    });
    return _.max(orders) + 1;
};

biglifts.maxes.controller.addLiftDoneButtonPressed = function () {
    var liftName = Ext.getCmp('add-lift-new-name').getValue();
    var liftMax = Ext.getCmp('add-lift-new-max').getValue();
    var liftProperty = biglifts.models.Lift.sanitizePropertyName(liftName);
    var cycleIncrease = Ext.getCmp('add-lift-cycle-increase').getValue();

    var newLiftModel = Ext.create('Lift',
        {name:liftName, propertyName:liftProperty, max:liftMax, cycleIncrease:cycleIncrease, order:biglifts.maxes.controller.findNextOrdering() });
    var errors = newLiftModel.validate();

    if (!errors.isValid()) {
        biglifts.maxes.controller.handleInvalidLift(errors);
    }
    else {
        biglifts.maxes.controller.saveNewLift(newLiftModel);
        Ext.getCmp('maxes-add-lift-form').reset();
        biglifts.maxes.controller.doneWithEditing();
    }
};

biglifts.maxes.controller.saveNewLift = function(newLiftModel){
    biglifts.stores.lifts.Lifts.add(newLiftModel);
    biglifts.stores.lifts.Lifts.sync();
    biglifts.stores.migrations.liftCompletionMigration();
    biglifts.stores.migrations.triumvirateMovementsMigration(biglifts.stores.assistance.TriumvirateMovement);
    biglifts.maxes.controller.rebuildMaxesList();
};

biglifts.maxes.controller.addLiftCancelButtonPressed = function () {
    Ext.getCmp('maxes-add-lift-form').reset();
    biglifts.maxes.controller.doneWithEditing();
};

biglifts.maxes.cards.addLiftPanel = {
    xtype:'panel',
    id:'maxes-add-lift-panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.maxes.controller.addLiftCancelButtonPressed);
        }
    },
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"New Lift",
            items:[
                {
                    id:'add-lift-cancel-button',
                    text:'Cancel',
                    handler:biglifts.maxes.controller.addLiftCancelButtonPressed,
                    ui:'action'
                },
                {xtype:'spacer'},
                {
                    id:'add-lift-done-button',
                    text:'Save',
                    handler:biglifts.maxes.controller.addLiftDoneButtonPressed,
                    ui:'confirm'
                }
            ]
        },
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
    ]
};