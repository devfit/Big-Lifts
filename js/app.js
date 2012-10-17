"use strict";
Ext.ns("biglifts.main");

biglifts.main.markFirstStartup = function () {
    var meta = biglifts.stores.Meta.first();
    if (meta.data.firstTimeInApp) {
        meta.set('firstTimeInApp', false);
        meta.save();
        biglifts.stores.Meta.sync();
    }
};

biglifts.main.started = false;
biglifts.main.start = function () {
    biglifts.main.started = true;
    biglifts.main.loadApplication();
};

biglifts.main.loadApplication = function () {
    if (biglifts.main.started && biglifts.main.deviceReady) {
        var app = Ext.getCmp('main-tab-panel');
        app.setHidden(true);
        app.add(Ext.create('biglifts.views.LiftSchedule'));
        app.add(Ext.create('biglifts.views.Maxes'));
        app.add(Ext.create('biglifts.views.Log'));
        app.add(Ext.create('biglifts.views.OneRepMaxCalculator'));
        app.add(Ext.create('biglifts.views.More'));

        var startTab = biglifts.stores.Meta.first().data.firstTimeInApp ? 1 : 0;
        biglifts.main.markFirstStartup();
        app.setActiveItem(startTab);
        app.setHidden(false);
    }
};

Ext.application({
    launch:function () {
        Ext.create('Ext.tab.Panel', {
                id:'main-tab-panel',
                fullscreen:true,
                sortable:false,
                tabBar:{
                    id:'tab-navigation',
                    docked:'bottom',
                    layout:{ pack:'center', align:'center' }
                },
                items:[
                ]
            }
        );
        biglifts.main.deviceReady = true;
        biglifts.main.loadApplication();
    }
});