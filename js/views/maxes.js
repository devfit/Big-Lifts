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
                    title: 'Maxes'
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