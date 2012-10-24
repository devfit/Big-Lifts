"use strict";
Ext.ns('biglifts.stores.lifts');

/**
 * This model is used by the "Rotation" template to allow a lifter to stagger lifts like this:
 * Week 1:
 * Squat 5/5/5
 * Deadlift 3/3/3
 * Press 5/3/1
 * Bench deload
 *
 * Week 2:
 * Squat 3/3/3
 * Deadlift 5/3/1
 * Press deload
 * Bench 5/5/5
 *
 * etc.
 */
Ext.define('WeekRotation', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'liftProperty', type:'string'},
            {name:'startingWeek', type: 'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'week-rotation-proxy'
        }
    }
});

biglifts.stores.WeekRotation = Ext.create('Ext.data.Store', {
    model:'WeekRotation'
});

biglifts.stores.push(biglifts.stores.WeekRotation);
