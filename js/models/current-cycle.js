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
wendler.stores.CurrentCycle = new Ext.data.Store({
    model:'CurrentCycle',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add({cycle:1});
                this.sync();
            }
        }
    }
});
wendler.stores.CurrentCycle.load();