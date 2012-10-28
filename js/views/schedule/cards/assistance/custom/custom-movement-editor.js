Ext.define('biglifts.views.CustomMovementEditor', {
    extend:'Ext.form.Panel',
    xtype:'custommovementeditor',
    assistanceViewId:null,
    showEditCustomMovement:function (movement) {
        Ext.getCmp('lift-schedule').setActiveItem(this);
        this.setRecord(movement);
    },
    returnToCustom:function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp(this.assistanceViewId));
    },
    deleteMovement:function () {
        var record = this.getRecord();
        biglifts.stores.assistance.CustomMovement.remove(record);
        biglifts.stores.assistance.CustomMovement.sync();

        this.returnToCustom();
    },
    saveMovementChange:function () {
        var newValues = this.getValues();
        var record = this.getRecord();
        var newData = Ext.merge(record.data, newValues);

        record.set(newData);
        record.save();
    },
    config:{
        listeners:{
            initialize:function () {
                var me = this;
                me.add([
                    {
                        xtype:'toolbar',
                        docked:'top',
                        title:'Edit',
                        items:[
                            {
                                xtype:'button',
                                ui:'back',
                                text:'Back',
                                listeners:{
                                    initialize:function () {
                                        this.setHandler(me.returnToCustom);
                                    }
                                }
                            },
                            {xtype:'spacer'},
                            {
                                ui:'decline',
                                iconMask:true,
                                iconCls:'trash',
                                listeners:{
                                    initialize:function () {
                                        this.setHandler(me.deleteMovement);
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        cls:'fieldset-title-no-margin',
                        defaults:{
                            listeners:{
                                initialize:function () {
                                    this.addListener('change', me.saveMovementChange);
                                }
                            }
                        },
                        items:[
                            {
                                xtype:'textfield',
                                label:'Name',
                                name:'name'
                            },
                            {
                                xtype:'numberfield',
                                label:'Sets',
                                name:'sets'
                            },
                            {
                                xtype:'numberfield',
                                label:'Reps',
                                name:'reps'
                            },
                            {
                                xtype:'numberfield',
                                label:'Weight',
                                name:'weight'
                            }
                        ]
                    }
                ]);
            },
            show:function () {
                biglifts.navigation.setBackFunction(this.returnToCustom);
            }
        }
    }
});