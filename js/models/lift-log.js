Ext.ns('wendler.defaults', 'wendler.stores.migrations');
Ext.define('LiftLog', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'id', type:'int'},
            {name:'liftName', type:'string'},
            {name:'weight', type:'string'},
            {name:'units', type:'string'},
            {name:'reps', type:'int'},
            {name:'notes', type:'string', defaultValue:''},
            {name:'expectedReps', type:'int'},
            {name:'week', type:'int'},
            {name:'cycle', type:'int'},
            {name:'timestamp', type:'int'},
            //type: date is broken on Android 2.2. Maintain this property until all customers have migrated data
            {name:'date', type:'date'}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-log-proxy'
        }
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

wendler.stores.migrations.setupExpectedReps = function (r) {
    if (r.get('expectedReps') <= 0) {
        r.set('expectedReps', wendler.stores.lifts.findExpectedRepsForWeek(r.get('week')));
        r.save();
        wendler.stores.LiftLog.sync();
    }
};

wendler.stores.migrations.liftLogMigration = function () {
    util.withNoFilters(wendler.stores.LiftLog, function () {
        wendler.stores.LiftLog.each(function (r) {
            wendler.stores.migrations.migrateDatesToTimestamps(r);
            wendler.stores.migrations.setupExpectedReps(r);
        });
    });
};

wendler.stores.LiftLog = Ext.create('Ext.data.Store', {
    model:'LiftLog',
    listeners:{
        load:function () {
            wendler.stores.migrations.liftLogMigration();
        }
    }
});
wendler.stores.LiftLog.load();
util.filebackup.watchStoreSync(wendler.stores.LiftLog);
util.cloudbackup.watchStoreSync(wendler.stores.LiftLog);