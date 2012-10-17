Ext.ns('biglifts.defaults', 'biglifts.stores.migrations');
Ext.define('LiftLog', {
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'liftName', type:'string'},
            {name:'weight', type:'string'},
            {name:'units', type:'string'},
            {name:'reps', type:'int'},
            {name:'notes', type:'string', defaultValue:''},
            {name:'expectedReps', type:'int'},
            {name:'week', type:'int'},
            {name:'cycle', type:'int'},
            {name:'timestamp', type:'int'}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-log-proxy'
        }
    }
});

biglifts.stores.migrations.migrateDatesToTimestamps = function (r) {
    var date = r.get('date');
    var timestamp = r.get('timestamp');
    if (timestamp === 0) {
        if (date === null) {
            r.set('timestamp', new Date().getTime());
            r.save();
            biglifts.stores.LiftLog.sync();
        }
        else {
            r.set('timestamp', date.getTime());
            r.save();
            biglifts.stores.LiftLog.sync();
        }
    }
};

biglifts.stores.migrations.setupExpectedReps = function (r) {
    if (r.get('expectedReps') <= 0) {
        r.set('expectedReps', biglifts.stores.lifts.findExpectedRepsForWeek(r.get('week')));
        r.save();
        biglifts.stores.LiftLog.sync();
    }
};

biglifts.stores.migrations.liftLogMigration = function () {
    util.withNoFilters(biglifts.stores.LiftLog, function () {
        biglifts.stores.LiftLog.each(function (r) {
            biglifts.stores.migrations.migrateDatesToTimestamps(r);
            biglifts.stores.migrations.setupExpectedReps(r);
        });
    });
};

biglifts.stores.LiftLog = Ext.create('Ext.data.Store', {
    model:'LiftLog',
    listeners:{
        load:function () {
            biglifts.stores.migrations.liftLogMigration();
        }
    }
});
biglifts.stores.push(biglifts.stores.LiftLog);