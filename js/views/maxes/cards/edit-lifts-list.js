Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.currentEditingLiftProperty = null;
wendler.maxes.controller.editLift = function(view, index) {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide',direction:'left'});

    var liftModel = wendler.stores.lifts.Lifts.getAt(index);
    var liftName = liftModel.get('name');
    wendler.maxes.currentEditingLiftProperty = liftModel.get('propertyName');

    Ext.getCmp('maxes-edit-lifts-list')._teardown();
    Ext.getCmp('maxes-edit-lift-panel')._setup(liftName);
};

wendler.maxes.controller.returnToEditLiftList = function() {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'), {type:'slide',direction:'right'});

    Ext.getCmp('maxes-edit-lift-panel')._teardown();
    Ext.getCmp('maxes-add-lift-panel')._teardown();
    Ext.getCmp('maxes-edit-lifts-list')._setup();
};

wendler.maxes.controller.addLiftButtonPressed = function() {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'), {type:'slide',direction:'left'});

    Ext.getCmp('maxes-edit-lifts-list')._teardown();
    Ext.getCmp('maxes-add-lift-panel')._setup();
};

wendler.maxes.cards.editMaxesList = Ext.extend(wendler.views.cards.MaxesPanel, {
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
    _setup: function() {
        Ext.getCmp('maxes-toolbar').setTitle(wendler.maxes.title);
        Ext.getCmp('edit-lifts-done-button').show();
        Ext.getCmp('edit-lifts-add-lift-button').show();
    },
    _teardown: function() {
        Ext.getCmp('edit-lifts-done-button').hide();
        Ext.getCmp('edit-lifts-add-lift-button').hide();
    }
});