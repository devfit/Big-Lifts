Ext.define('biglifts.views.ss.Template', {
    extend:"Ext.Panel",
    templateName:"",
    templateDescription:"",
    goForward:null,
    setTemplate:function () {
        Ext.Msg.alert('Update', this.templateName + " template has been applied.", function () {
            Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout'));
        });
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

        this.topToolbar.add({xtype:'spacer'});

        if (this.goForward) {
            this.topToolbar.add({
                xtype:'button',
                ui:'forward',
                text:'Next',
                handler:this.goForward
            });
        }

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