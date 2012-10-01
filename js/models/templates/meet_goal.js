"use strict";
Ext.ns('wendler.stores.lifts');

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
            id:'lift-proxy'
        }
    }
});

wendler.stores.lifts.syncMeetGoalsToLifts = function () {
    var allPropertyNames = [];
    wendler.stores.lifts.Lifts.each(function (lift) {
        var propertyName = lift.get('propertyName');
        allPropertyNames.push(propertyName);
        if (!wendler.stores.lifts.MeetGoals.findRecord('propertyName', propertyName)) {
            wendler.stores.lifts.MeetGoals.add({propertyName:propertyName, weight:lift.get('max')})
        }
    });

    wendler.stores.lifts.MeetGoals.filterBy(function (meetGoal) {
        return _.indexOf(allPropertyNames, meetGoal.get('propertyName')) === -1;
    });

    wendler.stores.lifts.MeetGoals.each(function (deadMeetGoal) {
        wendler.stores.lifts.MeetGoals.remove(deadMeetGoal);
    });
    wendler.stores.lifts.MeetGoals.sync();
    wendler.stores.lifts.MeetGoals.clearFilter();
};

wendler.stores.lifts.MeetGoals = Ext.create('Ext.data.Store', {
    model:'MeetGoal',
    listeners:{
        load:function () {
            wendler.stores.lifts.syncMeetGoalsToLifts();
        }
    },
    sorters:[
        {
            property:'propertyName',
            direction:'ASC'
        }
    ]
});
wendler.stores.lifts.Lifts.addListener('beforesync', function(){
    wendler.stores.lifts.syncMeetGoalsToLifts();
});

wendler.stores.push(wendler.stores.lifts.MeetGoals);
