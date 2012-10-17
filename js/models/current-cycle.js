"use strict";
Ext.ns('biglifts.stores.recovery');
Ext.define('CurrentCycle', {
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'cycle', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'current-cycle-proxy'
        }
    }
});

biglifts.stores.recovery.setupDefaultCurrentCycle = function () {
    util.withNoFilters(biglifts.stores.CurrentCycle, function () {
        if (biglifts.stores.CurrentCycle.getCount() == 0) {
            biglifts.stores.CurrentCycle.add({cycle:1});
            biglifts.stores.CurrentCycle.sync();
        }
    });
};

biglifts.stores.CurrentCycle = Ext.create('Ext.data.Store', {
    model:'CurrentCycle',
    listeners:{
        load:function(){
            biglifts.stores.recovery.setupDefaultCurrentCycle();
        }
    }
});
biglifts.stores.push(biglifts.stores.CurrentCycle);