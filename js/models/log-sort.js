Ext.define('LogSort', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'ascending', type: 'boolean', defaultValue: false},
            {name: 'property', type: 'string', defaultValue: 'timestamp'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'lift-log-sort-proxy'
        }
    }
});

Ext.define('LogSortStore', {
    extend: "Ext.data.Store",
    DEFAULT_LOG_SORT: {
        'ascending': false,
        'property': 'timestamp'
    },
    setupDefaultSort: function () {
        this.add(this.DEFAULT_LOG_SORT);
        this.sync();
    },
    config: {
        model: 'LogSort',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.setupDefaultSort();
                }
            }
        }
    }
});

biglifts.stores.LogSort = Ext.create('LogSortStore');
biglifts.stores.push(biglifts.stores.LogSort);