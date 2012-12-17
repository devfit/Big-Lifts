"use strict";
Ext.ns('biglifts.stores.lifts', 'biglifts.defaults');
Ext.ns('biglifts.stores.migrations');

biglifts.stores.lifts.findLiftCompletionByPropertyAndWeek = function (liftPropertyName, week) {
    var completionIndex = biglifts.stores.lifts.LiftCompletion.findBy(function (r) {
        return r.get('liftPropertyName') === liftPropertyName && r.get('week') === week;
    });
    return biglifts.stores.lifts.LiftCompletion.getAt(completionIndex);
};

biglifts.stores.migrations.liftCompletionMigration = function () {
    util.withNoFilters(biglifts.stores.lifts.LiftCompletion, function () {
        biglifts.stores.migrations.addMissingLiftCompletions();
        biglifts.stores.migrations.removeDeadLiftCompletions();
        biglifts.stores.lifts.LiftCompletion.sync();
    });
};

biglifts.stores.migrations.addMissingLiftCompletions = function () {
    util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
        for (var i = 0; i < biglifts.stores.lifts.Lifts.getCount(); i++) {
            var liftPropertyName = biglifts.stores.lifts.Lifts.getAt(i).get('propertyName');

            var existingLiftCompletion = biglifts.stores.lifts.LiftCompletion.findBy(function (r) {
                return r.get('liftPropertyName') === liftPropertyName;
            });

            if (existingLiftCompletion === -1) {
                for (var week = 1; week <= 4; week++) {
                    biglifts.stores.lifts.LiftCompletion.add(
                        {liftPropertyName: liftPropertyName, week: week, completed: false});
                }
            }
        }
    });
};

biglifts.stores.migrations.removeDeadLiftCompletions = function () {
    util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
        var liftNames = _.map(biglifts.stores.lifts.Lifts.getData().all, function (r) {
            return r.get('propertyName');
        });

        biglifts.stores.lifts.LiftCompletion.each(function (record) {
            if (_.indexOf(liftNames, record.get('liftPropertyName')) === -1) {
                biglifts.stores.lifts.LiftCompletion.remove(record);
            }
        });

        biglifts.stores.lifts.LiftCompletion.sync();
    });
};

Ext.define('LiftCompletion', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'liftPropertyName', type: 'string'},
            {name: 'week', type: 'integer'},
            {name: 'completed', type: 'boolean'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'lift-completion-proxy'
        }
    }
});
biglifts.stores.lifts.LiftCompletion = Ext.create('Ext.data.Store', {
    model: 'LiftCompletion',
    storeId: 'liftCompletions',
    listeners: {
        load: function () {
            biglifts.stores.migrations.liftCompletionMigration();
        }
    }
});
biglifts.stores.push(biglifts.stores.lifts.LiftCompletion);