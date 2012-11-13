Ext.ns('biglifts.defaults', 'biglifts.stores.migrations');
Ext.define('LiftLog', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
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
            biglifts.stores.LiftLog.sync();
        }
        else {
            r.set('timestamp', date.getTime());
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

Ext.define('LiftLogStore', {
    sortLog:function (property, direction) {
        this.sort(property, direction);

        if (property === 'liftName') {
            this.data.addSorter(new Ext.util.Sorter({
                property:'timestamp',
                direction:'DESC'
            }));

            this.sort();
        }
    },
    liftLogMigration:function () {
        util.withNoFilters(biglifts.stores.LiftLog, function () {
            biglifts.stores.LiftLog.each(function (r) {
                biglifts.stores.migrations.migrateDatesToTimestamps(r);
                biglifts.stores.migrations.setupExpectedReps(r);
            });
        });
    },
    extend:'Ext.data.Store',
    config:{
        model:'LiftLog',
        listeners:{
            load:function () {
                this.liftLogMigration();
            }
        }
    }
});

biglifts.stores.LiftLog = Ext.create('LiftLogStore');
biglifts.stores.push(biglifts.stores.LiftLog);