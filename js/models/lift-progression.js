Ext.ns('wendler.liftProgressions', 'wendler.stores.lifts', 'wendler.stores.recovery', 'wendler.defaults');
Ext.define('LiftProgression', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'id', type:'integer'},
            {name:'week', type:'integer'},
            {name:'set', type:'integer'},
            {name:'reps', type:'integer'},
            {name:'percentage', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-percentages-proxy'
        }
    }
});

wendler.liftProgressions.options = [];
wendler.liftProgressions.options.push([
    Ext.create('LiftProgression', {week:1, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:1, set:2, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:1, set:3, reps:3, percentage:60}),
    Ext.create('LiftProgression', {week:1, set:4, reps:5, percentage:65}),
    Ext.create('LiftProgression', {week:1, set:5, reps:5, percentage:75}),
    Ext.create('LiftProgression', {week:1, set:6, reps:5, percentage:85}),
    Ext.create('LiftProgression', {week:2, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:2, set:2, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:2, set:3, reps:3, percentage:60}),
    Ext.create('LiftProgression', {week:2, set:4, reps:3, percentage:70}),
    Ext.create('LiftProgression', {week:2, set:5, reps:3, percentage:80}),
    Ext.create('LiftProgression', {week:2, set:6, reps:3, percentage:90}),
    Ext.create('LiftProgression', {week:3, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:3, set:2, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:3, set:3, reps:3, percentage:60}),
    Ext.create('LiftProgression', {week:3, set:4, reps:5, percentage:75}),
    Ext.create('LiftProgression', {week:3, set:5, reps:3, percentage:85}),
    Ext.create('LiftProgression', {week:3, set:6, reps:1, percentage:95}),
    Ext.create('LiftProgression', {week:4, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:2, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:3, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:4, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:5, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:4, set:6, reps:5, percentage:60})
]);

wendler.liftProgressions.options.push([
    Ext.create('LiftProgression', {week:1, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:1, set:2, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:1, set:3, reps:3, percentage:60}),
    Ext.create('LiftProgression', {week:1, set:4, reps:5, percentage:75}),
    Ext.create('LiftProgression', {week:1, set:5, reps:5, percentage:80}),
    Ext.create('LiftProgression', {week:1, set:6, reps:5, percentage:85}),
    Ext.create('LiftProgression', {week:2, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:2, set:2, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:2, set:3, reps:3, percentage:60}),
    Ext.create('LiftProgression', {week:2, set:4, reps:3, percentage:80}),
    Ext.create('LiftProgression', {week:2, set:5, reps:3, percentage:85}),
    Ext.create('LiftProgression', {week:2, set:6, reps:3, percentage:90}),
    Ext.create('LiftProgression', {week:3, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:3, set:2, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:3, set:3, reps:3, percentage:60}),
    Ext.create('LiftProgression', {week:3, set:4, reps:5, percentage:75}),
    Ext.create('LiftProgression', {week:3, set:5, reps:3, percentage:85}),
    Ext.create('LiftProgression', {week:3, set:6, reps:1, percentage:95}),
    Ext.create('LiftProgression', {week:4, set:1, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:2, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:3, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:4, reps:5, percentage:40}),
    Ext.create('LiftProgression', {week:4, set:5, reps:5, percentage:50}),
    Ext.create('LiftProgression', {week:4, set:6, reps:5, percentage:60})
]);

wendler.defaults.liftProgression = wendler.liftProgressions.options[0];

wendler.stores.recovery.setupDefaultLiftProgressions = function () {
    util.withNoFilters(wendler.stores.lifts.LiftProgression, function () {
            if (wendler.stores.lifts.LiftProgression.getCount() !== wendler.defaults.liftProgression.length) {
                wendler.stores.lifts.LiftProgression.each(function (m) {
                    wendler.stores.lifts.LiftProgression.remove(m);
                });
                wendler.stores.lifts.LiftProgression.sync();

                wendler.stores.lifts.LiftProgression.add(wendler.defaults.liftProgression);
                wendler.stores.lifts.LiftProgression.sync();
            }
        }
    );
};

wendler.stores.lifts.LiftProgression = Ext.create('Ext.data.Store', {
    model:'LiftProgression',
    listeners:{
        load:wendler.stores.recovery.setupDefaultLiftProgressions
    }
});
wendler.stores.lifts.LiftProgression.load();
util.filebackup.watchStoreSync(wendler.stores.lifts.LiftProgression);