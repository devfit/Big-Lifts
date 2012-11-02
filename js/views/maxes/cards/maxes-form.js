Ext.ns('biglifts.maxes.cards', 'biglifts.maxes.controller');

biglifts.maxes.liftValuesChanged = function (el, newValue) {
    var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', el.getName());
    lift.set('max', newValue);
    lift.save();
    biglifts.stores.lifts.Lifts.sync();
};

biglifts.maxes.controller.buildMaxesFromStore = function () {
    biglifts.stores.lifts.Lifts.each(biglifts.maxes.controller.createMaxesInput, this);
    biglifts.stores.lifts.Lifts.each(biglifts.maxes.controller.createTrainingMaxesInput, this);
};

biglifts.maxes.controller.createMaxesInput = function (record) {
    var liftName = record.data.name;
    var liftProperty = record.data.propertyName;

    Ext.getCmp('maxes-form-items').add({
        id:'maxes-' + liftProperty,
        xtype:'numberfield',
        name:liftProperty,
        label:liftName,
        value:record.data.max
    });

    Ext.getCmp('meet-goals').add({
        id:'meet-goal-' + liftProperty,
        xtype:'numberfield',
        name:liftProperty,
        label:liftName,
        value:record.data.max
    });
};

biglifts.maxes.controller.createTrainingMaxesInput = function (record) {
    var trainingMaxPercentage = biglifts.stores.Settings.first().data['trainingMaxPercentage'] / 100.0;
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

biglifts.maxes.controller.showHideTrainingMaxes = function () {
    var settings = biglifts.stores.Settings.first();

    var trainingMaxesPanel = Ext.getCmp('training-maxes-panel');
    if (settings.data['useTrainingMax']) {
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

biglifts.maxes.controller.rebuildMaxesList = function () {
    Ext.getCmp('maxes-form-items').removeAll();
    Ext.getCmp('training-maxes').removeAll();
    biglifts.maxes.controller.buildMaxesFromStore();
};

biglifts.stores.Settings.addListener('beforesync', function () {
    if (Ext.getCmp('training-maxes-panel')) {
        biglifts.maxes.controller.showHideTrainingMaxes();
    }
});

biglifts.stores.lifts.Lifts.addListener('beforesync', function () {
    if (Ext.getCmp('maxes-form-items')) {
        biglifts.maxes.controller.rebuildMaxesList();
    }
});

biglifts.maxes.controller.editLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-panel'));
};

biglifts.maxes.controller.updateTrainingPercentageDisplay = function () {
    var trainingMaxPercentage = biglifts.stores.Settings.first().data['trainingMaxPercentage'];
    var trainingMaxPercentageIndicator = Ext.get('training-max-percentage-indicator');
    if (trainingMaxPercentageIndicator) {
        trainingMaxPercentageIndicator.setHtml(trainingMaxPercentage);
    }

    if (Ext.getCmp('training-maxes')) {
        Ext.getCmp('training-maxes').removeAll();
        biglifts.stores.lifts.Lifts.each(biglifts.maxes.controller.createTrainingMaxesInput, this);
    }
};

biglifts.stores.Settings.addListener('beforesync', biglifts.maxes.controller.updateTrainingPercentageDisplay);

biglifts.maxes.controller.addLiftButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'), {type:'slide', direction:'left'});
};

biglifts.maxes.controller.barPlateButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('bar-plate-setup-panel'), {type:'slide', direction:'left'});
};

biglifts.maxes.meetGoalsChanged = function (el, newValue) {
    var meetGoal = biglifts.stores.lifts.MeetGoals.findRecord('propertyName', el.getName());
    meetGoal.set('weight', newValue);
    meetGoal.save();
    biglifts.stores.lifts.MeetGoals.sync();
};

biglifts.maxes.showHideMeetGoals = function () {
    if (Ext.getCmp('meet-goals')) {
        var template = biglifts.stores.Template.first();
        if (template.get('hasMeetGoals')) {
            Ext.getCmp('meet-goals').show();
        }
        else {
            Ext.getCmp('meet-goals').hide();
        }
    }
};

biglifts.stores.Template.addListener('beforesync', biglifts.maxes.showHideMeetGoals);

biglifts.maxes.cards.maxesFormEditable = {
    xtype:'panel',
    flex:3,
    bodyPadding:0,
    items:[
        {
            id:'maxes-form-items',
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            style:'margin-bottom:0.5em',
            title:'Maxes',
            defaults:{
                listeners:{
                    change:biglifts.maxes.liftValuesChanged
                },
                labelWidth:'45%',
                useClearIcon:true
            }
        },
        {
            id:'meet-goals',
            hidden:true,
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            title:'Meet Goals',
            defaults:{
                listeners:{
                    change:biglifts.maxes.meetGoalsChanged
                },
                labelWidth:'45%',
                useClearIcon:true
            }
        }
    ]
};

biglifts.maxes.cards.trainingMaxes = {
    xtype:'panel',
    id:'training-maxes-panel',
    flex:1,
    bodyPadding:0,
    listeners:{
        painted:function () {
            if (!this._painted) {
                this._painted = true;
                biglifts.maxes.controller.updateTrainingPercentageDisplay();
            }
        }
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

biglifts.maxes.cards.maxesForm = {
    xtype:'formpanel',
    id:'maxes-form',
    scroll:'vertical',
    listeners:{
        show:function () {
            biglifts.navigation.unbindBackEvent();
            biglifts.maxes.showHideMeetGoals();
        },
        initialize:function () {
            if (biglifts.toggles.BarLoading) {
                this.add({
                    id:'lift-settings-toolbar',
                    xtype:'toolbar',
                    docked:'bottom',
                    ui:'light',
                    items:[
                        {xtype:'spacer'},
                        {
                            id:'setup-plates-button',
                            handler:biglifts.maxes.controller.barPlateButtonPressed,
                            ui:'action',
                            text:'Bar/Plates'
                        }
                    ]
                });
            }
        },
        painted:function () {
            biglifts.maxes.controller.buildMaxesFromStore();
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
                    handler:biglifts.maxes.controller.editLiftButtonPressed
                },
                {xtype:'spacer'},
                {
                    id:'add-lift-button',
                    iconCls:'add',
                    iconMask:true,
                    handler:biglifts.maxes.controller.addLiftButtonPressed,
                    ui:'action'
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
                biglifts.maxes.cards.maxesFormEditable,
                biglifts.maxes.cards.trainingMaxes
            ]
        }
    ]
};