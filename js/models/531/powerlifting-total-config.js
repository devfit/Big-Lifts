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
        util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
            util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
                var defaults = ['Squat', 'Deadlift', 'Bench'];
                biglifts.stores.lifts.Lifts.each(function (lift) {
                    if (_.indexOf(defaults, lift.get('name')) !== -1) {
                        me.add({lift_id:lift.get('id'), included:true});
                    }
                    else {
                        me.add({lift_id:lift.get('id'), included:false});
                    }
                });
            });
        });
        me.sync();
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