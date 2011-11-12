Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.returnToEditLiftList = function() {
    Ext.getCmp('maxes-toolbar').setTitle(wendler.maxes.title);
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'), {type:'slide',direction:'right'});
    Ext.getCmp('edit-lift-cancel-button').hide();
    Ext.getCmp('edit-lift-done-button').hide();
    Ext.getCmp('edit-lifts-done-button').show();
};

wendler.maxes.controller.editLiftDoneButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.editLiftCancelButtonPressed = function() {
    wendler.maxes.controller.returnToEditLiftList();
};

wendler.maxes.controller.deleteLiftButtonPressed = function(){

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