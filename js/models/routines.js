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
    DEFAULT_ROUTINES:[
        {name:'5x5'},
        {name:'5/3/1'}
    ],
    config:{
        model:'Routine',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.add(this.DEFAULT_ROUTINES);
                    this.sync();
                }
            }
        }
    }
});

biglifts.stores.Routines = Ext.create('RoutineStore');
biglifts.stores.push(biglifts.stores.Routines);