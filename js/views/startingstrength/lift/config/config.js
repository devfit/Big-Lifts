Ext.define('biglifts.views.ss.Config', {
    extend:"Ext.Carousel",
    goBack:function () {
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout'));
    },
    constructor:function () {
        this.callParent(arguments);

        if (biglifts.premium) {
            this.add(Ext.create('biglifts.views.ss.TemplateDefault'));
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