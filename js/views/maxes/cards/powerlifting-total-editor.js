Ext.define("biglifts.views.PowerliftingTotalEditor", {
    extend:"Ext.form.Panel",
    listeners:{
        initialize:function () {
            this.add({
                xtype:'toolbar',
                title:"Total",
                items:[
                    {
                        xtype:'button',
                        ui:'back',
                        text:'Back'
                    }
                ]
            });
        }
    }
});