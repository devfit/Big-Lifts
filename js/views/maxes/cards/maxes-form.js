Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.liftValuesChanged = function (el, newValue) {
    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', el.name);
    lift.set('max', newValue);
    lift.save();
    wendler.liftSchedule.controller.updateLiftValues();
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

    var trainingMax = util.roundNumber(0.9 * record.data.max, '0.5', 'normal');
    Ext.getCmp('training-maxes').add({
        id:'maxes-' + liftProperty + '-training',
        xtype:'textfield',
        name:liftProperty + "-training",
        value:trainingMax,
        cls: 'training-max-value',
        listeners: {
            afterrender: function(ele) {
                ele.fieldEl.dom.readOnly = true;
            }
        }
    });
};

wendler.maxes.controller.rebuildMaxesList = function () {
    Ext.getCmp('maxes-form-items').removeAll();
    wendler.maxes.controller.buildMaxesFromStore();
};

wendler.maxes.controller.editLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-list'));
};

wendler.stores.lifts.Lifts.addListener('update', function (store, record, op) {
    var propertyName = record.data.propertyName;
    var max = record.data.max;

    var existingInput = Ext.getCmp('maxes-' + propertyName);
    if (typeof(existingInput) !== "undefined") {
        existingInput.setValue(max);
        var trainingMaxInput = Ext.getCmp('maxes-' + propertyName + '-training');
        trainingMaxInput.setValue(util.roundNumber(0.9 * max, '0.5', 'normal'));
    }
});

wendler.maxes.controller.addLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'), {type:'slide', direction:'left'});
};

wendler.maxes.cards.maxesFormEditable = {
    xtype:'panel',
    flex:3,
    bodyPadding:0,
    items:[
        {
            id:'maxes-form-items',
            xtype:'fieldset',
            title:'Maxes',
            defaults:{
                listeners:{
                    change:wendler.maxes.controller.liftValuesChanged
                },
                labelWidth:'35%',
                useClearIcon:true
            }
        }
    ]
};

wendler.maxes.cards.trainingMaxes = {
    xtype:'panel',
    flex:1,
    bodyPadding:0,
    items:[
        {
            id:'training-maxes',
            xtype:'fieldset',
            title:'90%'
        }
    ]
};

wendler.maxes.cards.maxesForm = {
    xtype:'formpanel',
    id:'maxes-form',
    items:[
        {
            xtype:'panel',
            layout:{
                type:'hbox'
            },
            padding:0,
            bodyPadding:0,
            items:[
                wendler.maxes.cards.maxesFormEditable,
                wendler.maxes.cards.trainingMaxes
            ]
        }
    ],
    dockedItems:[
        {
            id:'maxes-toolbar',
            xtype:'toolbar',
            dock:'top',
            title:'Lifts',
            items:[
                {
                    id:'add-lift-button',
                    iconCls:'add',
                    iconMask:true,
                    handler:wendler.maxes.controller.addLiftButtonPressed,
                    ui:'action'
                },
                {xtype:'spacer'},
                {
                    id:'edit-lifts-button',
                    ui:'action',
                    text:'Edit',
                    handler:wendler.maxes.controller.editLiftButtonPressed
                }
            ]
        }
    ]
};