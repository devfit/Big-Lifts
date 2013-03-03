"use strict";
Ext.ns('biglifts.stores.lifts');

Ext.define('MeetGoal', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'propertyName', type: 'string'},
            {name: 'weight', type: 'float'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'meet-goal-proxy'
        }
    }
});

Ext.define('biglifts.stores.MeetGoals', {
    extend: 'Ext.data.Store',
    addMissingMeetGoals: function () {
        var me = this;
        biglifts.stores.lifts.Lifts.each(function (lift) {
            var propertyName = lift.get('propertyName');
            if (!me.findRecord('propertyName', propertyName)) {
                me.add({propertyName: propertyName, weight: lift.get('max')})
            }
        });
    },
    removeDeadMeetGoals: function () {
        var me = this;
        this.filterBy(function (meetGoal) {
            return biglifts.stores.lifts.Lifts.findRecord('propertyName', meetGoal.get('propertyName')) == null;
        });

        this.each(function (deadMeetGoal) {
            me.remove(deadMeetGoal);
        });
        me.clearFilter();
    },
    syncMeetGoalsToLifts: function () {
        this.addMissingMeetGoals();
        this.removeDeadMeetGoals();
        this.sync();
    },
    config: {
        model: 'MeetGoal',
        listeners: {
            load: function () {
                this.syncMeetGoalsToLifts();
                biglifts.stores.lifts.Lifts.addListener('beforesync', this.syncMeetGoalsToLifts, this);
            }
        },
        sorters: [
            {
                property: 'propertyName',
                direction: 'ASC'
            }
        ]
    }
});

biglifts.stores.lifts.MeetGoals = Ext.create('biglifts.stores.MeetGoals');
biglifts.stores.push(biglifts.stores.lifts.MeetGoals);
