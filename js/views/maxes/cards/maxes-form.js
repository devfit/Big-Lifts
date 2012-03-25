Ext.ns('wendler.maxes.cards', 'wendler.maxes.controller');

wendler.maxes.controller.liftValuesChanged = function (el, newValue) {
    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', el.getName());
    lift.set('max', newValue);
    lift.save();
    wendler.stores.lifts.Lifts.sync();
    wendler.liftSchedule.controller.updateLiftValues();
};

wendler.maxes.controller.buildMaxesFromStore = function () {
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createMaxesInput, this);
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createTrainingMaxesInput, this);
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
        readOnly:true
    });
};

wendler.maxes.controller.showHideTrainingMaxes = function () {
    var settings = wendler.stores.Settings.first();
    var trainingMaxesPanel = Ext.getCmp('training-maxes-panel');
    if (settings.data['use-training-max']) {
        if (trainingMaxesPanel.isHidden()) {
            trainingMaxesPanel.flex = 1;
            trainingMaxesPanel.show();
        }
    }
    else {
        if (!trainingMaxesPanel.isHidden()) {
            trainingMaxesPanel.flex = 0;
            trainingMaxesPanel.hide();
        }
    }
};
wendler.stores.Settings.addListener('beforesync', wendler.maxes.controller.showHideTrainingMaxes);
wendler.stores.lifts.Lifts.addListener('beforesync', function () {
    wendler.maxes.controller.rebuildMaxesList();
});


wendler.maxes.controller.rebuildMaxesList = function () {
    Ext.getCmp('maxes-form-items').removeAll();
    Ext.getCmp('training-maxes').removeAll();
    wendler.maxes.controller.buildMaxesFromStore();
};

wendler.maxes.controller.editLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-panel'));
};

wendler.maxes.controller.updateTrainingPercentageDisplay = function () {
    var trainingMaxPercentage = wendler.stores.Settings.first().data['training-max-percentage'];
    var trainingMaxPercentageIndicator = Ext.get('training-max-percentage-indicator');
    if (trainingMaxPercentageIndicator !== null) {
        trainingMaxPercentageIndicator.setHtml(trainingMaxPercentage);
    }

    Ext.getCmp('training-maxes').removeAll();
    wendler.stores.lifts.Lifts.each(wendler.maxes.controller.createTrainingMaxesInput, this);
};

wendler.stores.Settings.addListener('update', wendler.maxes.controller.updateTrainingPercentageDisplay);

wendler.maxes.controller.addLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'), {type:'slide', direction:'left'});
};

wendler.maxes.controller.barPlateButtonPressed = function(){
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('bar-plate-setup-panel'), {type:'slide', direction:'left'});
};

wendler.maxes.cards.maxesFormEditable = {
    xtype:'panel',
    flex:3,
    bodyPadding:0,
    items:[
        {
            id:'maxes-form-items',
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
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
        painted:wendler.maxes.controller.updateTrainingPercentageDisplay
    },
    items:[
        {
            id:'training-maxes',
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            title:'<span id="training-max-percentage-indicator"></span>%'
        }
    ]
};

wendler.maxes.cards.maxesForm = {
    xtype:'formpanel',
    id:'maxes-form',
    scroll:'vertical',
    listeners:{
        painted:function () {
            wendler.maxes.controller.buildMaxesFromStore();
            wendler.maxes.controller.showHideTrainingMaxes(null, wendler.stores.Settings.first());
        }
    },
    items:[
        {
            id:'maxes-toolbar',
            xtype:'toolbar',
            docked:'top',
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
        },
        {
            id:'lift-settings-toolbar',
            xtype:'toolbar',
            docked:'bottom',
            ui:'light',
            items:[
                {xtype:'spacer'},
                {
                    id:'setup-plates-button',
                    handler:wendler.maxes.controller.barPlateButtonPressed,
                    ui:'action',
                    text:'Bar/Plates'
                }
            ]
        },
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
    ]
};