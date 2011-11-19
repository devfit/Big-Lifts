Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.editLiftDoneButtonPressed = function() {
    var newName = Ext.getCmp('edit-lift-new-name').getValue();
    var currentModel = wendler.maxes.controller.getCurrentLiftModel();
    currentModel.set('name', newName);
    currentModel.save();

    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.editLiftCancelButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.getCurrentLiftModel = function() {
    var liftIndex = wendler.stores.lifts.Lifts.find(
        'propertyName', wendler.maxes.currentEditingLiftProperty,
        false, true, true);
    return wendler.stores.lifts.Lifts.getAt(liftIndex);
};

wendler.maxes.controller.deleteLiftButtonPressed = function() {
    Ext.Msg.confirm("Confirm", "Delete Lift?", function(text) {
        if (text === "yes") {
            var liftModel = wendler.maxes.controller.getCurrentLiftModel();
            wendler.stores.lifts.Lifts.remove(liftModel);
            wendler.stores.lifts.Lifts.sync();
            wendler.maxes.controller.rebuildMaxesList();

            wendler.maxes.controller.returnToEditLiftList();
        }
    });
};

wendler.maxes.cards.editLiftPanel = {
    id: 'maxes-edit-lift-panel',
    xtype: 'panel',
    items:[
        {
            xtype: 'formpanel',
            items:[
                {
                    xtype: 'fieldset',
                    margin: '0 0 10 0',
                    items:[
                        {
                            xtype: 'textfield',
                            name: 'edit-lift-new-name',
                            id: 'edit-lift-new-name',
                            label: 'Name',
                            labelWidth: '35%'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    ui: 'decline-round',
                    text: 'Delete',
                    handler: wendler.maxes.controller.deleteLiftButtonPressed
                }
            ]
        }
    ]
};