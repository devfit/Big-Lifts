Ext.ns('biglifts.maxes.cards', 'biglifts.maxes.controller');

Ext.define("Biglifts.views.MaxesForm", {
    extend:'Ext.form.Panel',
    xtype:'maxesform',
    showHideMeetGoals:function () {
        if (Ext.getCmp('meet-goals')) {
            var template = biglifts.stores.Template.first();
            if (template.get('hasMeetGoals')) {
                Ext.getCmp('meet-goals').show();
            }
            else {
                Ext.getCmp('meet-goals').hide();
            }
        }
    },
    updateTrainingPercentageDisplay:function () {
        var trainingMaxPercentage = biglifts.stores.Settings.first().data['trainingMaxPercentage'];
        var trainingMaxPercentageIndicator = Ext.get('training-max-percentage-indicator');
        if (trainingMaxPercentageIndicator) {
            trainingMaxPercentageIndicator.setHtml(trainingMaxPercentage);
        }

        if (Ext.getCmp('training-maxes')) {
            Ext.getCmp('training-maxes').removeAll(true);
            biglifts.stores.lifts.Lifts.each(this.createTrainingMaxesInput, this);
        }
    },
    buildMaxesFromStore:function () {
        biglifts.stores.lifts.Lifts.each(this.createMaxesInput, this);
        biglifts.stores.lifts.Lifts.each(this.createTrainingMaxesInput, this);
    },
    createMaxesInput:function (record) {
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
    },
    createTrainingMaxesInput:function (record) {
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
    },
    showHideTrainingMaxes:function () {
        if (!Ext.getCmp('training-maxes-panel')) {
            return;
        }

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
    },
    rebuildMaxesList:function () {
        biglifts.stores.lifts.Lifts.clearFilter(true);
        biglifts.stores.lifts.Lifts.filter('enabled', true);

        if (Ext.getCmp('maxes-form-items')) {
            Ext.getCmp('maxes-form-items').removeAll(true);
            Ext.getCmp('training-maxes').removeAll(true);
            this.buildMaxesFromStore();
        }
    },
    liftValuesChanged:function (el, newValue) {
        var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', el.getName());
        lift.set('max', newValue);
        lift.save();
        biglifts.stores.lifts.Lifts.sync();
    },
    editLiftButtonPressed:function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lifts-panel'));
    },
    meetGoalsChanged:function (el, newValue) {
        var meetGoal = biglifts.stores.lifts.MeetGoals.findRecord('propertyName', el.getName());
        meetGoal.set('weight', newValue);
        meetGoal.save();
        biglifts.stores.lifts.MeetGoals.sync();
    },
    barPlateButtonPressed:function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('bar-plate-setup-panel'));
    },
    addLiftButtonPressed:function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-add-lift-panel'));
    },
    config:{
        scroll:'vertical',
        cls:'start-page',
        listeners:{
            painted:function () {
                biglifts.stores.lifts.Lifts.clearFilter(true);
                biglifts.stores.lifts.Lifts.filter('enabled', true);
                biglifts.navigation.unbindBackEvent();

                this.rebuildMaxesList();
                this.showHideMeetGoals();

                if (!this._painted) {
                    this._painted = true;

                    biglifts.stores.Settings.addListener('beforesync', Ext.bind(this.updateTrainingPercentageDisplay, this));
                    biglifts.stores.Settings.addListener('beforesync', Ext.bind(this.showHideTrainingMaxes, this));
                    biglifts.stores.Template.addListener('beforesync', Ext.bind(this.showHideMeetGoals, this));
                }
            },
            initialize:function () {
                var me = this;
                if (biglifts.toggles.BarLoading) {
                    me.add({
                        id:'lift-settings-toolbar',
                        xtype:'toolbar',
                        docked:'bottom',
                        ui:'light',
                        items:[
                            {xtype:'spacer'},
                            {
                                id:'setup-plates-button',
                                handler:Ext.bind(me.barPlateButtonPressed, me),
                                ui:'action',
                                text:'Bar/Plates'
                            }
                        ]
                    });
                }

                me.add([
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
                                handler:Ext.bind(me.editLiftButtonPressed, me)
                            },
                            {xtype:'spacer'},
                            {
                                id:'add-lift-button',
                                iconCls:'add',
                                iconMask:true,
                                handler:Ext.bind(me.addLiftButtonPressed, me),
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
                            {
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
                                                change:Ext.bind(me.liftValuesChanged, me)
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
                                                change:Ext.bind(me.meetGoalsChanged, me)
                                            },
                                            labelWidth:'45%',
                                            useClearIcon:true
                                        }
                                    }
                                ]
                            },
                            {
                                xtype:'panel',
                                id:'training-maxes-panel',
                                flex:1,
                                bodyPadding:0,
                                items:[
                                    {
                                        id:'training-maxes',
                                        xtype:'fieldset',
                                        cls:'fieldset-title-no-margin',
                                        title:'<span id="training-max-percentage-indicator"></span>%'
                                    }
                                ]
                            }
                        ]
                    }
                ]);

                this.updateTrainingPercentageDisplay();
                this.buildMaxesFromStore();
            }
        }
    }
});
biglifts.maxes.cards.maxesForm = {xtype:'maxesform', id:'maxes-form'};