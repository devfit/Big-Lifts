Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.liftValuesChanged = function (el, newValue) {
    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', el.name);
    lift.set('max', newValue);
    lift.save();
};

wendler.maxes.controller.buildMaxesFromStore = function () {
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createMaxesInput, this);
    Ext.getCmp('maxes-form-items').doLayout();
};
wendler.events.appLoadCallbackFunctions.push(wendler.maxes.controller.buildMaxesFromStore);

wendler.maxes.controller.createMaxesInput = function (record) {
    var liftName = record.data.name;
    var liftProperty = record.data.propertyName;
    Ext.getCmp('maxes-form-items').add({
        id:'maxes-' + liftProperty,
        xtype:'numberfield',
        name:liftProperty,
        label:liftName,
        value:record.data.max
    });
};

wendler.maxes.controller.rebuildMaxesList = function () {
    Ext.getCmp('maxes-form-items').removeAll();
    wendler.maxes.controller.buildMaxesFromStore();
};

wendler.maxes.controller.editLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'));
};

wendler.stores.lifts.Lifts.addListener('update', function (store, record,op) {
    var propertyName = record.data.propertyName;
    var max = record.data.max;

    var existingInput = Ext.getCmp('maxes-' + propertyName);
    if( typeof(existingInput) !== "undefined" ){
        existingInput.setValue(max);
    }
});

wendler.maxes.cards.maxesForm = {
    xtype:'formpanel',
    id:'maxes-form',
    scroll:util.scrolling.lockedVerticalScroller,
    items:[
        {
            id:'maxes-form-items',
            xtype:'fieldset',
            style:'margin-top: 0',
            defaults:{
                listeners:{
                    change:wendler.maxes.controller.liftValuesChanged
                },
                labelWidth:'35%',
                useClearIcon:true
            }
        }
    ],
    dockedItems:[
        {
            id:'maxes-toolbar',
            xtype:'toolbar',
            dock:'top',
            title:'Maxes',
            items:[
                {xtype:'spacer'},
                {
                    id:'edit-lifts-button',
                    ui:'action',
                    text:'Edit Lifts',
                    handler:wendler.maxes.controller.editLiftButtonPressed
                }
            ]
        }
    ]
};