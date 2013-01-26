Ext.define('biglifts.views.ss.ConfigPromo', {
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

        var html = "Big Lifts Pro currently supports the following templates:" +
            "\n<ul>" +
            "<li>» Standard</li>" +
            "<li>» Pure Novice</li>" +
            "</ul>";
        this.add({html:html, cls:'message'});
    }
});