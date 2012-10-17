Ext.ns('biglifts.defaults', 'biglifts.stores.migrations');
Ext.define('LiftLogSort', {
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
        fields:[
            {name:'id', type:'int'},
            {name:'ascending', type:'boolean', defaultValue:false},
            {name:'property', type:'string', defaultValue:'timestamp'}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-log-sort-proxy'
        }
    }
});

biglifts.defaults.liftLogSort = {
    'ascending':false,
    'property':'timestamp'
};

biglifts.stores.recovery.setupDefaultSort = function () {
    util.withNoFilters(biglifts.stores.LiftLogSort, function () {
        if (biglifts.stores.LiftLogSort.getCount() == 0) {
            biglifts.stores.LiftLogSort.add(biglifts.defaults.liftLogSort);
            biglifts.stores.LiftLogSort.sync();
        }
    });
};

biglifts.stores.LiftLogSort = Ext.create('Ext.data.Store', {
    model:'LiftLogSort',
    listeners:{
        load:function () {
            biglifts.stores.recovery.setupDefaultSort();
        }
    }
});
biglifts.stores.push(biglifts.stores.LiftLogSort);