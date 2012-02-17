"use strict";
Ext.ns("wendler.main");
wendler.main.determineStartTab = function () {
    var meta = wendler.stores.Meta.first();
    var startTab = 0;
    if (meta.data.firstTimeInApp) {
        startTab = 1;
        meta.set('firstTimeInApp', false);
        meta.save();
    }

    return startTab;
};

wendler.main.start = function () {
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
            activeItem:wendler.main.determineStartTab(),
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

if (typeof(PhoneGap) === 'undefined') {
    wendler.main.start();
}
else if (wendler.main.deviceReady && !wendler.main.started) {
    wendler.main.started = true;
    wendler.main.start();
}

