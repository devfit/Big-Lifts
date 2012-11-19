"use strict";
Ext.ns('biglifts.stores.lifts');

Ext.define('MeetGoal', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'propertyName', type:'string'},
            {name:'weight', type:'float'}
        ],
        proxy:{
            type:'localstorage',
            id:'meet-goal-proxy'
        }
    }
});

biglifts.stores.lifts.syncMeetGoalsToLifts = function () {
    var allPropertyNames = [];
    biglifts.stores.lifts.Lifts.each(function (lift) {
        var propertyName = lift.get('propertyName');
        allPropertyNames.push(propertyName);
        if (!biglifts.stores.lifts.MeetGoals.findRecord('propertyName', propertyName)) {
            biglifts.stores.lifts.MeetGoals.add({propertyName:propertyName, weight:lift.get('max')})
        }
    });

    biglifts.stores.lifts.MeetGoals.filterBy(function (meetGoal) {
        return _.indexOf(allPropertyNames, meetGoal.get('propertyName')) === -1;
    });

    biglifts.stores.lifts.MeetGoals.each(function (deadMeetGoal) {
        biglifts.stores.lifts.MeetGoals.remove(deadMeetGoal);
    });
    biglifts.stores.lifts.MeetGoals.sync();
    biglifts.stores.lifts.MeetGoals.clearFilter();
};

biglifts.stores.lifts.MeetGoals = Ext.create('Ext.data.Store', {
    model:'MeetGoal',
    listeners:{
        load:function () {
            biglifts.stores.lifts.syncMeetGoalsToLifts();
            biglifts.stores.lifts.Lifts.addListener('beforesync', function () {
                biglifts.stores.lifts.syncMeetGoalsToLifts();
            });
        }
    },
    sorters:[
        {
            property:'propertyName',
            direction:'ASC'
        }
    ]
});

biglifts.stores.push(biglifts.stores.lifts.MeetGoals);
