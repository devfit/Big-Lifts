Ext.define('biglifts.views.UserSetup', {
    extend:'Ext.form.Panel',
    saveChanges:function () {

    },
    setupWaitForUser:function () {
        var me = this;
        biglifts.stores.Users.withUser(function (user) {
            me.saveButton.setDisabled(false);
            me.userField.setDisabled(false);
            me.passwordField.setDisabled(false);
            me.setRecord(user);
        });
    },
    constructor:function () {
        this.callParent(arguments);

        var toolbar = this.add({
            xtype:'toolbar',
            docked:'top',
            title:'Sync'
        });

        var setup = Ext.getCmp('setup');
        toolbar.add({
            xtype:'button',
            ui:'back',
            text:'Back',
            handler:Ext.bind(setup.showRoutineChooser, setup)
        });

        toolbar.add({
            xtype:'spacer'
        });

        this.saveButton = toolbar.add({
            xtype:'button',
            ui:'confirm',
            disabled:true,
            text:'Save',
            handler:Ext.bind(this.saveChanges, this)
        });

        var fieldset = this.add({xtype:'fieldset'});
        this.userField = fieldset.add({xtype:'textfield', name:'username', value:'Loading...', label:'User', disabled:true});
        this.passwordField = fieldset.add({xtype:'textfield', name:'password', value:'Loading...', label:'Password', disabled:true});
        this.setupWaitForUser();
    },
    config:{
        id:'user-setup'
    }
});