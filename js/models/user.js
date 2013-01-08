"use strict";
Ext.ns('biglifts.stores');

Ext.define('biglifts.models.User', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'username', type: 'string'},
            {name: 'password', type: 'string'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'user'
        }
    }
});

Ext.define("biglifts.stores.UserStore", {
    extend: "Ext.data.Store",
    CREATE_USER_URL: 'http://biglifts.herokuapp.com:3000/users',
    createUserRemotely: function () {
        Ext.Ajax.request({
            url: this.CREATE_USER_URL,
            method: 'POST',
            success: function (response) {
                var user = JSON.parse(response.responseText).user;
                this.add({username: user.username, password: user.password});
                this.sync();
            },
            failure: function (response) {
            },
            scope: this
        });
    },
    config: {
        model: 'biglifts.models.User',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.createUserRemotely();
                }
            }
        }
    }
});

biglifts.stores.Users = Ext.create('biglifts.stores.UserStore');
biglifts.stores.push(biglifts.stores.Users);