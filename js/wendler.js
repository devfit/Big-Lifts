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

wendler.main.start = function () {
    if (!wendler.loading.loaded) {
        console.log("Start called, not yet loaded");
        return;
    }

    var startTab = wendler.stores.Meta.first().data.firstTimeInApp ? 1 : 0;
    wendler.main.markFirstStartup();
    wendler.main.deviceReady = true;

    console.log("Attempting launch");
    Ext.application({
        launch:function () {
            console.log("Launch fired");
            Ext.create('Ext.tab.Panel', {
                    id:'main-tab-panel',
                    fullscreen:true,
                    sortable:false,
                    tabBar:{
                        id:'tab-navigation',
                        docked:'bottom',
                        layout:{ pack:'center', align:'center' }
                    },
                    activeItem:startTab,
                    items:[
                        Ext.create('Wendler.views.LiftSchedule'),
                        Ext.create('Wendler.views.Maxes'),
                        Ext.create('Wendler.views.Log'),
                        Ext.create('Wendler.views.OneRepMaxCalculator'),
                        Ext.create('Wendler.views.More')
                    ],
                    listeners:{
                        activeitemchange:function () {
                            wendler.navigation.resetBack();
                        }
                    }
                }
            );
        }
    });
};

wendler.main.start();