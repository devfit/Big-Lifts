"use strict";
Ext.ns('wendler','wendler.settings','wendler.settings.controller');
wendler.settings.controller.resetToDefaults = function() {
    wendler.stores.Settings.first().set(wendler.defaults.settings);
    wendler.stores.Settings.sync();
    Ext.getCmp('settings-form').load(Ext.ModelMgr.create(wendler.defaults.settings, 'Settings'));
};

wendler.settings.controller.setLiftPercentages = function(){
       Ext.getCmp('settings').setActiveItem(Ext.getCmp('edit-percentages-lift-schedule'));
};

wendler.settings.controller.reloadForm = function() {
    Ext.getCmp('settings-form').load(wendler.stores.Settings.first());
    Ext.getCmp('settings-form').hasBeenLoaded = true;
};
