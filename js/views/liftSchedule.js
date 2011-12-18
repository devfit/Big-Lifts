"use strict";
Ext.ns('wendler.views', 'wendler.liftSchedule.controller');

wendler.liftSchedule.currentShowingMax = -1;
wendler.liftSchedule.currentLiftProperty = null;
wendler.liftSchedule.currentWeek = -1;

wendler.liftSchedule.controller.formatLiftWeight = function (max, percentage) {
    var useTrainingMax = wendler.stores.Settings.first().data['use-training-max'];
    var percentageModifier = 1;
    if (useTrainingMax) {
        percentageModifier = 0.9;
    }

    var unroundedWeight = max * percentage * percentageModifier / 100.0;
    var roundingValue = wendler.stores.Settings.first().data['rounding-value'];
    var roundingType = wendler.stores.Settings.first().data['rounding-type'];
    return util.roundNumber(unroundedWeight, roundingValue, roundingType);
};

wendler.liftSchedule.controller.switchLiftWeekForComponent = function (newcard) {
    wendler.liftSchedule.currentWeek = wendler.liftSchedule.controller.getWeekFromComponent(newcard);
    wendler.liftSchedule.controller.updateLiftValues();
};

wendler.liftSchedule.controller.updateLiftValues = function () {
    var showWarmupSets = wendler.stores.Settings.first().data['show-warmup-sets'];

    if (wendler.liftSchedule.currentLiftProperty) {
        wendler.liftSchedule.currentShowingMax = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).data.max;
        wendler.stores.lifts.LiftProgression.clearFilter();
        wendler.stores.lifts.LiftProgression.filter("week", wendler.liftSchedule.currentWeek);

        if (!showWarmupSets) {
            wendler.stores.lifts.LiftProgression.filterBy(function (record) {
                return record.data.set > 3 && record.data.week == wendler.liftSchedule.currentWeek;
            });
        }
    }
};

wendler.liftSchedule.controller.viewLift = function (view, index) {
    var record = wendler.stores.lifts.Lifts.getAt(index);
    var liftName = record.get('name');
    Ext.getCmp('lift-template-toolbar').setTitle(liftName);

    wendler.liftSchedule.currentLiftProperty = record.get('propertyName');

    var liftSelector = Ext.getCmp('lift-selector');
    wendler.liftSchedule.controller.switchLiftWeekForComponent(liftSelector.getActiveItem());
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'left'});
};

wendler.liftSchedule.controller.parseWeekFromTitle = function (title) {
    if (title === undefined) {
        return 1;
    }

    return parseInt(title.charAt(title.length - 1));
};

wendler.liftSchedule.controller.getWeekFromComponent = function (component) {
    if (component === undefined) {
        return 1;
    }

    return wendler.liftSchedule.controller.parseWeekFromTitle(component.title);
};

wendler.liftSchedule.controller.setupDoneIcons = function () {
    var liftLists = Ext.getCmp('lift-selector').query('list');
    for (var weekIndex = 0; weekIndex < liftLists.length; weekIndex++) {
        var liftList = liftLists[weekIndex];
        var listItems = liftList.getEl().query('.x-list-item');
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
};

wendler.liftSchedule.controller.liftHasBeenCompleted = function (week, liftIndex) {
    var liftPropertyName = wendler.stores.lifts.Lifts.getAt(liftIndex).get('propertyName');
    return wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(liftPropertyName, week).get('completed');
};

wendler.liftSchedule.controller.setupLiftCompleteToggle = function () {
    var completed = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty,
        wendler.liftSchedule.currentWeek).get('completed');

    var unmarkButton = Ext.getCmp('unmark-lift-completed-button');
    var markButton = Ext.getCmp('mark-lift-completed-button');
    if (completed) {
        unmarkButton.show();
        markButton.hide();
    }
    else {
        markButton.show();
        unmarkButton.hide();
    }
};

wendler.liftSchedule.controller.markHandling = function (shouldMark) {
    var liftCompletion = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty, wendler.liftSchedule.currentWeek);
    liftCompletion.set('completed', shouldMark);
    liftCompletion.save();

    var unmarkButton = Ext.getCmp('unmark-lift-completed-button');
    var markButton = Ext.getCmp('mark-lift-completed-button');

    if (shouldMark) {
        unmarkButton.show();
        markButton.hide();
    }
    else {
        unmarkButton.hide();
        markButton.show();
    }
    wendler.liftSchedule.controller.setupDoneIcons();
};

wendler.liftSchedule.controller.markLiftCompleted = function () {
    wendler.liftSchedule.controller.markHandling(true);
};

wendler.liftSchedule.controller.unmarkLiftCompleted = function () {
    wendler.liftSchedule.controller.markHandling(false);
};

wendler.liftSchedule.controller.returnToLiftSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

wendler.liftSchedule.liftTemplate = {
    xtype:'panel',
    id:'lift-template',
    layout:'fit',
    items:[
        {
            xtype:'list',
            store:wendler.stores.lifts.LiftProgression,
            itemCls:'lift-row',
            itemTpl:'<p><span class="reps">{reps}x</span> <span>{[wendler.liftSchedule.controller.formatLiftWeight(wendler.liftSchedule.currentShowingMax,values.percentage)]}</span></p>'
        }
    ],
    listeners:{
        beforeshow:wendler.liftSchedule.controller.setupLiftCompleteToggle
    },
    dockedItems:[
        {
            xtype:'toolbar',
            id:'lift-template-toolbar',
            dock:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.controller.returnToLiftSelect
                },
                {xtype:'spacer'},
                {
                    hidden:true,
                    id:'mark-lift-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:wendler.liftSchedule.controller.markLiftCompleted
                },
                {
                    hidden:true,
                    id:'unmark-lift-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'confirm',
                    handler:wendler.liftSchedule.controller.unmarkLiftCompleted
                }
            ]
        }
    ]
};

wendler.liftSchedule.liftSelector = {
    xtype:'tabpanel',
    layout:'fit',
    id:'lift-selector',
    cardSwitchAnimation:appConfig.cardSwitchAnimation,

    items:[
        {
            title:'Week 1',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.controller.viewLift
            }
        },
        {
            title:'Week 2',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.controller.viewLift
            }
        },
        {
            title:'Week 3',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemTpl:'<strong>{name}</strong>',
            onItemDisclosure:true,
            listeners:{
                itemtap:wendler.liftSchedule.controller.viewLift
            }
        },
        {
            title:'Week 4',
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


wendler.views.LiftSchedule = Ext.extend(Ext.Panel, {
    id:'lift-schedule',
    title:'5/3/1',
    iconCls:'time',
    layout:'card',
    cardSwitchAnimation:'slide',
    listeners:{
        afterlayout:wendler.liftSchedule.controller.setupDoneIcons,
        beforeshow:wendler.liftSchedule.controller.updateLiftValues
    },
    items:[wendler.liftSchedule.liftSelector, wendler.liftSchedule.liftTemplate]
});