Ext.ns('wendler.defaults', 'wendler.stores');
Ext.define('Meta', {
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'firstTimeInApp', type:'boolean'}
        ],
        proxy:{
            type:'localstorage',
            id:'meta-proxy'
        }
    }
});

wendler.defaults.meta = {
    firstTimeInApp:true
};

wendler.stores.Meta = Ext.create('Ext.data.Store', {
    model:'Meta',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add(wendler.defaults.meta);
                this.sync();
            }
        }
    }
});
wendler.stores.push(wendler.stores.Meta);