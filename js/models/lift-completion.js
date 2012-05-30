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
    });
};


Ext.define('LiftCompletion', {
    extend:'Ext.data.Model',
    config:{
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
    }
});
wendler.stores.lifts.LiftCompletion = Ext.create('Ext.data.Store', {
    model:'LiftCompletion',
    listeners:{
        load:function () {
            wendler.stores.migrations.liftCompletionMigration();
            util.filebackup.watchStoreSync(wendler.stores.lifts.LiftCompletion);
        }
    }
});
wendler.stores.lifts.LiftCompletion.load();