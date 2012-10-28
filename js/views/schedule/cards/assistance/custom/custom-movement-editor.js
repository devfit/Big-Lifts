Ext.define('biglifts.views.CustomMovementEditor', {
    extend:'Ext.form.Panel',
    xtype:'custommovementeditor',
    assistanceViewId:null,
    showEditCustomMovement:function (movement) {
        Ext.getCmp('lift-schedule').setActiveItem(this);
        this.setRecord(movement);
    },
    returnToCustom:function () {
        console.log( this.assistanceViewId );
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp(this.assistanceViewId));
    },
    deleteMovement:function () {
        var record = this.getRecord();
        biglifts.stores.assistance.TriumvirateMovement.remove(record);
        biglifts.stores.assistance.TriumvirateMovement.sync();

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