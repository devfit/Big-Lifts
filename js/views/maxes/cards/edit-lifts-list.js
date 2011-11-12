Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.editLift = function(view, index) {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide',direction:'left'});
    var liftName = wendler.stores.lifts.Lifts.getAt(index).get('name');
    Ext.getCmp('maxes-toolbar').setTitle(liftName);

    Ext.getCmp('edit-lifts-done-button').hide();
    Ext.getCmp('edit-lift-cancel-button').show();
    Ext.getCmp('edit-lift-done-button').show();
};

wendler.maxes.cards.editMaxesList = {
    id: 'maxes-edit-lifts-list',
    xtype: 'list',
    store: wendler.stores.lifts.Lifts,
    itemTpl: '<strong>{name}</strong>',
    onItemDisclosure: true,
    listeners:{
        itemtap: wendler.maxes.controller.editLift
    }
};