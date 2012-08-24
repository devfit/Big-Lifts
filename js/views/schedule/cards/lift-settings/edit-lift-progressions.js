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
            return item.getBaseCls() === "x-list";
        }
    });
    return Ext.getCmp('edit-lift-percentages').getItems().filter(listFilter);
};

wendler.settings.liftPercentages.returnToLiftSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'), {type:'slide', direction:'right'});
};

wendler.settings.liftPercentages.showEditLiftPercentage = function (view, index) {
    wendler.settings.liftPercentages.currentSet = index + 1;
    wendler.liftPercentages.showEditLiftProgression();
};

wendler.settings.liftPercentages.LIST_TEMPLATE = '<span class="reps {[wendler.liftSchedule.liftTemplate.getLiftRowClass(values)]}">{reps}</span> <span class="percentage">{percentage}%</span><span class="disclosure"></span>';

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
            title:'Progressions',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.settings.liftPercentages.returnToLiftSettings
                }
            ]
        },
        {
            title:'Wk 1',
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            itemCls:'lift-percentage-row',
            itemTpl:wendler.settings.liftPercentages.LIST_TEMPLATE,
            listeners:{
                itemtap:wendler.settings.liftPercentages.showEditLiftPercentage
            }
        },
        {
            title:'Wk 2',
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            itemCls:'lift-percentage-row',
            itemTpl:wendler.settings.liftPercentages.LIST_TEMPLATE,
            listeners:{
                itemtap:wendler.settings.liftPercentages.showEditLiftPercentage
            }
        },
        {
            title:'Wk 3',
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            itemCls:'lift-percentage-row',
            itemTpl:wendler.settings.liftPercentages.LIST_TEMPLATE,
            listeners:{
                itemtap:wendler.settings.liftPercentages.showEditLiftPercentage
            }
        },
        {
            title:'Wk 4',
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            itemCls:'lift-percentage-row',
            itemTpl:wendler.settings.liftPercentages.LIST_TEMPLATE,
            listeners:{
                itemtap:wendler.settings.liftPercentages.showEditLiftPercentage
            }
        }
    ]
};
