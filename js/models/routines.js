"use strict";

Ext.define('Routine', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'name', type:'string'}
        ],
        proxy:{
            type:'localstorage',
            id:'routine-proxy'
        }
    }
});


Ext.define('RoutineStore', {
    extend:'Ext.data.Store',
    config:{
        model:'Routine'
    }
});

biglifts.stores.Routine = Ext.create('RoutineStore');
biglifts.stores.push(biglifts.stores.Routine);