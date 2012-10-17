Ext.ns('biglifts.defaults', 'biglifts.stores');
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

biglifts.defaults.meta = {
    firstTimeInApp:true
};

biglifts.stores.Meta = Ext.create('Ext.data.Store', {
    model:'Meta',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add(biglifts.defaults.meta);
                this.sync();
            }
        }
    }
});
biglifts.stores.push(biglifts.stores.Meta);