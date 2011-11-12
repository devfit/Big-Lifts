"use strict";
Ext.ns('wendler', 'wendler.views', 'wendler.stores', 'wendler.maxes', 'wendler.maxes.controller');

wendler.maxes.controller.buildMaxesFromStore = function() {
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createMaxesInput, this);
};

wendler.maxes.title = "Maxes";

wendler.maxes.controller.createMaxesInput = function(record) {
    var liftName = record.data.name;
    var liftProperty = liftName.toLowerCase();
    Ext.getCmp('maxes-form-items').add({
        id: 'maxes-' + liftProperty,
        xtype: 'numberfield',
        name: liftProperty,
        label: liftName,
        value: record.data.max
    });
};

wendler.maxes.controller.editLiftButtonPressed = function() {
    wendler.maxes.controller.modifyFormForEdit();
};

wendler.maxes.controller.editLiftsDoneButtonPressed = function() {
    wendler.maxes.controller.reEnableForm();
};

wendler.maxes.controller.modifyFormForEdit = function() {
    Ext.getCmp('edit-lifts-button').hide();
    Ext.getCmp('edit-lifts-done-button').show();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'));
};

wendler.maxes.controller.reEnableForm = function() {
    Ext.getCmp('edit-lifts-button').show();
    Ext.getCmp('edit-lifts-done-button').hide();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.maxes.controller.promptAndAddNewLift = function() {
    Ext.Msg.prompt('Lift Name', '', function(button, liftName) {
        if (button == "ok") {
            if (liftName != '') {
                wendler.stores.lifts.Lifts.add(Ext.ModelMgr.create({name: liftName, max: 100}, 'Lift'));
                wendler.stores.lifts.Lifts.sync();
                Ext.getCmp('maxes-form-items').removeAll();
                wendler.maxes.controller.buildMaxesFromStore();
                Ext.getCmp('maxes-form-items').doLayout();
            }
        }
    }, this, false, '');
};

wendler.views.Maxes = Ext.extend(Ext.Panel, {
    id: 'maxes-panel',
    title: 'Maxes',
    iconCls: 'bookmarks',
    layout: 'card',
    items: [
        wendler.maxes.cards.maxesForm,
        wendler.maxes.cards.editMaxesList,
        wendler.maxes.cards.editLiftPanel,
        wendler.maxes.cards.addLiftPanel
    ],
    dockedItems:
        [
            {
                id: 'maxes-toolbar',
                xtype: 'toolbar',
                dock: 'top',
                title: wendler.maxes.title,
                items: [
                    {
                        id: 'edit-lift-cancel-button',
                        ui: 'action',
                        text: 'Cancel',
                        hidden: true,
                        handler: wendler.maxes.controller.editLiftCancelButtonPressed
                    },
                    {xtype: 'spacer'},
                    {
                        id: 'edit-lifts-button',
                        ui: 'action',
                        text: 'Edit Lifts',
                        handler: wendler.maxes.controller.editLiftButtonPressed
                    },
                    {
                        id: 'edit-lifts-done-button',
                        ui: 'action',
                        text: 'Done',
                        hidden: true,
                        handler: wendler.maxes.controller.editLiftsDoneButtonPressed
                    },
                    {
                        id: 'edit-lift-done-button',
                        ui: 'action',
                        text: 'Done',
                        hidden: true,
                        handler: wendler.maxes.controller.editLiftDoneButtonPressed
                    }
                ]
            }
        ]
});