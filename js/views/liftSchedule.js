"use strict";
Ext.ns('wendler.views', 'wendler.liftSchedule.controller');

wendler.liftSchedule.currentShowingMax = -1;
wendler.liftSchedule.currentLiftProperty = null;
wendler.liftSchedule.currentWeek = 1;

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

    Ext.getCmp('lift-template-toolbar').setTitle(record.get('name'));
    wendler.liftSchedule.currentLiftProperty = record.get('propertyName');

    wendler.liftSchedule.controller.updateLiftValues();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'left'});
};

wendler.liftSchedule.controller.setupLiftSelector = function () {
    wendler.liftSchedule.controller.setupListDoneIcons();
    wendler.liftSchedule.controller.setupWeekMarkLiftsButton();
};

wendler.liftSchedule.controller.setupWeekMarkLiftsButton = function () {
    wendler.stores.lifts.LiftCompletion.filterBy(function (r) {
        return r.get('week') == wendler.liftSchedule.currentWeek;
    });
    var uniqueValues = wendler.stores.lifts.LiftCompletion.collect('completed');
    var allLiftsCompleted = uniqueValues.length === 1 && uniqueValues[0] === true;
    wendler.stores.lifts.LiftCompletion.clearFilter();

    wendler.liftSchedule.controller.showCorrectWeekMarkButton(allLiftsCompleted);
};

wendler.liftSchedule.controller.setupListDoneIcons = function () {
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

wendler.liftSchedule.controller.showCorrectWeekMarkButton = function (completed) {
    var unmarkButton = Ext.getCmp('unmark-week-completed-button');
    var markButton = Ext.getCmp('mark-week-completed-button');
    if (completed) {
        unmarkButton.show();
        markButton.hide();
    }
    else {
        markButton.show();
        unmarkButton.hide();
    }
};

wendler.liftSchedule.controller.setupLiftCompleteToggle = function () {
    var completed = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty,
        wendler.liftSchedule.currentWeek).get('completed');
    wendler.liftSchedule.controller.showCorrectWeekMarkButton(completed);
};

wendler.liftSchedule.controller.markLiftHandler = function (completed) {
    var liftCompletion = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty, wendler.liftSchedule.currentWeek);
    liftCompletion.set('completed', completed);
    liftCompletion.save();

    var unmarkButton = Ext.getCmp('unmark-lift-completed-button');
    var markButton = Ext.getCmp('mark-lift-completed-button');

    if (completed) {
        unmarkButton.show();
        markButton.hide();
    }
    else {
        unmarkButton.hide();
        markButton.show();
    }
    wendler.liftSchedule.controller.setupListDoneIcons();
};

wendler.liftSchedule.controller.markLiftCompleted = function () {
    wendler.liftSchedule.controller.markLiftHandler(true);
};

wendler.liftSchedule.controller.unmarkLiftCompleted = function () {
    wendler.liftSchedule.controller.markLiftHandler(false);
};

wendler.liftSchedule.controller.markWeekHandler = function (completed) {
    wendler.stores.lifts.LiftCompletion.filterBy(function (r) {
        return r.get('week') == wendler.liftSchedule.currentWeek;
    });

    wendler.stores.lifts.LiftCompletion.each(function (r) {
        r.set('completed', completed);
        r.save();
    });

    var unmarkButton = Ext.getCmp('unmark-week-completed-button');
    var markButton = Ext.getCmp('mark-week-completed-button');

    if (completed) {
        unmarkButton.show();
        markButton.hide();
    }
    else {
        unmarkButton.hide();
        markButton.show();
    }


    wendler.stores.lifts.LiftCompletion.clearFilter();
    wendler.liftSchedule.controller.setupListDoneIcons();
};

wendler.liftSchedule.controller.markWeekCompleted = function () {
    wendler.liftSchedule.controller.markWeekHandler(true);
};

wendler.liftSchedule.controller.unmarkWeekCompleted = function () {
    wendler.liftSchedule.controller.markWeekHandler(false);
};

wendler.liftSchedule.controller.returnToLiftSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

wendler.liftSchedule.controller.updateLiftSelectTitle = function (container, newCard, oldCard, index) {
    var week = index + 1;
    Ext.getCmp('lift-selector-toolbar').setTitle('Week ' + week);
    wendler.liftSchedule.currentWeek = week;
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
    listeners:{
        beforecardswitch:wendler.liftSchedule.controller.updateLiftSelectTitle
    },
    dockedItems:[
        {
            xtype:'toolbar',
            id:'lift-selector-toolbar',
            dock:'top',
            title:'Week 1',
            items:[
                {xtype:'spacer'},
                {
                    hidden:true,
                    id:'mark-week-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:wendler.liftSchedule.controller.markWeekCompleted
                },
                {
                    hidden:true,
                    id:'unmark-week-completed-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'confirm',
                    handler:wendler.liftSchedule.controller.unmarkWeekCompleted
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


wendler.views.LiftSchedule = Ext.extend(Ext.Panel, {
    id:'lift-schedule',
    title:'5/3/1',
    iconCls:'time',
    layout:'card',
    cardSwitchAnimation:'slide',
    listeners:{
        afterlayout:wendler.liftSchedule.controller.setupLiftSelector,
        beforeshow:wendler.liftSchedule.controller.updateLiftValues
    },
    items:[wendler.liftSchedule.liftSelector, wendler.liftSchedule.liftTemplate]
});