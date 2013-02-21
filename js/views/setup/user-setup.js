Ext.define('biglifts.views.UserSetup', {
    extend:'Ext.form.Panel',
    UPDATE_USER_URL:'http://biglifts.herokuapp.com/users/1',
    saveChanges:function () {
        this.enableDisableFields(false);
        this.saveRemoteUser(this.getValues());
    },
    showFlashMessage:function (message, successful) {
        this.flashMessage.removeCls('failure');
        this.flashMessage.removeCls('success');
        if (successful) {
            this.flashMessage.addCls('success');
        }
        else {
            this.flashMessage.addCls('failure');
        }

        this.flashMessage.setHtml(message);

        this.flashMessage.show();
    },
    saveSuccessful:function (message) {
        this.enableDisableFields(true);

        this.showFlashMessage(message, true);

        var user = biglifts.stores.Users.first();
        user.set(this.getValues());
        user.save();
        biglifts.stores.Users.sync();
        biglifts.stores.Users.fireEvent('beforesync');
    },
    saveFailure:function (message) {
        this.enableDisableFields(true);
        this.showFlashMessage(message, false);
    },
    saveRemoteUser:function (newUser) {
        Ext.Ajax.request({
            url:this.UPDATE_USER_URL,
            method:'PUT',
            headers:Ext.create('biglifts.models.HeadersBuilder').buildAuthHeaders(),
            success:function (response) {
                this.saveSuccessful(JSON.parse(response.responseText).status);
            },
            jsonData:newUser,
            failure:function (response) {
                try {
                    this.saveFailure(JSON.parse(response.responseText).status);
                }
                catch (e) {
                }
            },
            scope:this
        });
    },
    enableDisableFields:function (enabled) {
        this.saveButton.setDisabled(!enabled);
        this.userField.setDisabled(!enabled);
        this.passwordField.setDisabled(!enabled);
    },
    setupWaitForUser:function () {
        var me = this;
        biglifts.stores.Users.withUser(function (user) {
            me.enableDisableFields(true);
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

        var fieldset = this.add({xtype:'fieldset', style:'margin-bottom: 4px'});
        this.userField = fieldset.add({xtype:'textfield', name:'username', value:'Loading...', label:'User', disabled:true});
        this.passwordField = fieldset.add({xtype:'textfield', name:'password', value:'Loading...', label:'Pass', disabled:true});
        this.setupWaitForUser();

        this.flashMessage = this.add({
            hidden:true,
            cls:'flash-message',
            style:'text-align:right'
        });
    },
    config:{
        id:'user-setup',
        listeners:{
            painted:function () {
                this.flashMessage.hide();
            }
        }
    }
});