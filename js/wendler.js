"use strict";
Ext.ns("wendler.main");

wendler.main.markFirstStartup = function () {
    var meta = wendler.stores.Meta.first();
    if (meta.data.firstTimeInApp) {
        meta.set('firstTimeInApp', false);
        meta.save();
    }
};

wendler.main.start = function () {
    var startTab = wendler.stores.Meta.first().data.firstTimeInApp ? 1 : 0;
    wendler.main.markFirstStartup();
    util.filebackup.loadAllStores();

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
//                    activeItem:startTab,
                    activeItem:0,
                    items:[
//                new wendler.views.LiftSchedule(),
//                new wendler.views.Maxes(),
                        Ext.create('Wendler.views.OneRepMaxCalculator'),
                        Ext.create('Wendler.views.More'),
                        Ext.create('Wendler.views.Log')
                    ],
                    listeners:{
//                        beforecardswitch:function () {
//                            wendler.navigation.resetBack();
//                        }
                    }
                }
            );
        }
    });
};

if (wendler.main.deviceReady && !wendler.main.started) {
    wendler.main.started = true;
    wendler.main.start();
}
