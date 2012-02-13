Ext.ns('wendler.defaults', 'wendler.stores.migrations');
Ext.regModel('LiftLog', {
    fields:[
        {name:'id', type:'integer'},
        {name:'liftName', type:'string'},
        {name:'weight', type:'string'},
        {name:'units', type:'string'},
        {name:'reps', type:'integer'},
        {name:'notes', type:'string', defaultValue:''},
        {name:'expectedReps', type:'integer'},
        {name:'week', type:'integer'},
        {name:'cycle', type:'integer'},
        {name:'timestamp', type:'integer'},
        //type: date is broken on Android 2.2. Maintain this property until all customers have migrated data
        {name:'date', type:'date'}
    ],
    proxy:{
        type:'localstorage',
        id:'lift-log-proxy'
    }
});

wendler.stores.migrations.migrateDatesToTimestamps = function (r) {
    var date = r.get('date');
    var timestamp = r.get('timestamp');
    if (timestamp === 0) {
        if (date === null) {
            r.set('timestamp', new Date().getTime());
            r.save();
            wendler.stores.LiftLog.sync();
        }
        else {
            r.set('timestamp', date.getTime());
            r.save();
            wendler.stores.LiftLog.sync();
        }
    }
};

wendler.stores.migrations.liftLogMigration = function () {
    util.withNoFilters(wendler.stores.LiftLog, function () {
        wendler.stores.LiftLog.each(function (r) {
            wendler.stores.migrations.migrateDatesToTimestamps(r);
        });
    });
};

wendler.stores.LiftLog = new Ext.data.Store({
    model:'LiftLog',
    listeners:{
        load:function () {
            wendler.stores.migrations.liftLogMigration();
        }
    }
});
wendler.stores.LiftLog.load();