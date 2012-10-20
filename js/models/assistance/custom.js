Ext.ns('biglifts.stores.assistance');
Ext.define('CustomMovement', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'liftProperty', type:'string'},
            {name:'name', type:'string'},
            {name:'sets', type:'integer'},
            {name:'reps', type:'integer'},
            {name:'weight', type:'integer', defaultValue:0}
        ],
        proxy:{
            type:'localstorage',
            id:'triumvirate-movement-proxy'
        }
    }
});

Ext.define("CustomMovementStore", {
    extend:"Ext.data.Store",
    DEFAULT_CUSTOM_LIFTS:[
        {liftProperty:'squat', name:'Leg Press', sets:5, reps:15},
        {liftProperty:'squat', name:'Leg Curl', sets:5, reps:15},
        {liftProperty:'deadlift', name:'Good Morning', sets:5, reps:15},
        {liftProperty:'deadlift', name:'Hanging Leg Raise', sets:5, reps:15},
        {liftProperty:'press', name:'Dips', sets:5, reps:15},
        {liftProperty:'press', name:'Chin-Ups', sets:5, reps:15},
        {liftProperty:'bench', name:'Dumbbell Bench Press', sets:5, reps:15},
        {liftProperty:'bench', name:'Dumbbell Row', sets:5, reps:15}
    ],
    addMissingCustomLiftAssociations:function () {
        var store = this;
        util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
            biglifts.stores.lifts.Lifts.each(function (lift) {
                var existingMovement = store.findRecord('liftProperty', lift.get('propertyName'));
                if (!existingMovement) {
                    for (var i = 0; i < 2; i++) {
                        store.add({
                            liftProperty:lift.get('propertyName'),
                            name:'?',
                            sets:5,
                            reps:15
                        });
                    }
                    store.sync();
                }
            });
        });
    },
    config:{
        model:'CustomMovement',
        listeners:{
            load:function () {
                if (this.getCount() == 0) {
                    this.add(this.DEFAULT_CUSTOM_LIFTS);
                    this.sync();
                }
                this.addMissingCustomLiftAssociations();
            }
        }
    }
});

biglifts.stores.assistance.CustomMovement = Ext.create('CustomMovementStore');
biglifts.stores.push(biglifts.stores.assistance.CustomMovement);