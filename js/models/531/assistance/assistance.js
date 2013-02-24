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
    getLastAssistanceType:function () {
        var me = this;
        var assistanceType = null;
        util.withNoFilters(me, function () {
            if (me.getCount() > 0) {
                var highestTimestamp = 0;
                var lastAssistanceRecord = null;
                me.each(function (record) {
                    if (record.get('timestamp') > highestTimestamp) {
                        lastAssistanceRecord = record;
                        highestTimestamp = record.get('timestamp');
                    }
                });

                assistanceType = lastAssistanceRecord.get('assistanceType');
            }
        });
        return assistanceType;
    },
    filterOutNoneEntries:function () {
        this.filterBy(function (item) {
            return item.get("assistanceType") !== "NONE";
        });
    },
    config:{
        model:'AssistanceActivity',
        storeId:'assistanceLog',
        listeners:{
            load:function () {
                this.filterOutNoneEntries();
            }
        }
    }
});

biglifts.stores.assistance.ActivityLog = Ext.create('ActivityLogStore');
biglifts.stores.push(biglifts.stores.assistance.ActivityLog);