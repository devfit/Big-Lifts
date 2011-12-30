"use strict";
new Ext.Application({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'apple-touch-icon.png',
    glossOnIcon: false,

    viewport:null,
    launch: function() {
        this.viewport = new this.Viewport();
    },
    Viewport: Ext.extend(Ext.TabPanel, {
        id: 'main-tab-panel',
        fullscreen: true,
        cardSwitchAnimation: appConfig.cardSwitchAnimation,
        sortable: false,
        tabBar: {
            id: 'tab-navigation',
            dock: 'bottom',
            layout: { pack: 'center' }
        },
        items: [
            new wendler.views.LiftSchedule(),
            new wendler.views.Maxes(),
            new wendler.views.OneRepMaxCalculator(),
            new wendler.views.Settings(),
            new wendler.views.More()
        ],
        listeners: {
            afterrender: function() {
                for (var i in wendler.events.appLoadCallbackFunctions) {
                    wendler.events.appLoadCallbackFunctions[i]();
                }
            }
        }
    })
});


