"use strict";
Ext.ns('biglifts.routines');
biglifts.routines.setup531 = function (firstTimeInRoutine) {
    var mainTabPanel = Ext.getCmp('main-tab-panel');
    mainTabPanel.add(Ext.create('biglifts.views.LiftSchedule'));
    if (biglifts.toggles.Assistance) {
        mainTabPanel.add(Ext.create('biglifts.views.Assistance'));
    }
    mainTabPanel.add(Ext.create('biglifts.views.Maxes'));
    mainTabPanel.add(Ext.create('biglifts.views.Log'));
    if (!biglifts.toggles.Assistance) {
        mainTabPanel.add(Ext.create('biglifts.views.OneRepMaxCalculator', {
            id: 'one-rep-max-calculator'
        }));
    }
    mainTabPanel.add(Ext.create('biglifts.views.More'));
    var editTabIndex = biglifts.toggles.Assistance ? 2 : 1;
    mainTabPanel.setActiveItem(firstTimeInRoutine ? editTabIndex : 0);
};

biglifts.routines.setupStartingStrength = function (firstTimeInRoutine) {
    var mainTabPanel = Ext.getCmp('main-tab-panel');
    mainTabPanel.add(Ext.create('biglifts.views.ss.Lift'));
    mainTabPanel.add(Ext.create('biglifts.views.ss.Edit'));
    mainTabPanel.add(Ext.create('biglifts.views.ss.Track'));
    mainTabPanel.add(Ext.create('biglifts.views.ss.More'));
    mainTabPanel.setActiveItem(firstTimeInRoutine ? 1 : 0);
};

biglifts.routines.routineStore = Ext.create('Ext.data.Store', {
    data: [
        {name: 'Starting Strength', available: true},
        {name: '5/3/1', available: true}
    ],
    proxy: {
        type: 'memory'
    }
});

Ext.define('biglifts.views.Setup', {
    extend: 'Ext.form.Panel',
    routineSelected: function (list, index) {
        var routine = biglifts.routines.routineStore.getAt(index);
        if (routine.get('available')) {
            this.showLoadingIndicator(Ext.bind(function () {
                biglifts.stores.Routine.removeAll();
                var routineName = routine.get('name');
                biglifts.stores.Routine.add({'name': routineName});
                biglifts.stores.Routine.sync();

                this.loadRoutine(routineName, true);
            }, this));
        }
    },
    showLoadingIndicator: function (callback) {
        this.loadingIndicator = this.loadingIndicator || Ext.Viewport.add({
            masked: {
                xtype: 'loadmask'
            }
        });

        this.loadingIndicator.show();
        setTimeout(callback, 100);
    },
    hideLoadingIndicator: function () {
        if (this.loadingIndicator) {
            this.loadingIndicator.hide();
        }
    },
    loadRoutine: function (name, firstTimeInApp) {
        this.destroyOldTabPanel();
        Ext.getCmp('app').add(biglifts.main.tabPanelConfig);

        var setupMethods = {
            "5/3/1": biglifts.routines.setup531,
            "Starting Strength": biglifts.routines.setupStartingStrength
        };

        setupMethods[name](firstTimeInApp);
        Ext.getCmp('app').setActiveItem(Ext.getCmp('main-tab-panel'));
    },
    destroyOldTabPanel: function () {
        var oldMainTabPanel = Ext.getCmp('main-tab-panel');
        oldMainTabPanel.removeAll(true);
        oldMainTabPanel.destroy();
    },
    config: {
        layout: 'vbox',
        listeners: {
            painted: function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize: {
                fn: function () {
                    var me = this;
                    var topToolbar = me.add({
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Big Lifts'
                    });

                    topToolbar.add({
                        xtype:'spacer'
                    });

                    topToolbar.add({
                        xtype:'button',
                        text: "User: Bob"
                    });

                    me.add([
                        {
                            html: '<h1 class="first-time-launch-header">What are you lifting?</h1>',
                            height: 30
                        },
                        {
                            flex: 1,
                            xtype: 'list',
                            onItemDisclosure: true,
                            padding: 0,
                            cls: 'first-time-launch-list',
                            store: biglifts.routines.routineStore,
                            itemCls: 'routine-entry',
                            itemTpl: '{name}{[values.available ? "" : "<span class=\'coming-soon\'>Coming Soon!</span>"]}',
                            listeners: {
                                itemtap: Ext.bind(me.routineSelected, me),
                                painted: function () {
                                    var listItems = this.element.query('.x-list-item');
                                    biglifts.routines.routineStore.each(function (routine, i) {
                                        if (!routine.get('available')) {
                                            Ext.get(listItems[i]).addCls('unavailable');
                                        }
                                    });
                                }
                            }

                        }
                    ]);
                }
            }
        }
    }
});