"use strict";
Ext.ns('biglifts.routines');
biglifts.routines.routineSelected = function (list, index) {
    var routine = biglifts.routines.routineStore.getAt(index);
    if (routine.get('available')) {
        biglifts.stores.Routine.removeAll();
        var routineName = routine.get('name');
        biglifts.stores.Routine.add({'name':routineName});
        biglifts.stores.Routine.sync();

        biglifts.routines.loadRoutine(routineName, true);
    }
};

biglifts.routines.setup531 = function (firstTimeInRoutine) {
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
    var editTabIndex = biglifts.toggles.Assistance ? 2 : 1;
    mainTabPanel.setActiveItem(firstTimeInRoutine ? editTabIndex : 0);
};

biglifts.routines.loadRoutine = function (name, firstTimeInApp) {
    biglifts.main.destroyOldTabPanel();
    Ext.getCmp('app').add(biglifts.main.tabPanelConfig);

    var setupMethods = {
        "5/3/1":biglifts.routines.setup531
    };

    setupMethods[name](firstTimeInApp);
    Ext.getCmp('app').setActiveItem(Ext.getCmp('main-tab-panel'));
};


biglifts.routines.routineStore = Ext.create('Ext.data.Store', {
    data:[
        {name:'Starting Strength', available:true},
        {name:'5/3/1', available:true}
    ],
    proxy:{
        type:'memory'
    }
});

Ext.define('biglifts.views.RoutineChooser', {
    extend:'Ext.form.Panel',
    xtype:'routine-chooser',
    config:{
        layout:'vbox',
        listeners:{
            painted:function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize:{
                fn:function () {
                    this.add([
                        {
                            xtype:'toolbar',
                            docked:'top',
                            title:'Big Lifts'
                        },
                        {
                            html:'<h1 class="first-time-launch-header">What are you lifting?</h1>',
                            height:30
                        },
                        {
                            flex:1,
                            xtype:'list',
                            onItemDisclosure:true,
                            padding:0,
                            cls:'first-time-launch-list',
                            store:biglifts.routines.routineStore,
                            itemCls:'routine-entry',
                            itemTpl:'{name}{[values.available ? "" : "<span class=\'coming-soon\'>Coming Soon!</span>"]}',
                            listeners:{
                                itemtap:biglifts.routines.routineSelected,
                                painted:function () {
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