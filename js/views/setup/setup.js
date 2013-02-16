Ext.define('biglifts.views.Setup', {
    extend:'Ext.Panel',
    showLoadingIndicator:function (callback) {
        this.loadingIndicator = this.loadingIndicator || Ext.Viewport.add({
            masked:{
                xtype:'loadmask'
            }
        });

        this.loadingIndicator.show();
        setTimeout(callback, 100);
    },
    hideLoadingIndicator:function () {
        if (this.loadingIndicator) {
            this.loadingIndicator.hide();
        }
    },
    showUserConfiguration:function () {
        this.setActiveItem(this.userSetup);
    },
    showRoutineChooser:function () {
        this.setActiveItem(this.routineChooser);
    },
    constructor:function () {
        this.callParent(arguments);
        this.routineChooser = this.add(Ext.create('biglifts.views.RoutineChooser'));
        this.userSetup = this.add(Ext.create('biglifts.views.UserSetup'));
    },
    config:{
        id:'setup',
        layout:'card'
    }
});