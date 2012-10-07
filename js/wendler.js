"use strict";
Ext.ns("wendler.main");

wendler.main.markFirstStartup = function () {
    var meta = wendler.stores.Meta.first();
    if (meta.data.firstTimeInApp) {
        meta.set('firstTimeInApp', false);
        meta.save();
        wendler.stores.Meta.sync();
    }
};

wendler.main.started = false;
wendler.main.start = function () {
    wendler.main.started = true;
    wendler.main.loadApplication();
};

wendler.main.loadApplication = function () {
    if (wendler.main.started && wendler.main.deviceReady) {
        var app = Ext.getCmp('main-tab-panel');
        app.setHidden(true);
        app.add(Ext.create('Wendler.views.LiftSchedule'));
        app.add(Ext.create('Wendler.views.Maxes'));
        app.add(Ext.create('Wendler.views.Log'));
        app.add(Ext.create('Wendler.views.OneRepMaxCalculator'));
        app.add(Ext.create('Wendler.views.More'));

//        var startTab = wendler.stores.Meta.first().data.firstTimeInApp ? 1 : 0;
        var startTab = 2;
        wendler.main.markFirstStartup();
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
        wendler.main.deviceReady = true;
        wendler.main.loadApplication();
    }
});