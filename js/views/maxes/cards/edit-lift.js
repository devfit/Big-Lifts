Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.editLiftDoneButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.editLiftCancelButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.deleteLiftButtonPressed = function() {
    Ext.Msg.confirm("Confirm", "Delete Lift?", function(text) {
        if (text === "yes") {
            var liftIndex = wendler.stores.lifts.Lifts.find(
                'propertyName', wendler.maxes.currentEditingLiftProperty,
                false, true, true);
            var liftModel = wendler.stores.lifts.Lifts.getAt(liftIndex);

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