Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.addLiftDoneButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.addLiftCancelButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.cards.addLiftPanel = {
    id: 'maxes-add-lift-panel',
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
                            name: 'add-lift-new-name',
                            id: 'add-lift-new-name',
                            label: 'Name',
                            labelWidth: '35%'
                        }
                    ]
                }
            ]
        }
    ]
};