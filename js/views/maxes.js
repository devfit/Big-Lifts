"use strict";
Ext.ns('wendler', 'wendler.views', 'wendler.stores', 'wendler.maxes', 'wendler.maxes.controller', 'wendler.maxes.cards');

wendler.maxes.controller.buildMaxesFromStore = function() {
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createMaxesInput, this);
};

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

wendler.maxes.controller.liftValuesChanged = function(el, newValue) {
    var lift = wendler.stores.lifts.Lifts.findRecord('name', el.name);
    lift.set('max', newValue);
    lift.save();
};

wendler.maxes.controller.editLiftButtonPressed = function() {
    wendler.maxes.controller.modifyFormForEdit();
};

wendler.maxes.controller.editLiftDoneButtonPressed = function() {
    wendler.maxes.controller.reEnableForm();
};

wendler.maxes.controller.modifyFormForEdit = function() {
    Ext.getCmp('edit-lifts-button').hide();
    Ext.getCmp('edit-lifts-done-button').show();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-list'));
};

wendler.maxes.controller.reEnableForm = function() {
    Ext.getCmp('edit-lifts-button').show();
    Ext.getCmp('edit-lifts-done-button').hide();

    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.maxes.controller.editLift = function() {
    console.log('summin');
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

wendler.maxes.cards.buildMaxesForm = function() {
    return {
        id: 'maxes-form',
        xtype:'formpanel',
        scroll:'vertical',
        items:
            [
                {
                    id: 'maxes-form-items',
                    xtype: 'fieldset',
                    style: 'margin-top: 0',
                    instructions: 'Enter one-rep maxes above.',
                    defaults: {
                        listeners:{
                            change: wendler.maxes.controller.liftValuesChanged
                        },
                        labelWidth: '35%',
                        useClearIcon: true
                    }
                }
            ]
    };
};

wendler.maxes.cards.buildEditMaxesList = function() {
    return {
        id: 'maxes-edit-lift-list',
        xtype: 'list',
        store: wendler.stores.lifts.Lifts,
        itemTpl: '<strong>{name}</strong>',
        onItemDisclosure: true,
        listeners:{
            itemtap: wendler.maxes.controller.editLift
        }
    }
};

wendler.views.Maxes = Ext.extend(Ext.Panel, {
    id: 'maxes-panel',
    title: 'Maxes',
    iconCls: 'bookmarks',
    layout: 'card',
    items: [
        wendler.maxes.cards.buildMaxesForm(),
        wendler.maxes.cards.buildEditMaxesList()
    ],
    dockedItems:
        [
            {
                xtype: 'toolbar',
                dock: 'top',
                title: 'Maxes',
                items: [
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
                        handler: wendler.maxes.controller.editLiftDoneButtonPressed
                    }
                ]
            }
        ]
});