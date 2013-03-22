"use strict";
Ext.ns("biglifts.main");

biglifts.main.started = false;
biglifts.main.start = function () {
    biglifts.main.started = true;
    biglifts.main.loadApplication();
};

biglifts.main.loadRoutine = function (firstTimeInApp) {
    Ext.getCmp('routine-chooser').loadRoutine(biglifts.stores.Routine.first().get('name'), firstTimeInApp);
};

biglifts.main.loadApplication = function () {
    if (biglifts.main.started && biglifts.main.deviceReady) {
        var firstTimeInApp = biglifts.stores.Routine.getCount() === 0;

        if (firstTimeInApp) {
            Ext.getCmp('app').setActiveItem(Ext.getCmp('setup'));
        }
        else {
            biglifts.main.loadRoutine(firstTimeInApp);
        }
    }
};

biglifts.main.tabPanelConfig = {
    xtype: 'tabpanel',
    id: 'main-tab-panel',
    fullscreen: true,
    sortable: false,
    tabBar: {
        id: 'tab-navigation',
        docked: 'bottom',
        layout: { pack: 'center', align: 'center' }
    }
};

Ext.application({
    launch: function () {
        Ext.create('Ext.Panel', {
            id: 'app',
            fullscreen: true,
            layout: 'card',
            listeners: {
                activeitemchange: function () {
                    if (this.setupScreen) {
                        this.setupScreen.hideLoadingIndicator();
                    }
                },
                initialize: function () {
                    this.add(biglifts.main.tabPanelConfig);
                    this.setupScreen = this.add(Ext.create('biglifts.views.Setup'));

                    biglifts.main.deviceReady = true;
                    biglifts.main.loadApplication();
                }
            }
        });

        Ext.Viewport.addListener('orientationchange', biglifts.ads.orientationChange);
        util.fireApplicationReady();
    }
});