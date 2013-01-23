Ext.define('biglifts.views.ss.Config', {
    extend:"Ext.Panel",
    goBack:function () {
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout'));
    },
    constructor:function () {
        this.callParent(arguments);

        this.topToolbar = this.add({
            xtype:'toolbar',
            title:'Config'
        });

        this.topToolbar.add({
            xtype:'button',
            ui:'back',
            text:'Back',
            handler:this.goBack
        });

        if (biglifts.premium) {

        }
        else {
            this.add(Ext.create('biglifts.views.ss.ConfigPromo'));
        }
    },
    config:{
        cls:'ss-config',
        id:'ss-config'
    }
});