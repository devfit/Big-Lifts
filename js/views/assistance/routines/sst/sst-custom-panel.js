Ext.define("biglifts.views.SstCustomPanel", {
    extend:"biglifts.views.CustomPanel",
    editCustomMovement:function (dataview, index) {
    },
    addCustomMovement:function () {
    },
    filterCustomMovements:function () {
        biglifts.stores.assistance.SSTSets.filter('week', 1);
    },
    supportsAdd:false,
    supportsArrange:false,
    config:{
        cls:'assistance',
        layout:'fit',
        assistanceType:null,
        listConfig:null,
        customMovementStore:null,
        movementEditor:null,
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
                    tapAction:this.getMovementEditor() ? Ext.bind(this.editCustomMovement, this) : Ext.emptyFn
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