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
    if (!wendler.loading.loaded || wendler.main.started) {
        return;
    }

    wendler.main.started = true;

    var startTab = wendler.stores.Meta.first().data.firstTimeInApp ? 1 : 0;
    wendler.main.markFirstStartup();
    wendler.main.deviceReady = true;

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
                    activeItem:startTab,
                    items:[
                        Ext.create('Wendler.views.LiftSchedule'),
                        Ext.create('Wendler.views.Maxes'),
                        Ext.create('Wendler.views.Log'),
                        Ext.create('Wendler.views.OneRepMaxCalculator'),
                        Ext.create('Wendler.views.More')
                    ]
                }
            );
        }
    });
};

wendler.main.start();