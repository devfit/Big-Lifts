"use strict";
Ext.ns('biglifts.stores');
Ext.define('biglifts.models.GlobalSettings', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'units', type: 'string'},
            {name: 'dateFormat', type: 'string'},
            {name: 'roundingValue', type: 'string'},
            {name: 'roundingType', type: 'string'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'globalsettings'
        }
    }
});

Ext.define("biglifts.models.GlobalSettingsStore", {
    extend: "biglifts.stores.AbstractSettingsStore",
    getUnits: function () {
        if (this.first()) {
            return this.first().get('units');
        }

        return "lbs";
    },
    getExtDateFormat: function () {
        return this.getDateFormat().toLowerCase().replace('dd', 'd').replace('mm', 'm').replace('yyyy', 'Y');
    },
    getDateFormat: function () {
        return this.first().get('dateFormat');
    },
    getSystemDateFormat: function (callback) {
        if (biglifts.DEBUG) {
            callback('MM/dd/yyyy');
        }
        else if (window.DateFormatFinder) {
            callback(DateFormatFinder.getDateFormat());
        }
        else {
            cordova.exec(callback, function () {
                callback('MM/dd/yyyy');
            }, "DateFormatFinder", "getDateFormat", []);
        }
    },
    setupDefaultSettings: function () {
        var me = this;
        var DEFAULT_SETTINGS = {
            units: 'lbs',
            'roundingValue': '5',
            'roundingType': 'normal'
        };

        if (me.getCount() === 0) {
            me.add(DEFAULT_SETTINGS);
        }
        else {
            me.first().set(DEFAULT_SETTINGS);
        }
        me.sync();
    },
    watchForUnitChange: function (store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues) {
        if (_.indexOf(modifiedFieldNames, 'units') !== -1) {
            if (record.get('units') === 'kg') {
                var settings = store.first();
                if (settings.get('roundingValue') === "5") {
                    Ext.Function.defer(function () {
                        settings.set('roundingValue', "2.5");
                        settings.save();
                        store.sync();
                        store.fireEvent('beforesync');
                        biglifts.stores.lifts.Lifts.adjustCycleIncreaseForKg();
                    }, 100);
                }
            }
        }
    },
    config: {
        model: 'biglifts.models.GlobalSettings',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.setupDefaultSettings();
                }

                this.addListener('updaterecord', this.watchForUnitChange, this);

                var me = this;
                util.whenApplicationReady(function () {
                    me.getSystemDateFormat(function (format) {
                        me.first().set('dateFormat', format);
                        me.sync();
                    });
                });
            }
        }
    }
});

biglifts.stores.GlobalSettings = Ext.create('biglifts.models.GlobalSettingsStore');
biglifts.stores.push(biglifts.stores.GlobalSettings);