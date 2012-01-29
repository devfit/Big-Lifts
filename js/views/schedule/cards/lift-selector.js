Ext.ns('wendler.views.liftSchedule');

wendler.liftSchedule.controller.setupLiftSelector = function () {
    wendler.liftSchedule.controller.setupListDoneIcons();
};

wendler.liftSchedule.controller.setupListDoneIcons = function () {
    var liftSelector = Ext.getCmp('lift-selector');
    if (liftSelector) {
        var liftLists = liftSelector.query('list');
        for (var weekIndex = 0; weekIndex < liftLists.length; weekIndex++) {
            var liftList = liftLists[weekIndex];
            var liftListEl = liftList.getEl();
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

wendler.liftSchedule.controller.viewLift = function (view, index) {
    var record = wendler.stores.lifts.Lifts.getAt(index);

    Ext.getCmp('lift-template-toolbar').setTitle(record.get('name'));
    wendler.liftSchedule.currentLiftProperty = record.get('propertyName');

    wendler.liftSchedule.controller.updateLiftValues();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'left'});
};

wendler.liftSchedule.controller.handleWeekChange = function (container, newCard, oldCard, index) {
    var week = index + 1;
    Ext.getCmp('lift-selector-toolbar').setTitle('Week ' + week);
    wendler.liftSchedule.currentWeek = week;
};

wendler.liftSchedule.controller.showLiftScheduleSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'),
        {type:'slide', direction:'left'});
};

wendler.liftSchedule.controller.liftHasBeenCompleted = function (week, liftIndex) {
    var liftPropertyName = wendler.stores.lifts.Lifts.getAt(liftIndex).get('propertyName');
    return wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(liftPropertyName, week).get('completed');
};

wendler.views.liftSchedule.liftSelector = {
    xtype:'tabpanel',
    layout:'fit',
    id:'lift-selector',
    cardSwitchAnimation:appConfig.cardSwitchAnimation,
    listeners:{
        beforeshow:wendler.liftSchedule.controller.setupLiftSelector,
        beforecardswitch:wendler.liftSchedule.controller.handleWeekChange
    },
    dockedItems:[
        {
            xtype:'toolbar',
            id:'lift-selector-toolbar',
            dock:'top',
            title:'Week 1',
            items:[
                {
                    id:'lift-schedule-settings-button',
                    iconCls:'settings',
                    iconMask:true,
                    ui:'action',
                    handler:wendler.liftSchedule.controller.showLiftScheduleSettings
                }
            ]
        }
    ],
    items:[
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