"use strict";
Ext.ns('wendler.stores.lifts', 'wendler.defaults');
Ext.ns('wendler.stores.migrations');

wendler.stores.lifts.findLiftCompletionByPropertyAndWeek = function (liftPropertyName, week) {
    var completionIndex = wendler.stores.lifts.LiftCompletion.findBy(function (r) {
        return r.get('liftPropertyName') === liftPropertyName && r.get('week') === week;
    });
    return wendler.stores.lifts.LiftCompletion.getAt(completionIndex);
};

wendler.stores.migrations.liftCompletionMigration = function () {
    util.withNoFilters(wendler.stores.lifts.LiftCompletion, function () {
        wendler.stores.migrations.addMissingLiftCompletions();
        wendler.stores.migrations.removeDeadLiftCompletions();
        wendler.stores.lifts.LiftCompletion.sync();
    });
};

wendler.stores.migrations.addMissingLiftCompletions = function () {
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
};

wendler.stores.migrations.removeDeadLiftCompletions = function () {
    var liftNames = _.map(wendler.stores.lifts.Lifts.getData().all, function (r) {
        return r.get('propertyName');
    });

    wendler.stores.lifts.LiftCompletion.each(function (record) {
        if (_.indexOf(liftNames, record.get('liftPropertyName')) === -1) {
            wendler.stores.lifts.LiftCompletion.remove(record);
        }
    });

    wendler.stores.lifts.LiftCompletion.sync();
};

Ext.define('LiftCompletion', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'liftPropertyName', type:'string'},
            {name:'week', type:'integer'},
            {name:'completed', type:'boolean'}
        ],
        proxy:{
            type:'localstorage',
            id:'lift-completion-proxy'
        }
    }
});
wendler.stores.lifts.LiftCompletion = Ext.create('Ext.data.Store', {
    model:'LiftCompletion',
    listeners:{
        load:function () {
            wendler.stores.migrations.liftCompletionMigration();
        }
    }
});
wendler.stores.push(wendler.stores.lifts.LiftCompletion);