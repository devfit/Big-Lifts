Ext.ns('wendler.defaults', 'wendler.stores');
Ext.regModel('Meta', {
    fields:[
        {name:'id', type:'integer'},
        {name:'firstTimeInApp', type:'boolean'}
    ],
    proxy:{
        type:'localstorage',
        id:'meta-proxy'
    }
});

wendler.defaults.meta = {
    firstTimeInApp:true
};

wendler.stores.Meta = new Ext.data.Store({
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
wendler.stores.Meta.load();