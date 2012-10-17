Ext.ns('biglifts.stores.assistance');
Ext.define('TriumvirateMovement', {
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

biglifts.stores.assistance.defaultTriumvirate = [
    {liftProperty:'squat', name:'Leg Press', sets:5, reps:15},
    {liftProperty:'squat', name:'Leg Curl', sets:5, reps:15},
    {liftProperty:'deadlift', name:'Good Morning', sets:5, reps:15},
    {liftProperty:'deadlift', name:'Hanging Leg Raise', sets:5, reps:15},
    {liftProperty:'press', name:'Dips', sets:5, reps:15},
    {liftProperty:'press', name:'Chin-Ups', sets:5, reps:15},
    {liftProperty:'bench', name:'Dumbbell Bench Press', sets:5, reps:15},
    {liftProperty:'bench', name:'Dumbbell Row', sets:5, reps:15}
];

biglifts.stores.migrations.triumvirateMovementsMigration = function (store) {
    util.withLoadedStore(biglifts.stores.lifts.Lifts, function(){

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
};

biglifts.stores.assistance.TriumvirateMovement = Ext.create('Ext.data.Store', {
    model:'TriumvirateMovement',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add(biglifts.stores.assistance.defaultTriumvirate);
                this.sync();
            }
            biglifts.stores.migrations.triumvirateMovementsMigration(this);
        }
    }
});

biglifts.stores.push(biglifts.stores.assistance.TriumvirateMovement);