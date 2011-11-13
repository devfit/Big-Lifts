"use strict";
Ext.ns('wendler');

var wendlerApp = new Ext.Application({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'apple-touch-icon.png',
    glossOnIcon: false,

    viewport:null,
    launched:false,
    launch: function() {
        if (!this.launched)
            return this.launched = true;
        this.viewport = new this.Viewport();
    },
    Viewport: Ext.extend(Ext.TabPanel, {
        id: 'main-tab-panel',
        fullscreen: true,
        cardSwitchAnimation: appConfig.cardSwitchAnimation,
        sortable: false,
        tabBar: {
            dock: 'bottom',
            layout: { pack: 'center' }
        },
        items: [
            new wendler.views.LiftSchedule(),
            new wendler.views.Maxes(),
            new wendler.views.OneRepMaxCalculator(),
            new wendler.views.Settings()
        ],
        listeners: {
            afterrender: function() {
                for( var i in wendler.appLoadCallbackFunctions ){
                    wendler.appLoadCallbackFunctions[i]();
                }
            }
        }
    })
});


