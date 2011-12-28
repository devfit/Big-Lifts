"use strict";
Ext.ns('wendler.stores.lifts', 'wendler.defaults');
Ext.ns('wendler.stores.migrations', 'wendler.models.Lift');

wendler.models.Lift.uniquePropertyNameValidation = function (propertyName) {
    var liftIsUnique = wendler.stores.lifts.Lifts.find('propertyName', propertyName, 0,
        false, true, true) == -1;

    return liftIsUnique;
};

Ext.regModel('Lift', {
    fields:[
        {name:'id', type:'integer'},
        {name:'name', type:'string'},
        {name:'propertyName', type:'string'},
        {name:'max', type:'integer'},
        {name:'cycleIncrease', type:'integer'}
    ],
    validations:[
        {field:'propertyName', type:'custom', message:'nonunique',
            fn:wendler.models.Lift.uniquePropertyNameValidation},
        {field:'propertyName', type:'presence'},
        {field:'max', type:'format', matcher:/^\d\d*$/, message:'Must enter a max'},
        {field:'max', type:'presence'},
        {field:'cycleIncrease', type:'presence'}
    ],
    proxy:{
        type:'localstorage',
        id:'lift-proxy'
    }
});


wendler.defaults.lifts = [
    Ext.ModelMgr.create({name:'Squat', max:200, propertyName:'squat', cycleIncrease:10}, 'Lift'),
    Ext.ModelMgr.create({name:'Deadlift', max:300, propertyName:'deadlift', cycleIncrease:10}, 'Lift'),
    Ext.ModelMgr.create({name:'Press', max:150, propertyName:'press', cycleIncrease:5}, 'Lift'),
    Ext.ModelMgr.create({name:'Bench', max:175, propertyName:'bench', cycleIncrease:5}, 'Lift')
];

wendler.stores.migrations.liftModelMigration = function () {
    wendler.stores.lifts.Lifts.each(function (r) {
        if (!r.data.propertyName) {
            var propertyName = wendler.models.Lift.sanitizePropertyName(r.data.name);
            r.set('propertyName', propertyName);
            r.save();
        }

        if (r.data.cycleIncrease === 0) {
            var defaultModel = _.find(wendler.defaults.lifts, function (d) {
                return d.data.propertyName === r.data.propertyName
            });
            var cycleIncrease = defaultModel.data.cycleIncrease;
            r.set('cycleIncrease', cycleIncrease);
            r.save();
        }
    });
};

wendler.models.Lift.sanitizePropertyName = function (propertyName) {
    return propertyName.toLowerCase().replace(/[^a-z]/g, '');
};

wendler.stores.lifts.Lifts = new Ext.data.Store({
    model:'Lift',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add(wendler.defaults.lifts);
                this.sync();
            }
            wendler.stores.migrations.liftModelMigration();
        }
    },
    autoLoad:true,
    autoSave:true
});

Ext.regModel('LiftProgression', {
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
});

wendler.defaults.liftProgression = [
    Ext.ModelMgr.create({week:1, set:1, reps:5, percentage:40}, 'LiftProgression'),
    Ext.ModelMgr.create({week:1, set:2, reps:5, percentage:50}, 'LiftProgression'),
    Ext.ModelMgr.create({week:1, set:3, reps:3, percentage:60}, 'LiftProgression'),
    Ext.ModelMgr.create({week:1, set:4, reps:5, percentage:65}, 'LiftProgression'),
    Ext.ModelMgr.create({week:1, set:5, reps:5, percentage:75}, 'LiftProgression'),
    Ext.ModelMgr.create({week:1, set:6, reps:5, percentage:85}, 'LiftProgression'),
    Ext.ModelMgr.create({week:2, set:1, reps:5, percentage:40}, 'LiftProgression'),
    Ext.ModelMgr.create({week:2, set:2, reps:5, percentage:50}, 'LiftProgression'),
    Ext.ModelMgr.create({week:2, set:3, reps:3, percentage:60}, 'LiftProgression'),
    Ext.ModelMgr.create({week:2, set:4, reps:3, percentage:70}, 'LiftProgression'),
    Ext.ModelMgr.create({week:2, set:5, reps:3, percentage:80}, 'LiftProgression'),
    Ext.ModelMgr.create({week:2, set:6, reps:3, percentage:90}, 'LiftProgression'),
    Ext.ModelMgr.create({week:3, set:1, reps:5, percentage:40}, 'LiftProgression'),
    Ext.ModelMgr.create({week:3, set:2, reps:5, percentage:50}, 'LiftProgression'),
    Ext.ModelMgr.create({week:3, set:3, reps:3, percentage:60}, 'LiftProgression'),
    Ext.ModelMgr.create({week:3, set:4, reps:5, percentage:75}, 'LiftProgression'),
    Ext.ModelMgr.create({week:3, set:5, reps:3, percentage:85}, 'LiftProgression'),
    Ext.ModelMgr.create({week:3, set:6, reps:1, percentage:95}, 'LiftProgression'),
    Ext.ModelMgr.create({week:4, set:1, reps:5, percentage:40}, 'LiftProgression'),
    Ext.ModelMgr.create({week:4, set:2, reps:5, percentage:50}, 'LiftProgression'),
    Ext.ModelMgr.create({week:4, set:3, reps:3, percentage:60}, 'LiftProgression'),
    Ext.ModelMgr.create({week:4, set:4, reps:5, percentage:60}, 'LiftProgression'),
    Ext.ModelMgr.create({week:4, set:5, reps:5, percentage:65}, 'LiftProgression'),
    Ext.ModelMgr.create({week:4, set:6, reps:5, percentage:70}, 'LiftProgression')
];
wendler.stores.lifts.LiftProgression = new Ext.data.Store({
    model:'LiftProgression',
    listeners:{
        load:function () {
            if (this.getCount() == 0) {
                this.add(wendler.defaults.liftProgression);
                this.sync();
            }
        }
    },
    autoLoad:true,
    autoSave:true
});

Ext.regModel('LiftCompletion', {
    fields:[
        {name:'id', type:'integer'},
        {name:'liftPropertyName', type:'string'},
        {name:'week', type:'integer'},
        {name:'completed', type:'boolean'}
    ],
    proxy:{
        type:'localstorage',
        id:'lift-completion-proxy'
    }
});
wendler.stores.lifts.LiftCompletion = new Ext.data.Store({
    model:'LiftCompletion',
    listeners:{
        load:function () {
            wendler.stores.migrations.liftCompletionMigration();
        }
    },
    autoLoad:true,
    autoSave:true
});
wendler.stores.lifts.findLiftCompletionByPropertyAndWeek = function (liftPropertyName, week) {
    var completionIndex = wendler.stores.lifts.LiftCompletion.findBy(function (r) {
        return r.get('liftPropertyName') === liftPropertyName && r.get('week') === week;
    });
    return wendler.stores.lifts.LiftCompletion.getAt(completionIndex);
};

wendler.stores.migrations.liftCompletionMigration = function () {
    for (var i = 0; i < wendler.stores.lifts.Lifts.getCount(); i++) {
        var liftPropertyName = wendler.stores.lifts.Lifts.getAt(i).get('propertyName');

        var existingLiftCompletion = wendler.stores.lifts.LiftCompletion.findBy(function (r) {
            return r.get('liftPropertyName') === liftPropertyName;
        });

        if (existingLiftCompletion === -1) {
            for (var week = 1; week <= 4; week++) {
                wendler.stores.lifts.LiftCompletion.add(
                    {liftPropertyName:liftPropertyName, week:week, completed:false});
            }
        }
    }
    wendler.stores.lifts.LiftCompletion.sync();
};


