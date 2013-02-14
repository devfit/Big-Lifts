"use strict";
Ext.ns("biglifts.main");

biglifts.main.started = false;
biglifts.main.start = function () {
    biglifts.main.started = true;
    biglifts.main.loadApplication();
};

biglifts.main.loadApplication = function () {
    if (biglifts.main.started && biglifts.main.deviceReady) {
        var firstTimeInApp = biglifts.stores.Routine.getCount() === 0;

        if (firstTimeInApp) {
            Ext.getCmp('app').setActiveItem(Ext.getCmp('routine-chooser'));
        }
        else {
            Ext.getCmp('routine-chooser').loadRoutine(biglifts.stores.Routine.first().get('name'), firstTimeInApp);
        }
    }
};

biglifts.main.tabPanelConfig = {
    xtype:'tabpanel',
    id:'main-tab-panel',
    fullscreen:true,
    sortable:false,
    tabBar:{
        id:'tab-navigation',
        docked:'bottom',
        layout:{ pack:'center', align:'center' }
    }
};

Ext.application({
    launch:function () {
        var app = Ext.create('Ext.Panel', {
            id:'app',
            fullscreen:true,
            layout:'card',
            items:[
                biglifts.main.tabPanelConfig
            ],
            listeners:{
                activeitemchange:function () {
                    Ext.getCmp('routine-chooser').hideLoadingIndicator();
                },
                initialize:function () {
                    biglifts.main.deviceReady = true;
                    biglifts.main.loadApplication();
                }
            }
        });
        app.add(Ext.create('biglifts.views.Setup', {id:'routine-chooser'}));

        util.fireApplicationReady();
    }
});