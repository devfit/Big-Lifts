"use strict";
Ext.ns('biglifts.stores');
Ext.define('biglifts.models.GlobalSettings', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'units', type: 'string'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'globalsettings'
        }
    }
});

Ext.define("biglifts.models.GlobalSettingsStore", {
    extend: "Ext.data.Store",
    getUnits: function () {
        return this.first().get('units');
    },
    setupDefaultSettings: function () {
        var DEFAULT_SETTINGS = {units: 'lbs'};
        if( this.getCount() === 0 ){
            this.add(DEFAULT_SETTINGS);
        }
        else {
            this.first().set(DEFAULT_SETTINGS) ;
        }
        this.sync();
    },
    config: {
        model: 'biglifts.models.GlobalSettings'
    }
});

biglifts.stores.GlobalSettings = Ext.create('biglifts.models.GlobalSettingsStore');
biglifts.stores.push(biglifts.stores.GlobalSettings);