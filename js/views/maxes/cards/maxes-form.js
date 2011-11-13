Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.liftValuesChanged = function(el, newValue) {
    var lift = wendler.stores.lifts.Lifts.findRecord('name', el.name);
    lift.set('max', newValue);
    lift.save();
};

wendler.maxes.controller.buildMaxesFromStore = function() {
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createMaxesInput, this);
};
wendler.appLoadCallbackFunctions.push(wendler.maxes.controller.buildMaxesFromStore);

wendler.maxes.controller.createMaxesInput = function(record) {
    var liftName = record.data.name;
    var liftProperty = record.data.propertyName;
    Ext.getCmp('maxes-form-items').add({
        id: 'maxes-' + liftProperty,
        xtype: 'numberfield',
        name: liftProperty,
        label: liftName,
        value: record.data.max
    });
};

wendler.maxes.controller.rebuildMaxesList = function() {
    Ext.getCmp('maxes-form-items').removeAll();
    wendler.maxes.controller.buildMaxesFromStore();
    Ext.getCmp('maxes-form-items').doLayout();
};

wendler.maxes.cards.maxesForm = {
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