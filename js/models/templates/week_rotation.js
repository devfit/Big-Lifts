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
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'liftProperty', type: 'string'},
            {name: 'startingWeek', type: 'integer'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'week-rotation-proxy'
        }
    }
});

Ext.define('WeekRotationStore', {
    extend: "Ext.data.Store",
    addMissingLifts: function () {
        var me = this;
        biglifts.stores.lifts.Lifts.each(function (r) {
            var propertyName = r.get('propertyName');
            if (me.find('liftProperty', propertyName) === -1) {
                me.add({liftProperty: propertyName, startingWeek: 1});
            }
        });
        me.sync();
    },
    removeMissingLifts: function () {
        var me = this;
        me.each(function (r) {
            var property = r.get('liftProperty');
            if (biglifts.stores.lifts.Lifts.find('propertyName', property) === -1) {
                me.remove(r);
            }
        });
        me.sync();
    },
    fixWeekRotationToLifts: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
            me.addMissingLifts();
            me.removeMissingLifts();
        });
    },
    config: {
        model: 'WeekRotation',
        listeners: {
            load: function () {
                biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(this.fixWeekRotationToLifts, this));
            }
        }
    }
});

biglifts.stores.WeekRotation = Ext.create('WeekRotationStore');
biglifts.stores.push(biglifts.stores.WeekRotation);
