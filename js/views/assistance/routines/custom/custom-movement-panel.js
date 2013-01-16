Ext.define("biglifts.views.CustomPanel", {
    extend:"Ext.Panel",
    arrangeAssistance:function () {
        this.getParent().showArrange();
    },
    editCustomMovement:function (dataview, index) {
        var movement = this.getCustomMovementStore().getAt(index);
        Ext.getCmp(this.getMovementEditor()).showEditCustomMovement(movement);
    },
    addCustomMovement:function () {
        this.getCustomMovementStore().addWithOrder({liftProperty:Ext.getCmp('assistance-lift-chooser').currentLiftProperty, name:"", sets:5, reps:15});
        this.getCustomMovementStore().sync();
        Ext.getCmp(this.getMovementEditor()).showEditCustomMovement(this.getCustomMovementStore().last());
    },
    logMovements:function () {
        var me = this;
        this.getCustomMovementStore().each(function (record) {
            var assistanceRecord = {
                movement:record.get('name'),
                assistanceType:me.getAssistanceType(),
                sets:record.get('sets'),
                reps:record.get('reps'),
                weight:record.get('weight'),
                timestamp:new Date().getTime(),
                cycle:biglifts.stores.CurrentCycle.getCurrentCycle()
            };

            biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
            biglifts.stores.assistance.ActivityLog.sync();
        });

        Ext.getCmp('assistance').setActiveItem(0);
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    config:{
        cls:'assistance',
        layout:'fit',
        assistanceType:null,
        filterCustomMovements:null,
        listConfig:null,
        customMovementStore:null,
        movementEditor:null,
        supportsAdd:true,
        supportsArrange:true,
        listeners:{
            initialize:function () {
                var me = this;

                me.filterCustomMovements = me.getFilterCustomMovements() || function () {
                    me.getCustomMovementStore().clearFilter();
                    me.getCustomMovementStore().filter('liftProperty', Ext.getCmp('assistance-lift-chooser').currentLiftProperty);
                };

                me.topToolbar = me.add({
                    xtype:'toolbar',
                    docked:'top',
                    title:me.getAssistanceType()
                });

                this.backButton = this.topToolbar.add({
                    text:'Back',
                    ui:'back',
                    handler:function () {
                        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                    }
                });

                this.topToolbar.add({
                    xtype:'spacer'
                });

                this.saveButton = this.topToolbar.add({
                    text:'Save',
                    ui:'confirm',
                    listeners:{
                        initialize:function () {
                            this.setHandler(Ext.bind(me.logMovements, me));
                        }
                    }
                });

                me.bottomToolbar = this.add(Ext.create('biglifts.components.AssistanceToolbar', {
                    addAction:this.getSupportsAdd() ? Ext.bind(me.addCustomMovement, me) : null,
                    arrangeAction:this.getSupportsArrange() ? Ext.bind(me.arrangeAssistance, me) : null
                }));

                var listConfig = this.getListConfig() || {};
                Ext.merge(listConfig, {
                    store:this.getCustomMovementStore(),
                    tapAction:Ext.bind(this.editCustomMovement, this)
                });

                me.movementList = me.add(Ext.create('biglifts.views.CustomMovementList', listConfig));
            },
            painted:function () {
                biglifts.navigation.setBackFunction(function () {
                    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                });
                this.filterCustomMovements();
            }
        }
    }
});