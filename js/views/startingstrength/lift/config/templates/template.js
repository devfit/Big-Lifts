Ext.define('biglifts.views.ss.Template', {
    extend:"Ext.Panel",
    templateName:"",
    templateDescription:"",
    setTemplate:function () {
        Ext.Msg.alert('Update', this.templateName + " template has been applied.");
    },
    constructor:function () {
        this.callParent(arguments);

        this.topToolbar = this.add({
            xtype:'toolbar',
            title:this.templateName
        });

        this.topToolbar.add({
            xtype:'button',
            ui:'back',
            text:'Back',
            handler:this.goBack
        });

        this.add({
            html:this.templateDescription
        });

        this.add({
            xtype:'button',
            ui:'confirm',
            text:'Use',
            handler:Ext.bind(this.setTemplate, this)
        });
    }
});