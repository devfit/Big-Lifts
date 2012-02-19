Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller.editLiftsList');

wendler.maxes.controller.editLift = function (dataview, index, item, e) {
    var tapTarget = Ext.get(e.target);

    var editLiftsRowWithDelete = wendler.maxes.controller.editLiftsList.findLogRowWithDeleteButton(tapTarget.up('.x-list-parent'));
    if (wendler.maxes.controller.editLiftsList.tappingDelete(tapTarget)) {
        wendler.stores.lifts.Lifts.removeAt(index);
        wendler.stores.lifts.Lifts.sync();
        wendler.maxes.controller.rebuildMaxesList();
        Ext.getCmp('maxes-edit-lifts-list').refresh();
    }
    else if (editLiftsRowWithDelete !== null) {
        wendler.maxes.controller.editLiftsList.showHideDeleteButton(editLiftsRowWithDelete, index);
    }
    else {
        var liftModel = wendler.stores.lifts.Lifts.getAt(index);
        var propertyName = liftModel.get('propertyName');

        Ext.getCmp('maxes-edit-lift-panel')._setup(propertyName);
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide', direction:'left'});
    }
};

wendler.maxes.controller.editLiftsList.findLogRowWithDeleteButton = function (list) {
    var deleteContainers = list.query('.delete-button-holder');
    for (var i = 0; i < deleteContainers.length; i++) {
        var deleteContainer = deleteContainers[i];
        if (!Ext.get(deleteContainer).hasCls('hidden')) {
            return Ext.get(deleteContainer).up('.x-list-item');
        }
    }
    return null;
};


wendler.maxes.controller.doneWithEditing = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
};

wendler.maxes.controller.editLiftsDoneButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.maxes.controller.editLiftsList.onItemSwipe = function (dataview, index, item) {
    wendler.maxes.controller.editLiftsList.showHideDeleteButton(item);
};

wendler.maxes.controller.editLiftsList.tappingDelete = function (tapTarget) {
    return tapTarget.hasCls('delete-button') || tapTarget.up('.delete-button') !== null;
};

wendler.maxes.controller.editLiftsList.showHideDeleteButton = function (row) {
    var disclosure = Ext.get(row).down('.x-list-disclosure');
    var deleteButton = Ext.get(row).down('.delete-button-holder');
    if (disclosure.hasCls('hidden')) {
        disclosure.removeCls('hidden');
        deleteButton.addCls('hidden');
    }
    else if (deleteButton.hasCls('hidden')) {
        wendler.maxes.controller.editLiftsList.showDeleteButtonForDom(deleteButton);
        disclosure.addCls('hidden');
    }
};

wendler.maxes.controller.editLiftsList.showDeleteButtonForDom = function (container) {
    container.removeCls('hidden');
    container.addCls('fade-in');

    if (container.down('.delete-button') === null) {
        new Ext.Button({
            cls:'delete-button',
            ui:'decline',
            text:'Delete',
            renderTo:container
        });
    }
};

wendler.maxes.cards.editMaxesList = {
    id:'maxes-edit-lifts-panel',
    xtype:'panel',
    layout:'fit',
    items:[
        {
            id: 'maxes-edit-lifts-list',
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
                itemswipe:wendler.maxes.controller.editLiftsList.onItemSwipe,
                itemtap:wendler.maxes.controller.editLift
            }
        }
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            title:"Edit Lifts",
            items:[
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