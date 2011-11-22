"use strict";
Ext.ns('wendler.views', 'wendler.stores', 'wendler.maxes.controller');

wendler.maxes.title = "Maxes";

wendler.maxes.controller.editLiftButtonPressed = function() {
    Ext.getCmp('maxes-panel')._teardown();
    Ext.getCmp('maxes-edit-lifts-list')._setup();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'));
};

wendler.maxes.controller.editLiftsDoneButtonPressed = function() {
    Ext.getCmp('maxes-panel')._setup();
    Ext.getCmp('maxes-edit-lifts-list')._teardown();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.views.Maxes = Ext.extend(Ext.Panel, {
    id: 'maxes-panel',
    title: 'Maxes',
    iconCls: 'bookmarks',
    layout: 'card',
    items: [
        new wendler.maxes.cards.maxesForm(),
        new wendler.maxes.cards.editMaxesList(),
        new wendler.maxes.cards.editLiftPanel(),
        new wendler.maxes.cards.addLiftPanel()
    ],
    dockedItems:
        [
            {
                id: 'maxes-toolbar',
                xtype: 'toolbar',
                dock: 'top',
                title: wendler.maxes.title,
                defaults:{
                    ui: 'action',
                    hidden: true
                },
                items: [
                    {
                        id: 'edit-lift-cancel-button',
                        text: 'Cancel',
                        handler: wendler.maxes.controller.editLiftCancelButtonPressed
                    },
                    {
                        id: 'add-lift-cancel-button',
                        text: 'Cancel',
                        handler: wendler.maxes.controller.addLiftCancelButtonPressed
                    },
                    {
                        id: 'edit-lifts-add-lift-button',
                        iconCls: 'add',
                        iconMask: true,
                        handler: wendler.maxes.controller.addLiftButtonPressed
                    },
                    {xtype: 'spacer',
                        hidden: false},
                    {
                        id: 'edit-lifts-button',
                        text: 'Edit Lifts',
                        handler: wendler.maxes.controller.editLiftButtonPressed,
                        hidden: false
                    },
                    {
                        id: 'edit-lifts-done-button',
                        text: 'Done',
                        handler: wendler.maxes.controller.editLiftsDoneButtonPressed
                    },
                    {
                        id: 'edit-lift-done-button',
                        text: 'Done',
                        handler: wendler.maxes.controller.editLiftDoneButtonPressed
                    },
                    {
                        id: 'add-lift-done-button',
                        text: 'Done',
                        handler: wendler.maxes.controller.addLiftDoneButtonPressed
                    }
                ]
            }
        ],
    _setup: function() {
        Ext.getCmp('edit-lifts-button').show();
    },
    _teardown: function() {
        Ext.getCmp('edit-lifts-button').hide();
    }
});