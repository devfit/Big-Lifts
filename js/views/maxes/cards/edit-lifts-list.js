Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.editLift = function(view, index) {
    var liftModel = wendler.stores.lifts.Lifts.getAt(index);
    var liftName = liftModel.get('name');
    var propertyName = liftModel.get('propertyName');

    Ext.getCmp('maxes-edit-lift-panel')._setup(liftName, propertyName);
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide',direction:'left'});
};

wendler.maxes.controller.returnToEditLiftList = function() {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'), {type:'slide',direction:'right'});
};

wendler.maxes.controller.addLiftButtonPressed = function() {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'), {type:'slide',direction:'left'});
};

wendler.maxes.controller.editLiftsDoneButtonPressed = function() {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};


wendler.maxes.cards.editMaxesList = Ext.extend(Ext.Panel, {
    id: 'maxes-edit-lifts-list',
    xtype: 'panel',
    layout: 'fit',
    items:[
        {
            xtype: 'list',
            store: wendler.stores.lifts.Lifts,
            itemTpl: '<strong>{name}</strong>',
            onItemDisclosure: true,
            listeners:{
                itemtap: wendler.maxes.controller.editLift
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            title: "Edit Lifts",
            items:[
                {
                    id: 'edit-lifts-add-lift-button',
                    iconCls: 'add',
                    iconMask: true,
                    handler: wendler.maxes.controller.addLiftButtonPressed,
                    ui: 'action'
                },
                {xtype:'spacer'},
                {
                    id: 'edit-lifts-done-button',
                    text: 'Done',
                    handler: wendler.maxes.controller.editLiftsDoneButtonPressed,
                    ui: 'action'
                }
            ]
        }
    ]
});