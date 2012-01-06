Ext.ns('wendler.defaults', 'wendler.stores');
Ext.regModel('LiftLog', {
    fields:[
        {name:'id', type:'integer'},
        {name:'liftName', type:'string'},
        {name:'weight', type:'string'},
        {name:'reps', type:'integer'},
        {name:'week', type:'integer'},
        {name:'cycle', type:'integer'},
        {name:'date', type: 'date'}
    ],
    proxy:{
        type:'localstorage',
        id:'lift-log-proxy'
    }
});

wendler.stores.LiftLog = new Ext.data.Store({
    model:'LiftLog'
});
wendler.stores.LiftLog.load();