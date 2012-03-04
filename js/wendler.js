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

    new Ext.Application({
        icon:'apple-touch-icon.png',
        glossOnIcon:false,

        viewport:null,
        launch:function () {
            this.viewport = new this.Viewport();
        },
        Viewport:Ext.extend(Ext.TabPanel, {
            id:'main-tab-panel',
            fullscreen:true,
            cardSwitchAnimation:appConfig.cardSwitchAnimation,
            sortable:false,
            tabBar:{
                id:'tab-navigation',
                dock:'bottom',
                layout:{ pack:'center' }
            },
            activeItem:startTab,
            items:[
                new wendler.views.LiftSchedule(),
                new wendler.views.Maxes(),
                new wendler.views.Log(),
                new wendler.views.OneRepMaxCalculator(),
                new wendler.views.More()
            ],
            listeners:{
                beforecardswitch:function () {
                    wendler.navigation.resetBack();
                }
            }
        })
    });
};

wendler.main.start();

