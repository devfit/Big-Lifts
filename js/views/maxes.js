"use strict";
Ext.ns('wendler', 'wendler.views', 'wendler.stores', 'wendler.maxes', 'wendler.maxes.controller');

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

wendler.maxes.controller.addLiftButtonPressed = function() {
    Ext.getCmp('maxes-form-items').items.each(function(input) {
        input.disable();
    });

    Ext.getCmp('add-lift-button').hide();
    Ext.getCmp('add-lift-done-button').show();
};

wendler.maxes.controller.addLiftDoneButtonPressed = function() {
    Ext.getCmp('maxes-form-items').items.each(function(input) {
        input.enable();
    });

    Ext.getCmp('add-lift-button').show();
    Ext.getCmp('add-lift-done-button').hide();
};

wendler.views.Maxes = Ext.extend(Ext.Panel, {
    id: 'maxes-panel',
    title: 'Maxes',
    iconCls: 'bookmarks',
    initComponent: function() {
        var maxesForm = new Ext.form.FormPanel({
            id: 'maxes-form',
            scroll: 'vertical',
            dockedItems:[
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    title: 'Maxes',
                    items: [
                        {xtype: 'spacer'},
                        {
                            id: 'add-lift-button',
                            ui: 'action',
                            text: 'Add Lift',
                            handler: wendler.maxes.controller.addLiftButtonPressed
                        },
                        {
                            id: 'add-lift-done-button',
                            ui: 'action',
                            text: 'Done',
                            hidden:true,
                            handler: wendler.maxes.controller.addLiftDoneButtonPressed
                        }
                    ]
                }
            ],
            items: [
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
        });

        this.items = [maxesForm];
        wendler.views.Maxes.superclass.initComponent.call(this);
    }
});