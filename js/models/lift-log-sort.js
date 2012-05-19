Ext.ns('wendler.defaults', 'wendler.stores.migrations');
Ext.define('LiftLogSort', {
    extend:'Ext.data.Model',
    config:{
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

wendler.defaults.liftLogSort = {
    'ascending':false,
    'property':'timestamp'
};

wendler.stores.recovery.setupDefaultSort = function () {
    util.withNoFilters(wendler.stores.LiftLogSort, function () {
        if (wendler.stores.LiftLogSort.getCount() == 0) {
            wendler.stores.LiftLogSort.add(wendler.defaults.liftLogSort);
            wendler.stores.LiftLogSort.sync();
        }
    });
};

wendler.stores.LiftLogSort = Ext.create('Ext.data.Store', {
    model:'LiftLogSort',
    listeners:{
        load:function () {
            wendler.stores.recovery.setupDefaultSort();
            util.filebackup.watchStoreSync(wendler.stores.LiftLogSort);
        }
    }
});
wendler.stores.LiftLogSort.load();
util.cloudbackup.watchStoreSync(wendler.stores.LiftLogSort);