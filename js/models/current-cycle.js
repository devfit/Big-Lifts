"use strict";
Ext.ns('wendler.stores.recovery');
Ext.define('CurrentCycle', {
    extend:'Ext.data.Model',
    config:{
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

wendler.stores.recovery.setupDefaultCurrentCycle = function () {
    util.withNoFilters(wendler.stores.CurrentCycle, function () {
        if (wendler.stores.CurrentCycle.getCount() == 0) {
            wendler.stores.CurrentCycle.add({cycle:1});
            wendler.stores.CurrentCycle.sync();
        }
    });
};

wendler.stores.CurrentCycle = Ext.create('Ext.data.Store', {
    model:'CurrentCycle',
    listeners:{
        load:function(){
            wendler.stores.recovery.setupDefaultCurrentCycle();
        }
    }
});
wendler.stores.push(wendler.stores.CurrentCycle);