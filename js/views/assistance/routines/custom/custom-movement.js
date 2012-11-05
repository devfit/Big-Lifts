Ext.define("Biglifts.views.Custom", {
    extend:"Ext.Panel",
    movementEditor:null,
    assistanceType:'',
    filterCustomMovements:function () {
        this.customMovementStore.clearFilter();
        this.customMovementStore.filter('liftProperty', biglifts.assistance.currentLiftProperty);
    },
    editCustomMovement:function (dataview, index) {
        var movement = this.customMovementStore.getAt(index);
        Ext.getCmp(this.movementEditor).showEditCustomMovement(movement);
    },
    addCustomMovement:function () {
        this.customMovementStore.add({liftProperty:biglifts.assistance.currentLiftProperty, name:"", sets:5, reps:15});
        this.customMovementStore.sync();
        Ext.getCmp(this.movementEditor).showEditCustomMovement(this.customMovementStore.last());
    },
    logMovements:function () {
        var me = this;
        this.customMovementStore.each(function (record) {
            var assistanceRecord = {
                movement:record.get('name'),
                assistanceType:me.assistanceType,
                sets:record.get('sets'),
                reps:record.get('reps'),
                weight:record.get('weight'),
                timestamp:new Date().getTime(),
                cycle: biglifts.stores.CurrentCycle.getCurrentCycle()
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
        listeners:{
            initialize:function () {
                var me = this;
                me.add([
                    {
                        xtype:'toolbar',
                        docked:'top',
                        title:'Custom',
                        items:[
                            {
                                text:'Back',
                                ui:'back',
                                handler:function () {
                                    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                                }
                            },
                            {
                                xtype:'spacer'
                            },
                            {
                                text:'Save',
                                ui:'confirm',
                                listeners:{
                                    initialize:function () {
                                        this.setHandler(Ext.bind(me.logMovements, me));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype:'toolbar',
                        docked:'bottom',
                        cls:'custom-movement-toolbar',
                        items:[
                            {
                                text:'Add...',
                                ui:'confirm',
                                listeners:{
                                    initialize:function () {
                                        this.setHandler(Ext.bind(me.addCustomMovement, me));
                                    }
                                }
                            }
                        ]
                    }
                ]);
                this.add({
                    xtype:'list',
                    store:this.customMovementStore,
                    itemTpl:"<table class='assistance-table'><tbody><tr>" +
                        "<td width='50%'><span class='name'>{name}</b></td><td width='20%'>{sets} sets</td><td style='text-align:right;' width='30%'>{reps}x " +
                        "{[biglifts.logList.getWeightDisplay(values.weight)]}" +
                        "{[biglifts.stores.Settings.first().get('units')]}</td>" +
                        "</tr></tbody></table>",
                    listeners:{
                        itemtap:Ext.bind(this.editCustomMovement, this)
                    }
                });
            },
            show:function () {
                biglifts.navigation.setBackFunction(function () {
                    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                });
                this.filterCustomMovements();
            }
        }
    }
});