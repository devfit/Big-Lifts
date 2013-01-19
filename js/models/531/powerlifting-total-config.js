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
    addMissingEntries:function () {
        var me = this;
        biglifts.stores.lifts.Lifts.each(function (l) {
            var matchingEntry = me.findRecord('lift_id', l.get('id'));
            if (!matchingEntry) {
                me.add({lift_id:l.get('id'), included:false});
            }
        });
    },
    removeStaleEntries:function () {
        var me = this;
        me.each(function (p) {
            var liftEntry = biglifts.stores.lifts.Lifts.findRecord('id', p.get('lift_id'));
            if (!liftEntry) {
                me.remove(p);
            }
        });
    },
    syncToLifts:function () {
        this.addMissingEntries();
        this.removeStaleEntries();
        this.sync();
    },
    config:{
        model:'PowerliftingTotalConfig',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.setupDefaults();
                    biglifts.stores.lifts.Lifts.addListener("beforesync", this.syncToLifts, this);
                }
            }
        }
    }
});

biglifts.stores.PowerliftingTotalConfig = Ext.create('PowerliftingTotalConfigStore');
biglifts.stores.push(biglifts.stores.PowerliftingTotalConfig);