"use strict";
Ext.ns('biglifts.stores.lifts');

Ext.define('Template', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'name', type:'string'},
            {name:'hasMeetGoals', type:'boolean'}
        ],
        proxy:{
            type:'localstorage',
            id:'template-proxy'
        }
    }
});

biglifts.stores.Template = Ext.create('Ext.data.Store', {
    model:'Template',
    listeners:{
        load:function (store) {
            if (store.getCount() === 0) {
                store.add({name:'manual', hasMeetGoals:false});
                store.sync();
            }
        }
    }
});

biglifts.stores.push(biglifts.stores.Template);
