"use strict";
Ext.ns('wendler.stores.lifts');

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

wendler.stores.Template = Ext.create('Ext.data.Store', {
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

wendler.stores.push(wendler.stores.Template);
