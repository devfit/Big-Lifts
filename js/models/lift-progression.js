Ext.ns('wendler.liftProgressions', 'wendler.stores.lifts', 'wendler.stores.recovery', 'wendler.defaults');
Ext.define('LiftProgression', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'week', type:'integer'},
            {name:'set', type:'integer'},
            {name:'reps', type:'integer'},
            {name:'percentage', type:'integer'},
            {name:'amrap', type:'boolean', defaultValue:null}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-percentages-proxy'
        }
    }
});

wendler.stores.lifts.findExpectedRepsForWeek = function (week) {
    var progressionIndex = wendler.stores.lifts.LiftProgression.findBy(function (r) {
        return r.get('set') === 6 && r.get('week') === week;
    });

    return wendler.stores.lifts.LiftProgression.getAt(progressionIndex).get('reps');
};

wendler.defaults.liftProgression = [
    Ext.create('LiftProgression', {week:1, set:1, reps:5, percentage:40, amrap:false}),
    Ext.create('LiftProgression', {week:1, set:2, reps:5, percentage:50, amrap:false}),
    Ext.create('LiftProgression', {week:1, set:3, reps:3, percentage:60, amrap:false}),
    Ext.create('LiftProgression', {week:1, set:4, reps:5, percentage:65, amrap:false}),
    Ext.create('LiftProgression', {week:1, set:5, reps:5, percentage:75, amrap:false}),
    Ext.create('LiftProgression', {week:1, set:6, reps:5, percentage:85, amrap:true}),
    Ext.create('LiftProgression', {week:2, set:1, reps:5, percentage:40, amrap:false}),
    Ext.create('LiftProgression', {week:2, set:2, reps:5, percentage:50, amrap:false}),
    Ext.create('LiftProgression', {week:2, set:3, reps:3, percentage:60, amrap:false}),
    Ext.create('LiftProgression', {week:2, set:4, reps:3, percentage:70, amrap:false}),
    Ext.create('LiftProgression', {week:2, set:5, reps:3, percentage:80, amrap:false}),
    Ext.create('LiftProgression', {week:2, set:6, reps:3, percentage:90, amrap:true}),
    Ext.create('LiftProgression', {week:3, set:1, reps:5, percentage:40, amrap:false}),
    Ext.create('LiftProgression', {week:3, set:2, reps:5, percentage:50, amrap:false}),
    Ext.create('LiftProgression', {week:3, set:3, reps:3, percentage:60, amrap:false}),
    Ext.create('LiftProgression', {week:3, set:4, reps:5, percentage:75, amrap:false}),
    Ext.create('LiftProgression', {week:3, set:5, reps:3, percentage:85, amrap:false}),
    Ext.create('LiftProgression', {week:3, set:6, reps:1, percentage:95, amrap:true}),
    Ext.create('LiftProgression', {week:4, set:1, reps:5, percentage:40, amrap:false}),
    Ext.create('LiftProgression', {week:4, set:2, reps:5, percentage:40, amrap:false}),
    Ext.create('LiftProgression', {week:4, set:3, reps:5, percentage:40, amrap:false}),
    Ext.create('LiftProgression', {week:4, set:4, reps:5, percentage:40, amrap:false}),
    Ext.create('LiftProgression', {week:4, set:5, reps:5, percentage:50, amrap:false}),
    Ext.create('LiftProgression', {week:4, set:6, reps:5, percentage:60, amrap:true})
];

wendler.stores.recovery.setupDefaultLiftProgressions = function (store) {
    util.withNoFilters(store, function () {
            if (store.getCount() === 0) {
                store.add(wendler.defaults.liftProgression);
                store.sync();
            }
        }
    );
};

wendler.liftProgressions.setupAmrapForSixthSet = function (store) {
    store.each(function (record) {
        if (record.get('amrap') === null) {
            record.set('amrap', record.get('set') === 6);
        }
    });
};

wendler.stores.lifts.LiftProgression = Ext.create('Ext.data.Store', {
    model:'LiftProgression',
    listeners:{
        load:function () {
            wendler.stores.recovery.setupDefaultLiftProgressions(this);
            wendler.liftProgressions.setupAmrapForSixthSet(this);
        }
    }
});
wendler.stores.push(wendler.stores.lifts.LiftProgression);