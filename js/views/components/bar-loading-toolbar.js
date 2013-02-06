Ext.define('biglifts.components.BarSetupToolbar', {
    extend:'Ext.Toolbar',
    constructor:function () {
        this.callParent(arguments);
        this.add({xtype:'spacer'});
        this.add({
            xtype:'button',
            handler:this.getShowAction(),
            ui:'action',
            text:'Bar/Plates'
        });
    },
    config:{
        showAction:null,
        docked:'bottom',
        ui:'light'
    }
});