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
        wendler.main.markFirstStartup();

        var app = Ext.getCmp('main-tab-panel');
        app.add(Ext.create('Wendler.views.LiftSchedule'));
        app.add(Ext.create('Wendler.views.Maxes'));
        app.add(Ext.create('Wendler.views.Log'));
        app.add(Ext.create('Wendler.views.OneRepMaxCalculator'));
        app.add(Ext.create('Wendler.views.More'));

        app.setActiveItem(wendler.stores.Meta.first().data.firstTimeInApp ? 1 : 0);
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