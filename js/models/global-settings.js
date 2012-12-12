"use strict";
Ext.ns('biglifts.stores');
Ext.define('biglifts.models.GlobalSettings', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'units', type: 'string'},
            {name: 'dateFormat', type: 'string'}
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
        return this.first().get('units');
    },
    getExtDateFormat: function () {
        return this.getDateFormat().toLowerCase().replace('dd', 'd').replace('mm', 'm').replace('yyyy', 'Y');
    },
    getDateFormat: function () {
        return this.first().get('dateFormat');
    },
    getSystemDateFormat: function (callback) {
        if (window.DateFormatFinder) {
            callback(DateFormatFinder.getDateFormat());
        }

        callback('MM/dd/yyyy');
    },
    setupDefaultSettings: function () {
        var me = this;
        var DEFAULT_SETTINGS = {
            units: 'lbs'
        };

        if (me.getCount() === 0) {
            me.add(DEFAULT_SETTINGS);
        }
        else {
            me.first().set(DEFAULT_SETTINGS);
        }
        me.sync();

        util.whenApplicationReady(function () {
            me.getSystemDateFormat(function (format) {
                if (!biglifts.DEBUG) {
                    alert(format);
                }
                me.first().set('dateFormat', format);
                me.sync();
            });
        });
    },
    config: {
        model: 'biglifts.models.GlobalSettings',
        listeners: {
            load: function () {
                if (this.getCount() === 0) {
                    this.setupDefaultSettings();
                }
            }
        }
    }
});

biglifts.stores.GlobalSettings = Ext.create('biglifts.models.GlobalSettingsStore');
biglifts.stores.push(biglifts.stores.GlobalSettings);