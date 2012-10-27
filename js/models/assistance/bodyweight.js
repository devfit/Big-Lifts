Ext.ns('biglifts.stores.assistance');
Ext.define('BodyweightMovement', {
    extend:'CustomMovement',
    config:{
        proxy:{
            type:'localstorage',
            id:'bodyweight-movement-proxy'
        }
    }
});

Ext.define("BodyweightMovementStore", {
    extend:"Ext.data.Store",
    DEFAULT_BODYWEIGHT_LIFTS:[
        {liftProperty:'squat', name:'One leg squat', sets:5, reps:15},
        {liftProperty:'squat', name:'Sit-ups', sets:5, reps:15},
        {liftProperty:'deadlift', name:'GHR', sets:5, reps:15},
        {liftProperty:'deadlift', name:'Leg Raises', sets:5, reps:15},
        {liftProperty:'press', name:'Chins', sets:5, reps:15},
        {liftProperty:'press', name:'Dips', sets:5, reps:15},
        {liftProperty:'bench', name:'Chins', sets:5, reps:15},
        {liftProperty:'bench', name:'Pushups', sets:5, reps:15}
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
        model:'BodyweightMovement',
        listeners:{
            load:function () {
                if (this.getCount() == 0) {
                    this.add(this.DEFAULT_BODYWEIGHT_LIFTS);
                    this.sync();
                }
                this.addMissingCustomLiftAssociations();
            }
        }
    }
});

biglifts.stores.assistance.BodyweightMovement = Ext.create('BodyweightMovementStore');
biglifts.stores.push(biglifts.stores.assistance.BodyweightMovement);