Ext.ns('wendler.stores.assistance');
Ext.define('AssistanceActivity', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'assistanceType', type:'string'},
            {name:'movement', type:'string'},
            {name:'weight', type:'float'},
            {name:'sets', type:'int'},
            {name:'reps', type:'int'},
            {name:'timestamp', type:'int'}
        ],
        proxy:{
            type:'localstorage',
            id:'assistance-activity-proxy'
        }
    }
});

wendler.stores.assistance.ActivityLog = Ext.create('Ext.data.Store', {
    model:'AssistanceActivity'
});
wendler.stores.push(wendler.stores.assistance.ActivityLog);