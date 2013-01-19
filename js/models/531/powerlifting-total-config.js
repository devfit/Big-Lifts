Ext.define('PowerliftingTotalConfig', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'useEstimates', type:'boolean'}
        ],
        proxy:{
            type:'localstorage',
            id:'powerlifting-config'
        }
    }
});

Ext.define('PowerliftingTotalConfigStore', {
    extend:'Ext.data.Store',
    setupDefaults:function () {
        this.add({useEstimates:true});
        this.sync();
    },
    config:{
        model:'PowerliftingTotalConfig',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.setupDefaults();
                }
            }
        }
    }
});

biglifts.stores.PowerliftingTotalConfig = Ext.create('PowerliftingTotalConfigStore');
biglifts.stores.push(biglifts.stores.PowerliftingTotalConfig);