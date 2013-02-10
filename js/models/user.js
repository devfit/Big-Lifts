"use strict";
Ext.ns('biglifts.stores');

Ext.define('biglifts.models.User', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'username', type:'string'},
            {name:'password', type:'string'}
        ],
        proxy:{
            type:'localstorage',
            id:'user'
        }
    }
});

Ext.define("biglifts.stores.UserStore", {
    extend:"Ext.data.Store",
    CREATE_USER_URL:'http://biglifts.herokuapp.com/users',
    withUserCallbacks:[],
    withUser:function (callback) {
        var me = this;
        util.withLoadedStore(this, function () {
            if (me.getCount() === 0) {
                me.withUserCallbacks.push(callback);
            } else {
                callback(me.first());
            }
        });
    },
    fireCallbacks:function () {
        var user = this.first();
        _.each(this.withUserCallbacks, function (callback) {
            callback(user);
        });
    },
    createUserRemotely:function () {
        Ext.Ajax.request({
            url:this.CREATE_USER_URL,
            method:'POST',
            success:function (response) {
                var user = JSON.parse(response.responseText).user;
                this.add({username:user.username, password:user.password});
                this.sync();
                this.fireCallbacks();
            },
            failure:function (response) {
            },
            scope:this
        });
    },
    config:{
        model:'biglifts.models.User',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.createUserRemotely();
                }
            }
        }
    }
});

biglifts.stores.Users = Ext.create('biglifts.stores.UserStore');
biglifts.stores.push(biglifts.stores.Users);