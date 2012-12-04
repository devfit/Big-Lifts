"use strict";
Ext.ns('biglifts.views', 'biglifts.settings.liftPercentages');

biglifts.settings.liftPercentages.currentWeek = 1;
biglifts.settings.liftPercentages.currentSet = null;

biglifts.settings.liftPercentages.switchLiftWeek = function (container, newValue) {
    var lists = biglifts.settings.liftPercentages.getWeekLists();
    biglifts.settings.liftPercentages.currentWeek = lists.indexOf(newValue) + 1;
    biglifts.settings.liftPercentages.updateLiftPercentaqes();
};

biglifts.settings.liftPercentages.updateLiftPercentaqes = function () {
    if (biglifts.settings.liftPercentages.currentWeek) {
        biglifts.stores.lifts.LiftProgression.clearFilter();
        biglifts.stores.lifts.LiftProgression.filter("week", biglifts.settings.liftPercentages.currentWeek);
    }
};

biglifts.settings.liftPercentages.getWeekLists = function () {
    var listFilter = new Ext.util.Filter({
        filterFn:function (item) {
            return item.getBaseCls() === "x-panel";
        }
    });
    return Ext.getCmp('edit-lift-percentages').getItems().filter(listFilter);
};

biglifts.settings.liftPercentages.returnToLiftSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'));
};

biglifts.settings.liftPercentages.showEditLiftPercentage = function (view, index) {
    biglifts.liftPercentages.showEditLiftProgression(index + 1);
};

biglifts.settings.liftPercentages.deleteLiftProgression = function (view, index) {
    var set = index + 1;
    var liftProgression = biglifts.stores.lifts.LiftProgression.findRecord('set', set);

    biglifts.stores.lifts.LiftProgression.remove(liftProgression);
    biglifts.stores.lifts.LiftProgression.sync();
};

biglifts.settings.liftPercentages.addSet = function () {
    var newSet = biglifts.stores.lifts.LiftProgression.max('set') + 1;
    biglifts.stores.lifts.LiftProgression.add({
        week:biglifts.settings.liftPercentages.currentWeek,
        set:newSet,
        reps:0,
        percentage:0,
        amrap:false,
        warmup:false
    });
    biglifts.stores.lifts.LiftProgression.sync();
    biglifts.liftPercentages.showEditLiftProgression(newSet);
};

biglifts.settings.liftPercentages.createTab = function (week) {
    return {
        xtype:'panel',
        layout:'vbox',
        title:week,
        items:[
            {
                flex:4,
                xtype:'list',
                store:biglifts.stores.lifts.LiftProgression,
                itemCls:'lift-percentage-row',
                itemTpl:'<table width="100%"><tbody><tr>' +
                    '<td width="60%"><div class="{[biglifts.liftSchedule.liftTemplate.getLiftRowClass(values)]}">' +
                    '<span class="reps">{reps}</span> <span class="percentage">{percentage}%</span></div>' +
                    '<td width="40%" class="no-delete-button"></td>' +
                    '<td width="40%" class="delete-button-holder hidden"></td>' +
                    '</tr></tbody></table>',
                listeners:{
                    initialize:function () {
                        biglifts.components.addSwipeToDelete(this, biglifts.settings.liftPercentages.showEditLiftPercentage,
                            biglifts.settings.liftPercentages.deleteLiftProgression, Ext.emptyFn, '.no-delete-button');
                    }
                }
            },
            {
                xtype:'panel',
                padding:3,
                items:[
                    {
                        xtype:'button',
                        text:'Add set',
                        handler:biglifts.settings.liftPercentages.addSet
                    }
                ]
            }
        ]
    };
};

biglifts.views.EditLiftPercentages = {
    xtype:'tabpanel',
    id:'edit-lift-percentages',
    title:'Edit',
    listeners:{
        activeitemchange:biglifts.settings.liftPercentages.switchLiftWeek,
        painted:function () {
            biglifts.navigation.setBackFunction(biglifts.settings.liftPercentages.returnToLiftSettings);
            biglifts.settings.liftPercentages.updateLiftPercentaqes();
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Weeks',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:biglifts.settings.liftPercentages.returnToLiftSettings
                }
            ]
        },
        biglifts.settings.liftPercentages.createTab(1),
        biglifts.settings.liftPercentages.createTab(2),
        biglifts.settings.liftPercentages.createTab(3),
        biglifts.settings.liftPercentages.createTab(4)
    ]
};
