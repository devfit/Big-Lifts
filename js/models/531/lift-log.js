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
    extend:'Ext.data.Store',
    config:{
        storeId:'log531',
        model:'LiftLog'
    }
});

biglifts.stores.LiftLog = Ext.create('LiftLogStore');
biglifts.stores.push(biglifts.stores.LiftLog);