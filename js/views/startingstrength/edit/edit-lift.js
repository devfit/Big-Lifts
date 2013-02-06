Ext.define('biglifts.views.ss.EditLift', {
    extend:'Ext.form.Panel',
    back:function () {
        this.getRecord().set(this.getValues());
        biglifts.stores.ss.Lifts.sync();
        Ext.getCmp('ss-edit').showEditLifts();
    },
    showEditLift:function (record) {
        this.setRecord(record);
        Ext.getCmp('ss-edit').showEditIndividualLift();
    },
    config:{
        id:'ss-edit-lift',
        listeners:{
            initialize:function () {
                this.add({
                    xtype:'toolbar',
                    docked:'top',
                    title:'Edit',
                    items:[
                        {xtype:'button', ui:'back', text:'Back', handler:Ext.bind(this.back, this)}
                    ]
                });

                this.add({
                    xtype:'fieldset',
                    items:[
                        {
                            xtype:'textfield',
                            name:'name',
                            label:'Name'
                        },
                        {
                            labelWidth:'66%',
                            xtype:'numberfield',
                            name:'increase',
                            label:'Increase'
                        }
                    ]
                });
            }
        }
    }
});