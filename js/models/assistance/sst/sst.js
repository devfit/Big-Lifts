Ext.ns('biglifts.stores.assistance');
Ext.define('SstMovement', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'name', type:'string'},
            {name:'lift_id', type:'string'},
            {name:'max', type:'float'}
        ]
    }
});

Ext.define("SstStore", {
    extend:"Ext.data.Store",
    setupDefaults:function () {
        var store = this;
        var defaultValues = {
            'Squat':'Straight Leg Deadlift',
            'Press':'Close Grip Bench Press',
            'Bench':'Incline Press',
            'Deadlift':'Front Squat'
        };
        util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
            util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
                biglifts.stores.lifts.Lifts.each(function (l) {
                    var name = _.has(defaultValues, l.get('name')) ? defaultValues[l.get('name')] : '?';
                    store.add({name:name, lift_id:l.get('id'), max:0});
                });
            });

            store.sync();
        });
    },
    config:{
        model:'SstMovement',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.setupDefaults();
                }
            }
        }
    }
});

biglifts.stores.assistance.SST = Ext.create('SstStore');
biglifts.stores.push(biglifts.stores.assistance.SST);