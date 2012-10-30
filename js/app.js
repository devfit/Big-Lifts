"use strict";
Ext.ns("biglifts.main");

biglifts.main.started = false;
biglifts.main.start = function () {
    biglifts.main.started = true;
    biglifts.main.loadApplication();
};

biglifts.main.loadApplication = function () {
    if (biglifts.main.started && biglifts.main.deviceReady) {
        var firstTimeInApp = biglifts.stores.Routine.getCount() === 0;

        Ext.getCmp('app').setActiveItem(firstTimeInApp ? Ext.getCmp('first-time-launch') : Ext.getCmp('main-tab-panel'));

        var mainTabPanel = Ext.getCmp('main-tab-panel');
        mainTabPanel.add(Ext.create('biglifts.views.LiftSchedule'));

        if (biglifts.toggles.Assistance) {
            mainTabPanel.add(Ext.create('biglifts.views.Assistance'));
        }

        mainTabPanel.add(Ext.create('biglifts.views.Maxes'));

        mainTabPanel.add(Ext.create('biglifts.views.Log'));

        if (!biglifts.toggles.Assistance) {
            mainTabPanel.add(Ext.create('biglifts.views.OneRepMaxCalculator'));
        }
        mainTabPanel.add(Ext.create('biglifts.views.More'));
        mainTabPanel.setActiveItem(firstTimeInApp ? 2 : 0);
    }
};

Ext.application({
    launch:function () {
        Ext.create('Ext.Panel', {
            id:'app',
            fullscreen:true,
            layout:'card',
            items:[
                {
                    xtype:'tabpanel',
                    id:'main-tab-panel',
                    fullscreen:true,
                    sortable:false,
                    tabBar:{
                        id:'tab-navigation',
                        docked:'bottom',
                        layout:{ pack:'center', align:'center' }
                    }
                },
                {
                    id:'first-time-launch',
                    xtype:'first-time-launch'
                }
            ]
        });

        biglifts.main.deviceReady = true;
        biglifts.main.loadApplication();
    }
})
;