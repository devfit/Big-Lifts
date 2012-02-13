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
        //type: date is broken on Android 2.2
        {name:'date', type:'integer'}
    ],
    proxy:{
        type:'localstorage',
        id:'lift-log-proxy'
    }
});

wendler.stores.migrations.fixAndroid22BrokenDate = function (r) {
    if (r.get('date') === null) {
        r.set('date', new Date().getTime());
        r.save();
        wendler.stores.LiftLog.sync();
    }
};

wendler.stores.migrations.migrateStringDatesToTimestamps = function (r) {
    var date = r.get('date');
    console.log( typeof( date ) );
    if (typeof(date) === "string") {
        r.set('date', Date.parse(date));
        r.save();
        wendler.stores.LiftLog.sync();
    }
};

wendler.stores.migrations.liftLogMigration = function () {
    util.withNoFilters(wendler.stores.LiftLog, function () {
        wendler.stores.LiftLog.each(function (r) {
            wendler.stores.migrations.fixAndroid22BrokenDate(r);
            wendler.stores.migrations.migrateStringDatesToTimestamps(r);
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