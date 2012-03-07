Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.liftValuesChanged = function (el, newValue) {
    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', el.name);
    lift.set('max', newValue);
    lift.save();
    wendler.stores.lifts.Lifts.sync();
    wendler.liftSchedule.controller.updateLiftValues();
};

wendler.maxes.controller.buildMaxesFromStore = function () {
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createMaxesInput, this);
    Ext.getCmp('maxes-form-items').doLayout();
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createTrainingMaxesInput, this);
    Ext.getCmp('training-maxes').doLayout();
};

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

wendler.maxes.controller.createTrainingMaxesInput = function (record) {
    var trainingMaxPercentage = wendler.stores.Settings.first().data['training-max-percentage'] / 100.0;
    var trainingMax = util.roundNumber(trainingMaxPercentage * record.data.max, '0.5', 'normal');
    var liftProperty = record.data.propertyName;
    Ext.getCmp('training-maxes').add({
        id:'maxes-' + liftProperty + '-training',
        xtype:'textfield',
        name:liftProperty + "-training",
        value:trainingMax,
        listeners:{
            afterrender:function (ele) {
                ele.fieldEl.dom.readOnly = true;
            }
        }
    });
};

wendler.maxes.controller.showHideTrainingMaxes = function (r, changed) {
    var trainingMaxesPanel = Ext.getCmp('training-maxes-panel');
    if (changed.data['use-training-max']) {
        if (trainingMaxesPanel.isHidden()) {
            trainingMaxesPanel.flex = 1;
            trainingMaxesPanel.show();
            Ext.getCmp('maxes-form-hbox').doLayout();
        }
    }
    else {
        if (!trainingMaxesPanel.isHidden()) {
            trainingMaxesPanel.flex = 0;
            trainingMaxesPanel.hide();
            Ext.getCmp('maxes-form-hbox').doLayout();
        }
    }
};
wendler.stores.Settings.addListener('update', wendler.maxes.controller.showHideTrainingMaxes);

wendler.maxes.controller.rebuildMaxesList = function () {
    Ext.getCmp('maxes-form-items').removeAll();
    Ext.getCmp('training-maxes').removeAll();
    wendler.maxes.controller.buildMaxesFromStore();
};

wendler.maxes.controller.editLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-panel'));
};

wendler.stores.lifts.Lifts.addListener('update', function (store, record, op) {
    var propertyName = record.data.propertyName;
    var max = record.data.max;

    var existingInput = Ext.getCmp('maxes-' + propertyName);
    if (typeof(existingInput) !== "undefined") {
        existingInput.setValue(max);
        var trainingMaxInput = Ext.getCmp('maxes-' + propertyName + '-training');
        var trainingMaxPercentage = wendler.stores.Settings.first().data['training-max-percentage'] / 100.0;
        trainingMaxInput.setValue(util.roundNumber(trainingMaxPercentage * max, '0.5', 'normal'));
    }
});

wendler.maxes.controller.updateTrainingPercentageDisplay = function () {
    var trainingMaxPercentage = wendler.stores.Settings.first().data['training-max-percentage'];
    var trainingMaxPercentageIndicator = Ext.get('training-max-percentage-indicator');
    if (trainingMaxPercentageIndicator !== null) {
        trainingMaxPercentageIndicator.setHTML(trainingMaxPercentage);
    }

    Ext.getCmp('training-maxes').removeAll();
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createTrainingMaxesInput, this);
    Ext.getCmp('training-maxes').doLayout();
};

wendler.stores.Settings.addListener('update', wendler.maxes.controller.updateTrainingPercentageDisplay);

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
                labelWidth:'45%',
                useClearIcon:true
            }
        }
    ]
};

wendler.maxes.cards.trainingMaxes = {
    xtype:'panel',
    id:'training-maxes-panel',
    flex:1,
    bodyPadding:0,
    listeners:{
        afterlayout:wendler.maxes.controller.updateTrainingPercentageDisplay
    },
    items:[
        {
            id:'training-maxes',
            xtype:'fieldset',
            title:'<span id="training-max-percentage-indicator"></span>%'
        }
    ]
};

wendler.maxes.cards.maxesForm = {
    xtype:'formpanel',
    id:'maxes-form',
    scroll:'vertical',
    listeners:{
        afterrender:function () {
            wendler.maxes.controller.buildMaxesFromStore();
            wendler.maxes.controller.showHideTrainingMaxes(null, wendler.stores.Settings.first());
        }
    },
    items:[
        {
            xtype:'panel',
            id:'maxes-form-hbox',
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
                    id:'edit-lifts-button',
                    ui:'action',
                    text:'Edit',
                    handler:wendler.maxes.controller.editLiftButtonPressed
                },
                {xtype:'spacer'},
                {
                    id:'add-lift-button',
                    iconCls:'add',
                    iconMask:true,
                    handler:wendler.maxes.controller.addLiftButtonPressed,
                    ui:'action'
                }
            ]
        }
    ]
};