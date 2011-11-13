Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.addLiftDoneButtonPressed = function() {
    var liftName = Ext.getCmp('add-lift-new-name').getValue();
    var liftMax = Ext.getCmp('add-lift-new-max').getValue();
    var liftProperty = wendler.models.Lift.sanitizePropertyName(liftName);

    var newLiftModel = Ext.ModelMgr.create(
        {name: liftName, propertyName: liftProperty, max: liftMax}, 'Lift');
    var errors = newLiftModel.validate();

    if (!errors.isValid()) {
        console.log( errors );
        //TODO: validation message?
    }
    else {
        wendler.stores.lifts.Lifts.add(newLiftModel);
        wendler.stores.lifts.Lifts.sync();

        wendler.maxes.controller.rebuildMaxesList();

        Ext.getCmp('maxes-add-lift-form').reset();
        wendler.maxes.controller.returnToEditLiftList();
    }
};

wendler.maxes.controller.addLiftCancelButtonPressed = function() {
    Ext.getCmp('maxes-add-lift-form').reset();
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.cards.addLiftPanel = {
    id: 'maxes-add-lift-panel',
    xtype: 'panel',
    items:[
        {
            xtype: 'formpanel',
            id: 'maxes-add-lift-form',
            items:[
                {
                    xtype: 'fieldset',
                    style: 'margin-top: 0',
                    items:[
                        {
                            xtype: 'textfield',
                            name: 'add-lift-new-name',
                            id: 'add-lift-new-name',
                            label: 'Name',
                            labelWidth: '35%'
                        },
                        {
                            xtype: 'textfield',
                            name: 'add-lift-new-max',
                            id: 'add-lift-new-max',
                            label: 'Max',
                            labelWidth: '35%'
                        }
                    ]
                }
            ]
        }
    ]
};