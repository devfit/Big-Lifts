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
            {name:'notes', type:'string', defaultValue:''},
            {name:'cycle', type:'int', defaultValue:1}
        ],
        proxy:{
            type:'localstorage',
            id:'assistance-activity-proxy'
        }
    }
});

Ext.define("ActivityLogStore", {
    extend:"Ext.data.Store",
    filterOutNoneEntries:function () {
        this.filterBy(function (item) {
            return item.get("assistanceType") !== "NONE";
        });
    },
    config:{
        model:'AssistanceActivity',
        listeners:{
            load:function () {

            }
        }
    }
});

biglifts.stores.assistance.ActivityLog = Ext.create('ActivityLogStore');
biglifts.stores.push(biglifts.stores.assistance.ActivityLog);