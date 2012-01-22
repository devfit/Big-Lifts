"use strict";
Ext.ns('wendler.stores.recovery');
Ext.regModel('CurrentCycle', {
    fields:[
        {name:'id', type:'integer'},
        {name:'cycle', type:'integer'}
    ],
    proxy:{
        type:'localstorage',
        id:'current-cycle-proxy'
    }
});

wendler.stores.recovery.setupDefaultCurrentCycle = function () {
    if (wendler.stores.CurrentCycle.getCount() == 0) {
        wendler.stores.CurrentCycle.add({cycle:1});
        wendler.stores.CurrentCycle.sync();
    }
};

wendler.stores.CurrentCycle = new Ext.data.Store({
    model:'CurrentCycle',
    listeners:{
        load:wendler.stores.recovery.setupDefaultCurrentCycle
    }
});
wendler.stores.CurrentCycle.load();