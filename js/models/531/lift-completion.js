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
    findLiftCompletionByPropertyAndWeek: function (liftPropertyName, week) {
        var completionIndex = biglifts.stores.lifts.LiftCompletion.findBy(function (r) {
            return r.get('liftPropertyName') === liftPropertyName && r.get('week') === week;
        });
        return biglifts.stores.lifts.LiftCompletion.getAt(completionIndex);
    },
    config: {
        model: 'LiftCompletion',
        storeId: 'liftCompletions'
    }
});

biglifts.stores.lifts.LiftCompletion = Ext.create('LiftCompletionStore');
biglifts.stores.push(biglifts.stores.lifts.LiftCompletion);