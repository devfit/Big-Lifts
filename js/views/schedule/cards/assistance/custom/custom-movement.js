Ext.define("Biglifts.views.Custom", {
    extend:"Ext.Panel",
    movementEditor: null,
    filterCustomMovements:function () {
        this.customMovementStore.clearFilter();
        this.customMovementStore.filter('liftProperty', biglifts.liftSchedule.currentLiftProperty);
    },
    editCustomMovement:function (dataview, index) {
        var movement = this.customMovementStore.getAt(index);
        Ext.getCmp(this.movementEditor).showEditCustomMovement(movement);
    },
    addCustomMovement:function () {
        this.customMovementStore.add({liftProperty:biglifts.liftSchedule.currentLiftProperty, name:"", sets:5, reps:15});
        this.customMovementStore.sync();
        Ext.getCmp(this.movementEditor).showEditCustomMovement(this.customMovementStore.last());
    },
    logMovements:function () {
        this.customMovementStore.each(function (record) {
            var assistanceRecord = {
                movement:record.get('name'),
                assistanceType:'Custom',
                sets:record.get('sets'),
                reps:record.get('reps'),
                weight:record.get('weight'),
                timestamp:new Date().getTime()
            };

            biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
            biglifts.stores.assistance.ActivityLog.sync();
        });

        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    config:{
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
                                handler:biglifts.liftSchedule.assistance.returnToAssistanceSelect
                            },
                            {
                                xtype:'spacer'
                            },
                            {
                                text:'Save',
                                ui:'confirm',
                                listeners:{
                                    initialize:function () {
                                        this.setHandler(me.logMovements);
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
                                        this.setHandler(me.addCustomMovement);
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
                biglifts.navigation.setBackFunction(biglifts.liftSchedule.assistance.returnToAssistanceSelect);
                this.filterCustomMovements();
            }
        }
    }
});