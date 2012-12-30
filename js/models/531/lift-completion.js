"use strict";

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

Ext.define('LiftCompletionStore', {
    extend: "Ext.data.Store",
    addMissingLiftCompletions: function () {
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
    },
    removeDeadLiftCompletions: function () {
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
    },
    findLiftCompletionByPropertyAndWeek: function (liftPropertyName, week) {
        var completionIndex = this.findBy(function (r) {
            return r.get('liftPropertyName') === liftPropertyName && r.get('week') === week;
        });

        return this.getAt(completionIndex);
    },
    config: {
        model: 'LiftCompletion',
        storeId: 'liftCompletions',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.addMissingLiftCompletions();
                }

                biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(this.addMissingLiftCompletions, this));
                biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(this.removeDeadLiftCompletions, this));
            }
        }
    }
});

biglifts.stores.lifts.LiftCompletion = Ext.create('LiftCompletionStore');
biglifts.stores.push(biglifts.stores.lifts.LiftCompletion);