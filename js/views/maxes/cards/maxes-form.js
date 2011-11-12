Ext.ns('wendler', 'wendler.maxes', 'wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.liftValuesChanged = function(el, newValue) {
    var lift = wendler.stores.lifts.Lifts.findRecord('name', el.name);
    lift.set('max', newValue);
    lift.save();
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