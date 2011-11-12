Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.editLift = function(view, index) {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide',direction:'left'});
    var liftName = wendler.stores.lifts.Lifts.getAt(index).get('name');

    Ext.getCmp('maxes-toolbar').setTitle(liftName);
    Ext.getCmp('edit-lift-new-name').setValue(liftName);

    Ext.getCmp('edit-lifts-done-button').hide();
    Ext.getCmp('edit-lift-cancel-button').show();
    Ext.getCmp('edit-lift-done-button').show();
};

wendler.maxes.controller.returnToEditLiftList = function() {
    Ext.getCmp('maxes-toolbar').setTitle(wendler.maxes.title);
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'), {type:'slide',direction:'right'});
    Ext.getCmp('edit-lift-cancel-button').hide();
    Ext.getCmp('edit-lift-done-button').hide();
    Ext.getCmp('edit-lifts-done-button').show();
};

wendler.maxes.controller.addLiftButtonPressed = function() {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'), {type:'slide',direction:'left'});
    Ext.getCmp('maxes-toolbar').setTitle('New Lift');
    Ext.getCmp('edit-lifts-done-button').hide();
};

wendler.maxes.cards.editMaxesList = {
    id: 'maxes-edit-lifts-list',
    xtype: 'panel',
    items:[
        {
            xtype: 'list',
            store: wendler.stores.lifts.Lifts,
            itemTpl: '<strong>{name}</strong>',
            onItemDisclosure: true,
            listeners:{
                itemtap: wendler.maxes.controller.editLift
            }
        },
        {
            margin: '10 0 0 0',
            xtype: 'button',
            text: 'Add lift',
            ui: 'confirm-round',
            handler: wendler.maxes.controller.addLiftButtonPressed
        }
    ]
};