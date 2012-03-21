Ext.ns('wendler.views.liftSchedule');

wendler.liftSchedule.controller.setupLiftSelector = function () {
    wendler.liftSchedule.controller.setupListDoneIcons();
    var cycleButton = Ext.getCmp('cycle-change-button');
    var cycle = wendler.stores.CurrentCycle.first().data.cycle;

    if (cycleButton) {
        cycleButton.setText("Cycle " + cycle);
    }
};

wendler.liftSchedule.controller.setupListDoneIcons = function () {
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
                    if (wendler.liftSchedule.controller.liftHasBeenCompleted(weekIndex + 1, listItemIndex)) {
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

wendler.liftSchedule.controller.getStartingWeek = function () {
    var weekCompleted = {1:true, 2:true, 3:true, 4:true};
    wendler.stores.lifts.LiftCompletion.each(function (record) {
        weekCompleted[record.data.week] &= record.data.completed;
    });

    var startingWeekTabIndex;
    for (var i = 1; i <= 4; i++) {
        if (!weekCompleted[i]) {
            startingWeekTabIndex = i - 1;
            break;
        }
    }

    return startingWeekTabIndex;
};

wendler.liftSchedule.controller.viewLift = function (view, index) {
    var record = wendler.stores.lifts.Lifts.getAt(index);

    Ext.getCmp('lift-template-toolbar').setTitle(record.get('name'));
    wendler.liftSchedule.currentLiftProperty = record.get('propertyName');

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'left'});
};

wendler.liftSchedule.controller.getWeekLists = function () {
    var listFilter = new Ext.util.Filter({
        filterFn:function (item) {
            return item.getBaseCls() === "x-list";
        }
    });
    return Ext.getCmp('lift-selector').getItems().filter(listFilter);
};

wendler.liftSchedule.controller.handleWeekChange = function (container, newValue, oldValue, opts) {
    var lists = wendler.liftSchedule.controller.getWeekLists();
    var week = lists.indexOf(newValue) + 1;
    Ext.getCmp('lift-selector-toolbar').setTitle('Week ' + week);
    wendler.liftSchedule.currentWeek = week;
};

wendler.liftSchedule.controller.showLiftScheduleSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'),
        {type:'slide', direction:'left'});
};

wendler.liftSchedule.lastActiveTab = null;
wendler.liftSchedule.controller.showLiftsCompletedScreen = function () {
    wendler.liftSchedule.lastActiveTab = Ext.getCmp('lift-schedule').getActiveItem();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lifts-completed'),
        {type:'slide', direction:'down'});
};

wendler.liftSchedule.controller.liftHasBeenCompleted = function (week, liftIndex) {
    var liftPropertyName = wendler.stores.lifts.Lifts.getAt(liftIndex).get('propertyName');
    return wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(liftPropertyName, week).get('completed');
};

wendler.liftSchedule.controller.refreshLiftSelectorLifts = function () {
    wendler.liftSchedule.controller.getWeekLists().each(function (list) {
        list.refresh();
    });
};

wendler.stores.lifts.Lifts.addListener('beforesync', wendler.liftSchedule.controller.refreshLiftSelectorLifts);

wendler.views.liftSchedule.liftSelector = {
    xtype:'tabpanel',
    id:'lift-selector',
    activeItem:wendler.liftSchedule.controller.getStartingWeek(),
    listeners:{
        show:wendler.liftSchedule.controller.setupLiftSelector,
        activeitemchange:wendler.liftSchedule.controller.handleWeekChange
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
                    handler:wendler.liftSchedule.controller.showLiftScheduleSettings
                },
                {xtype:'spacer'},
                {
                    id:'cycle-change-button',
                    xtype:'button',
                    ui:'action',
                    text:'Cycle 1',
                    handler:wendler.liftSchedule.controller.showLiftsCompletedScreen
                }
            ]
        },
        {
            title:'1',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.controller.viewLift
            }
        },
        {
            title:'2',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.controller.viewLift
            }
        },
        {
            title:'3',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.controller.viewLift
            }
        },
        {
            title:'4',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.controller.viewLift
            }
        }
    ]
};