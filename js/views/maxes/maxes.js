"use strict";
Ext.ns('wendler.views', 'wendler.stores', 'wendler.maxes.controller');

wendler.maxes.title = "Maxes";

wendler.maxes.controller.editLiftButtonPressed = function() {
    wendler.maxes.controller.modifyFormForEdit();
};

wendler.maxes.controller.editLiftsDoneButtonPressed = function() {
    wendler.maxes.controller.reEnableForm();
};

wendler.maxes.controller.modifyFormForEdit = function() {
    Ext.getCmp('edit-lifts-button').hide();
    Ext.getCmp('edit-lifts-done-button').show();
    Ext.getCmp('edit-lifts-add-lift-button').show();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'));
};

wendler.maxes.controller.reEnableForm = function() {
    Ext.getCmp('edit-lifts-button').show();
    Ext.getCmp('edit-lifts-done-button').hide();
    Ext.getCmp('edit-lifts-add-lift-button').hide();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
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
                    {
                        id: 'add-lift-cancel-button',
                        ui: 'action',
                        text: 'Cancel',
                        hidden: true,
                        handler: wendler.maxes.controller.addLiftCancelButtonPressed
                    },
                    {
                        id: 'edit-lifts-add-lift-button',
                        hidden: true,
                        iconCls: 'add',
                        iconMask: true,
                        ui: 'action',
                        handler: wendler.maxes.controller.addLiftButtonPressed
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
                    },
                    {
                        id: 'add-lift-done-button',
                        ui: 'action',
                        text: 'Done',
                        hidden: true,
                        handler: wendler.maxes.controller.addLiftDoneButtonPressed
                    }
                ]
            }
        ]
});