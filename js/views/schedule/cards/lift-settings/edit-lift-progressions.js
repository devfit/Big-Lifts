"use strict";
Ext.ns('wendler.views', 'wendler.settings.liftPercentages');

wendler.settings.liftPercentages.currentWeek = 1;
wendler.settings.liftPercentages.currentSet = null;

wendler.settings.liftPercentages.switchLiftWeek = function (container, newValue) {
    var lists = wendler.settings.liftPercentages.getWeekLists();
    wendler.settings.liftPercentages.currentWeek = lists.indexOf(newValue) + 1;
    wendler.settings.liftPercentages.updateLiftPercentaqes();
};

wendler.settings.liftPercentages.updateLiftPercentaqes = function () {
    if (wendler.settings.liftPercentages.currentWeek) {
        wendler.stores.lifts.LiftProgression.clearFilter();
        wendler.stores.lifts.LiftProgression.filter("week", wendler.settings.liftPercentages.currentWeek);
    }
};

wendler.settings.liftPercentages.getWeekLists = function () {
    var listFilter = new Ext.util.Filter({
        filterFn:function (item) {
            return item.getBaseCls() === "x-panel";
        }
    });
    return Ext.getCmp('edit-lift-percentages').getItems().filter(listFilter);
};

wendler.settings.liftPercentages.returnToLiftSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'), {type:'slide', direction:'right'});
};

wendler.settings.liftPercentages.showEditLiftPercentage = function (view, index) {
    wendler.liftPercentages.showEditLiftProgression(index + 1);
};

wendler.settings.liftPercentages.addSet = function () {
    var newSet = wendler.stores.lifts.LiftProgression.max('set') + 1;
    wendler.stores.lifts.LiftProgression.add({
        week:wendler.settings.liftPercentages.currentWeek,
        set:newSet,
        reps:0,
        percentage:0
    });
    wendler.stores.lifts.LiftProgression.sync();
    wendler.liftPercentages.showEditLiftProgression(newSet);
};

wendler.settings.liftPercentages.createTab = function (week) {
    return {
        xtype:'panel',
        layout:'vbox',
        title:week,
        items:[
            {
                flex:4,
                xtype:'list',
                store:wendler.stores.lifts.LiftProgression,
                itemCls:'lift-percentage-row',
                itemTpl:'<span class="reps {[wendler.liftSchedule.liftTemplate.getLiftRowClass(values)]}">{reps}</span> <span class="percentage">{percentage}%</span><span class="disclosure"></span>',
                listeners:{
                    itemtap:wendler.settings.liftPercentages.showEditLiftPercentage
                }
            },
            {
                xtype:'panel',
                padding:3,
                items:[
                    {
                        xtype:'button',
                        text:'Add set',
                        handler:wendler.settings.liftPercentages.addSet
                    }
                ]
            }
        ]
    };
};

wendler.views.EditLiftPercentages = {
    xtype:'tabpanel',
    id:'edit-lift-percentages',
    title:'Edit',
    listeners:{
        activeitemchange:wendler.settings.liftPercentages.switchLiftWeek,
        show:function () {
            wendler.navigation.setBackFunction(wendler.settings.liftPercentages.returnToLiftSettings);
            wendler.settings.liftPercentages.updateLiftPercentaqes();
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
                    handler:wendler.settings.liftPercentages.returnToLiftSettings
                }
            ]
        },
        wendler.settings.liftPercentages.createTab(1),
        wendler.settings.liftPercentages.createTab(2),
        wendler.settings.liftPercentages.createTab(3),
        wendler.settings.liftPercentages.createTab(4)
    ]
};
