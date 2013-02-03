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
            {name:'timestamp', type:'int'},
            {name:'workout_id', type:'int'}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-log-proxy'
        }
    }
});

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
    addLogEntry:function (l) {
        var currentMaxId = this.max('workout_id');
        l.workout_id = _.isNull(currentMaxId) || _.isUndefined(currentMaxId) ? 1 : currentMaxId + 1;
        l.timestamp = new Date().getTime();
        this.add(l);
        this.sync();
    },
    extend:'Ext.data.Store',
    config:{
        storeId:'log531',
        model:'LiftLog'
    }
});

biglifts.stores.LiftLog = Ext.create('LiftLogStore');
biglifts.stores.push(biglifts.stores.LiftLog);