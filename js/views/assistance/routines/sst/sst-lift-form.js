Ext.define('biglifts.views.SimplestStrengthTemplateEditLift', {
    extend:"Ext.form.Panel",
    constructor:function () {
        this.callParent(arguments);

        var topToolbar = this.add({
            xtype:'toolbar',
            title:'Edit',
            docked:'top'
        });

        topToolbar.add({
            xtype:'button',
            ui:'back',
            text:'Back',
            handler:Ext.bind(this.goBack, this)
        });

        this.liftFieldset = this.add({
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            items:[
                {
                    label:'Name',
                    name:'name',
                    xtype:'textfield'
                },
                {
                    label:'Max',
                    name:'max',
                    xtype:'numberfield'
                }
            ]
        });
    },
    goBack:function () {
        this.getRecord().set(this.getValues());
        biglifts.stores.assistance.SST.sync();
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('sst-maxes'));
    },
    showFor:function (r) {
        Ext.getCmp('assistance').setActiveItem(this);
        this.setRecord(r);
    },
    config:{
        id:'sst-lift-form'
    }
});