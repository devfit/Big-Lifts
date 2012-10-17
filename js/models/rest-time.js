Ext.ns('biglifts.defaults', 'biglifts.stores');
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

biglifts.stores.RestTime = Ext.create('Ext.data.Store', {
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
biglifts.stores.push(biglifts.stores.RestTime);