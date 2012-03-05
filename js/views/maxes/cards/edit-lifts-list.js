Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller.editLiftsList');

wendler.maxes.controller.editLift = function (dataview, index, item, e) {
    var liftModel = wendler.stores.lifts.Lifts.getAt(index);
    var propertyName = liftModel.get('propertyName');

    Ext.getCmp('maxes-edit-lift-panel')._setup(propertyName);
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide', direction:'left'});
};

wendler.maxes.controller.deleteLift = function (dataview, index, item, e) {
    wendler.stores.lifts.Lifts.removeAt(index);
    wendler.stores.lifts.Lifts.sync();
    wendler.maxes.controller.rebuildMaxesList();
    Ext.getCmp('maxes-edit-lifts-list').refresh();
};

wendler.maxes.controller.doneWithEditing = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
};

wendler.maxes.controller.editLiftsDoneButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.maxes.controller.showArrangeLifts = function(){
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('arrange-lifts'));
};

wendler.maxes.cards.editMaxesList = {
    id:'maxes-edit-lifts-panel',
    xtype:'panel',
    layout:'fit',
    items:[
        {
            id:'maxes-edit-lifts-list',
            xtype:'list',
            selectedItemCls:'',
            store:wendler.stores.lifts.Lifts,
            itemCls:'lift-list-row',
            itemTpl:'<table width="100%"><tbody><tr>' +
                '<td width="60%"><span class="lift-name">{name}</span></td>' +
                '<td width="40%" class="delete-button-holder hidden"></td>' +
                '</tr></tbody></table>',
            onItemDisclosure:true,
            listeners:{
                afterrender:function () {
                    wendler.components.addSwipeToDelete(this, wendler.maxes.controller.editLift, wendler.maxes.controller.deleteLift, '.x-list-disclosure');
                }
            }
        }
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            title:"Edit Lifts",
            items:[
                {
                    id: 'arrange-lifts-button',
                    xtype:'button',
                    text:'Arrange',
                    handler:wendler.maxes.controller.showArrangeLifts,
                    ui:'action'
                },
                {xtype:'spacer'},
                {
                    id:'edit-lifts-done-button',
                    text:'Done',
                    handler:wendler.maxes.controller.editLiftsDoneButtonPressed,
                    ui:'action'
                }
            ]
        }
    ]
};