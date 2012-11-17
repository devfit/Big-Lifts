"use strict";
Ext.ns('biglifts.routines');
biglifts.routines.routineSelected = function (list, index) {
    var routine = biglifts.routines.routineStore.getAt(index);
    if (routine.get('available')) {
        biglifts.stores.Routine.removeAll();
        biglifts.stores.Routine.add({'name':routine.get('name')});
        biglifts.stores.Routine.sync();

        Ext.getCmp('app').setActiveItem(Ext.getCmp('main-tab-panel'));
    }
};

biglifts.routines.routineStore = Ext.create('Ext.data.Store', {
    data:[
        {name:'Starting Strength', available:false},
        {name:'5/3/1', available:true}
    ],
    proxy:{
        type:'memory'
    }
});

Ext.define('biglifts.views.FirstTimeLaunch', {
    extend:'Ext.form.Panel',
    xtype:'first-time-launch',
    config:{
        layout:'vbox',
        listeners:{
            show:function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize:function () {
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
                            initialize:function () {
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
});