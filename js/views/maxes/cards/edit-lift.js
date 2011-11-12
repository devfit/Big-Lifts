Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.editLiftDoneButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.editLiftCancelButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.deleteLiftButtonPressed = function() {

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