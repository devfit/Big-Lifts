Ext.define('PowerliftingTotalConfig', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'lift_id', type:'string'},
            {name:'included', type:'boolean'}
        ],
        proxy:{
            type:'localstorage',
            id:'powerlifting-total'
        }
    }
});

Ext.define('PowerliftingTotalConfigStore', {
    extend:'Ext.data.Store',
    setupDefaults:function () {
        var me = this;
        util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
            var defaults = ['Squat', 'Deadlift', 'Bench'];
            _.each(defaults, function (name) {
                var lift = biglifts.stores.lifts.Lifts.findRecord('name', name);
                if (lift) {
                    me.add({lift_id:lift.get('id'), included:true});
                }
            });
        });
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