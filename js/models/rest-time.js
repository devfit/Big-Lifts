Ext.ns('wendler.defaults', 'wendler.stores');
Ext.define('RestTime', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'restTimeInSeconds', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'rest-time-proxy'
        }
    }
});

wendler.stores.RestTime = Ext.create('Ext.data.Store', {
    model:'RestTime',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add({restTimeInSeconds:0});
                this.sync();
            }
        }
    }
});
wendler.stores.push(wendler.stores.RestTime);