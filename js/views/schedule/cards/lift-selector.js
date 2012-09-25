Ext.ns('wendler.views.liftSchedule');
Ext.ns('wendler.liftSchedule.liftSelector');

wendler.liftSchedule.liftSelector.setupLiftSelector = function () {
    wendler.liftSchedule.liftSelector.setupListDoneIcons();
    var cycleButton = Ext.getCmp('cycle-change-button');
    var cycle = wendler.stores.CurrentCycle.first().data.cycle;

    if (cycleButton) {
        cycleButton.setText("Cycle " + cycle);
    }
};

wendler.liftSchedule.liftSelector.setupListDoneIcons = function () {
    var liftSelector = Ext.getCmp('lift-selector');
    if (liftSelector) {
        var liftLists = liftSelector.query('list');
        for (var weekIndex = 0; weekIndex < liftLists.length; weekIndex++) {
            var liftList = liftLists[weekIndex];
            var liftListEl = liftList.element;
            if (liftListEl) {
                var listItems = liftListEl.query('.x-list-item');
                for (var listItemIndex = 0; listItemIndex < listItems.length; listItemIndex++) {
                    var listItem = listItems[listItemIndex];
                    if (wendler.liftSchedule.liftSelector.liftHasBeenCompleted(weekIndex + 1, listItemIndex)) {
                        Ext.get(listItem).addCls('done');
                    }
                    else {
                        Ext.get(listItem).removeCls('done');
                    }
                }
            }
        }
    }
};

wendler.liftSchedule.liftSelector.getStartingWeek = function () {
    var weekCompleted = {1:true, 2:true, 3:true, 4:true};
    wendler.stores.lifts.LiftCompletion.each(function (record) {
        weekCompleted[record.data.week] &= record.data.completed;
    });

    var startingWeek;
    for (var i = 1; i <= 4; i++) {
        if (!weekCompleted[i]) {
            startingWeek = i;
            break;
        }
    }

    return startingWeek;
};

wendler.liftSchedule.liftSelector.viewLift = function (view, index) {
    var record = wendler.stores.lifts.Lifts.getAt(index);

    Ext.getCmp('lift-template-toolbar').setTitle(record.get('name'));
    wendler.liftSchedule.currentLiftProperty = record.get('propertyName');

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'left'});
};

wendler.liftSchedule.liftSelector.getWeekLists = function () {
    var listFilter = new Ext.util.Filter({
        filterFn:function (item) {
            return item.getBaseCls() === "x-list";
        }
    });
    return Ext.getCmp('lift-selector').getItems().filter(listFilter);
};

wendler.liftSchedule.liftSelector.handleWeekChange = function (container, newValue, oldValue, opts) {
    var lists = wendler.liftSchedule.liftSelector.getWeekLists();
    var week = lists.indexOf(newValue) + 1;
    wendler.liftSchedule.liftSelector.changeWeek(week);
};

wendler.liftSchedule.liftSelector.changeWeek = function (week) {
    Ext.getCmp('lift-selector-toolbar').setTitle('Week ' + week);
    wendler.liftSchedule.currentWeek = week;
};

wendler.liftSchedule.liftSelector.showLiftScheduleSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'),
        {type:'slide', direction:'left'});
};

wendler.liftSchedule.lastActiveTab = null;
wendler.liftSchedule.liftSelector.showLiftsCompletedScreen = function () {
    wendler.liftSchedule.lastActiveTab = Ext.getCmp('lift-schedule').getActiveItem();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lifts-completed'),
        {type:'slide', direction:'down'});
};

wendler.liftSchedule.liftSelector.liftHasBeenCompleted = function (week, liftIndex) {
    var liftPropertyName = wendler.stores.lifts.Lifts.getAt(liftIndex).get('propertyName');
    var liftCompletion = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(liftPropertyName, week);
    if (liftCompletion) {
        return liftCompletion.get('completed');
    }
    return false;
};

wendler.liftSchedule.liftSelector.refreshLiftSelectorLifts = function () {
    wendler.liftSchedule.liftSelector.getWeekLists().each(function (list) {
        list.refresh();
    });
};

wendler.stores.lifts.EnabledLifts.addListener('beforesync', function () {
    if (wendler.main.started) {
        wendler.liftSchedule.liftSelector.refreshLiftSelectorLifts();
    }
});

wendler.liftSchedule.setupCheckedTitleWeeks = function () {
    var startingWeekIndex = wendler.liftSchedule.liftSelector.getStartingWeek() - 1;
    var tabs = Ext.getCmp('lift-selector').down('.tabbar').query('.tab');

    if (startingWeekIndex === 0) {
        _.each(tabs, function (tab) {
            tab.removeCls('completed');
        });
    }
    else {
        var completedWeekTabs = _.first(tabs, startingWeekIndex);
        _.each(completedWeekTabs, function (tab) {
            tab.addCls('completed');
        });
    }

};

wendler.views.liftSchedule.liftSelector = {
    xtype:'tabpanel',
    id:'lift-selector',
    activeItem:wendler.liftSchedule.liftSelector.getStartingWeek() - 1,
    listeners:{
        show:function () {
            wendler.liftSchedule.liftSelector.setupLiftSelector();
            wendler.liftSchedule.setupCheckedTitleWeeks();
            wendler.navigation.unbindBackEvent();
        },
        initialize:function () {
            wendler.liftSchedule.liftSelector.changeWeek(wendler.liftSchedule.liftSelector.getStartingWeek());
        },
        activeitemchange:wendler.liftSchedule.liftSelector.handleWeekChange
    },
    items:[
        {
            xtype:'toolbar',
            id:'lift-selector-toolbar',
            docked:'top',
            title:'Week 1',
            items:[
                {
                    id:'lift-schedule-settings-button',
                    iconCls:'settings',
                    iconMask:true,
                    ui:'action',
                    handler:wendler.liftSchedule.liftSelector.showLiftScheduleSettings
                },
                {xtype:'spacer'},
                {
                    id:'cycle-change-button',
                    xtype:'button',
                    ui:'action',
                    text:'Cycle 1',
                    handler:wendler.liftSchedule.liftSelector.showLiftsCompletedScreen
                }
            ]
        },
        {
            title:'1',
            xtype:'list',
            store:wendler.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.liftSelector.viewLift
            }
        },
        {
            title:'2',
            xtype:'list',
            store:wendler.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.liftSelector.viewLift
            }
        },
        {
            title:'3',
            xtype:'list',
            store:wendler.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.liftSelector.viewLift
            }
        },
        {
            title:'4',
            xtype:'list',
            store:wendler.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.liftSelector.viewLift
            }
        }
    ]
};