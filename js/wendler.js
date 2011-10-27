"use strict";
Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'apple-touch-icon.png',
    glossOnIcon: false,

    onReady: function() {
        new Ext.TabPanel({
            id: 'main-tab-panel',
            fullscreen: true,
            sortable: true,
            tabBar: {
                dock: 'bottom',
                layout: { pack: 'center' }
            },
            items: [
                new wendler.views.LiftSchedule(),
                new wendler.views.Maxes(),
                new wendler.views.OneRepMaxCalculator(),
                new wendler.views.Settings()
            ]
        });
    }
});