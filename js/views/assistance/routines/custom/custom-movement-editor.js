Ext.define('biglifts.views.CustomMovementEditor', {
    extend:'Ext.form.Panel',
    xtype:'custommovementeditor',
    assistanceViewId:null,
    customMovementStore:null,
    showEditCustomMovement:function (movement) {
        Ext.getCmp('assistance').setActiveItem(this);
        this.setRecord(movement);
    },
    returnToCustom:function () {
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp(this.assistanceViewId));
    },
    deleteMovement:function () {
        var record = this.getRecord();
        this.customMovementStore.remove(record);
        this.customMovementStore.sync();

        this.returnToCustom.call(this);
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
                                        this.setHandler(Ext.bind(me.returnToCustom, me));
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
                                        this.setHandler(Ext.bind(me.deleteMovement, me));
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
                                    this.addListener('change', Ext.bind(me.saveMovementChange, me));
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