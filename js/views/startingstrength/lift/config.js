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

        var html = "Big Lifts Pro currently supports the following configs:" +
            "\n<ul>" +
            "<li>» Pure Novice</li>" +
            "<li>» Regular</li>" +
            "</ul>";
        this.add({
            xtype:'container',
            html:html,
            cls:'message'
        });
    },
    config:{
        cls:'ss-config',
        id:'ss-config'
    }
});