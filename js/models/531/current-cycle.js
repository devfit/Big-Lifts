"use strict";
Ext.ns('biglifts.stores.recovery');
Ext.define('CurrentCycle', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
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

Ext.define('CurrentCycleStore', {
    extend:'Ext.data.Store',
    setupDefaultCurrentCycle:function () {
        if (this.getCount() == 0) {
            this.add({cycle:1});
            this.sync();
        }
    },
    getCurrentCycle:function () {
        return this.first().get('cycle');
    },
    config:{
        model:'CurrentCycle',
        listeners:{
            load:function () {
                this.setupDefaultCurrentCycle();
            }
        }
    }
});

biglifts.stores.CurrentCycle = Ext.create('CurrentCycleStore');
biglifts.stores.push(biglifts.stores.CurrentCycle);