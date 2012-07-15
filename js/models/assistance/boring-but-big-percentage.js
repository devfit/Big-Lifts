Ext.ns('wendler.defaults', 'wendler.stores.assistance');
Ext.define('BoringButBigPercentage', {
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'percentage', type:'int'}
        ],
        proxy:{
            type:'localstorage',
            id:'boring-but-big-percentage-proxy'
        }
    }
});

wendler.stores.assistance.BoringButBigPercentage = Ext.create('Ext.data.Store', {
    model:'BoringButBigPercentage',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add({percentage: 50});
                this.sync();
            }
        }
    }
});
wendler.stores.push(wendler.stores.assistance.BoringButBigPercentage);