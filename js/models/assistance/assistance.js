Ext.ns('biglifts.stores.assistance');
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
            {name:'timestamp', type:'int'},
            {name:'notes', type:'string', defaultValue:''}
        ],
        proxy:{
            type:'localstorage',
            id:'assistance-activity-proxy'
        }
    }
});

biglifts.stores.assistance.ActivityLog = Ext.create('Ext.data.Store', {
    model:'AssistanceActivity',
    filters:[
        {
            filterFn:function (item) {
                return item.get("assistanceType") !== "NONE";
            }
        }
    ]
});
biglifts.stores.push(biglifts.stores.assistance.ActivityLog);