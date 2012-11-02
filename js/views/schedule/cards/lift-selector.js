Ext.ns('biglifts.views.liftSchedule', 'biglifts.liftSchedule.liftSelector', 'biglifts.main');

biglifts.liftSchedule.liftSelector.setupLiftSelector = function () {
    biglifts.liftSchedule.liftSelector.setupListDoneIcons();
    var cycleButton = Ext.getCmp('cycle-change-button');
    var cycle = biglifts.stores.CurrentCycle.first().data.cycle;

    if (cycleButton) {
        cycleButton.setText("Cycle " + cycle);
    }
};

biglifts.liftSchedule.liftSelector.setupListDoneIcons = function () {
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
                    if (biglifts.liftSchedule.liftSelector.liftHasBeenCompleted(weekIndex + 1, listItemIndex)) {
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

biglifts.liftSchedule.liftSelector.getStartingWeek = function () {
    var weeksCompleted = {};
    biglifts.stores.lifts.LiftCompletion.each(function (record) {
        var week = record.data.week;
        if (!_.has(weeksCompleted, week)) {
            weeksCompleted[week] = true;
        }

        var enabled = biglifts.stores.lifts.Lifts.findRecord('propertyName', record.get('liftPropertyName')).get('enabled');
        if (enabled) {
            weeksCompleted[week] &= record.data.completed;
        }
    });

    var lastNotCompletedWeek = _.find(_.keys(weeksCompleted), function (key) {
        return !weeksCompleted[key];
    });

    lastNotCompletedWeek = _.isUndefined(lastNotCompletedWeek) ? _.last(_.keys(weeksCompleted)) : lastNotCompletedWeek;

    return parseInt(lastNotCompletedWeek);
};

biglifts.liftSchedule.liftSelector.viewLift = function (view, index) {
    var record = biglifts.stores.lifts.EnabledLifts.getAt(index);

    Ext.getCmp('lift-template-toolbar').setTitle(record.get('name'));
    biglifts.liftSchedule.currentLiftProperty = record.get('propertyName');

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'left'});
};

biglifts.liftSchedule.liftSelector.getWeekLists = function () {
    var listFilter = new Ext.util.Filter({
        filterFn:function (item) {
            return item.getBaseCls() === "x-list";
        }
    });
    return Ext.getCmp('lift-selector').getItems().filter(listFilter);
};

biglifts.liftSchedule.liftSelector.handleWeekChange = function (container, newValue, oldValue, opts) {
    var lists = biglifts.liftSchedule.liftSelector.getWeekLists();
    var week = lists.indexOf(newValue) + 1;
    biglifts.liftSchedule.liftSelector.changeWeek(week);
};

biglifts.liftSchedule.liftSelector.changeWeek = function (week) {
    Ext.getCmp('lift-selector-toolbar').setTitle('Week ' + week);
    biglifts.liftSchedule.currentWeek = week;
};

biglifts.liftSchedule.liftSelector.showLiftScheduleSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'),
        {type:'slide', direction:'left'});
};

biglifts.liftSchedule.lastActiveTab = null;
biglifts.liftSchedule.liftSelector.showLiftsCompletedScreen = function () {
    biglifts.liftSchedule.lastActiveTab = Ext.getCmp('lift-schedule').getActiveItem();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('cycle-complete'),
        {type:'slide', direction:'down'});
};

biglifts.liftSchedule.liftSelector.liftHasBeenCompleted = function (week, liftIndex) {
    var liftPropertyName = biglifts.stores.lifts.EnabledLifts.getAt(liftIndex).get('propertyName');
    var liftCompletion = biglifts.stores.lifts.findLiftCompletionByPropertyAndWeek(liftPropertyName, week);
    if (liftCompletion) {
        return liftCompletion.get('completed');
    }
    return false;
};

biglifts.liftSchedule.liftSelector.refreshLiftSelectorLifts = function () {
    biglifts.liftSchedule.liftSelector.getWeekLists().each(function (list) {
        list.refresh();
    });
};

biglifts.stores.lifts.EnabledLifts.addListener('beforesync', function () {
    if (biglifts.main.started && Ext.getCmp('lift-selector')) {
        biglifts.liftSchedule.liftSelector.refreshLiftSelectorLifts();
    }
});

biglifts.liftSchedule.setupCheckedTitleWeeks = function () {
    var startingWeekIndex = biglifts.liftSchedule.liftSelector.getStartingWeek() - 1;
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

biglifts.views.liftSchedule.liftSelector = {
    xtype:'tabpanel',
    id:'lift-selector',
    activeItem:biglifts.liftSchedule.liftSelector.getStartingWeek() - 1,
    listeners:{
        show:function () {
            biglifts.liftSchedule.liftSelector.setupLiftSelector();
            biglifts.liftSchedule.setupCheckedTitleWeeks();
            biglifts.navigation.unbindBackEvent();
        },
        initialize:function () {
            biglifts.liftSchedule.liftSelector.changeWeek(biglifts.liftSchedule.liftSelector.getStartingWeek());
        },
        activeitemchange:biglifts.liftSchedule.liftSelector.handleWeekChange
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
                    handler:biglifts.liftSchedule.liftSelector.showLiftScheduleSettings
                },
                {xtype:'spacer'},
                {
                    id:'cycle-change-button',
                    xtype:'button',
                    ui:'action',
                    text:'Cycle 1',
                    handler:biglifts.liftSchedule.liftSelector.showLiftsCompletedScreen
                }
            ]
        },
        {
            title:'1',
            xtype:'list',
            store:biglifts.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:biglifts.liftSchedule.liftSelector.viewLift
            }
        },
        {
            title:'2',
            xtype:'list',
            store:biglifts.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:biglifts.liftSchedule.liftSelector.viewLift
            }
        },
        {
            title:'3',
            xtype:'list',
            store:biglifts.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:biglifts.liftSchedule.liftSelector.viewLift
            }
        },
        {
            title:'4',
            xtype:'list',
            store:biglifts.stores.lifts.EnabledLifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:biglifts.liftSchedule.liftSelector.viewLift
            }
        }
    ]
};