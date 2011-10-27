"use strict";
Ext.ns('wendler', 'wendler.views', 'wendler.liftSchedule', 'wendler.liftSchedule.controller');

wendler.liftSchedule.currentShowingMax = -1;
wendler.liftSchedule.currentLiftName = null;
wendler.liftSchedule.currentWeek = -1;

wendler.liftSchedule.controller.formatLiftWeight = function(max, percentage) {
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

wendler.liftSchedule.controller.switchLiftWeekForComponent = function(component, newcard) {
    wendler.liftSchedule.currentWeek = wendler.liftSchedule.controller.getWeekFromComponent(newcard);
    wendler.liftSchedule.controller.updateLiftValues();
};

wendler.liftSchedule.controller.updateLiftValues = function() {
    var showWarmupSets = wendler.stores.Settings.first().data['show-warmup-sets'];

    if (wendler.liftSchedule.currentLiftName) {
        wendler.liftSchedule.currentShowingMax = wendler.stores.lifts.Lifts.findRecord('name', wendler.liftSchedule.currentLiftName).data.max;
        wendler.stores.lifts.LiftProgression.clearFilter();
        wendler.stores.lifts.LiftProgression.filter("week", wendler.liftSchedule.currentWeek);

        if (!showWarmupSets) {
            wendler.stores.lifts.LiftProgression.filterBy(function(record) {
                return record.data.set > 3 && record.data.week == wendler.liftSchedule.currentWeek;
            });
        }
    }
};

wendler.liftSchedule.controller.viewLift = function(view, index) {
    var record = wendler.stores.lifts.Lifts.getAt(index);
    var liftName = record.get('name');
    Ext.getCmp('lift-template-toolbar').setTitle(liftName);

    wendler.liftSchedule.currentLiftName = liftName;

    var liftTemplate = Ext.getCmp('lift-template');
    wendler.liftSchedule.controller.switchLiftWeekForComponent(liftTemplate, liftTemplate.getActiveItem());
    Ext.getCmp('lift-schedule').setActiveItem(liftTemplate, {type:'slide',direction:'left'});
};

wendler.liftSchedule.controller.getWeekFromComponent = function(component) {
    if (component === undefined) {
        return 1;
    }

    var title = component.title;
    return parseInt(title.charAt(title.length - 1));
};

new Ext.TabPanel({
    id: 'lift-template',
    defaults: {
        items:[
            {
                xtype: 'list',
                store: wendler.stores.lifts.LiftProgression,
                itemCls: 'lift-row',
                itemTpl: '<p><span class="reps">{reps}x</span> <span>{[wendler.liftSchedule.controller.formatLiftWeight(wendler.liftSchedule.currentShowingMax,values.percentage)]}</span></p>'
            }
        ]
    },
    items: [
        {title: 'Week 1'},
        {title: 'Week 2'},
        {title: 'Week 3'},
        {title: 'Week 4'}
    ],
    listeners: {
        beforecardswitch : wendler.liftSchedule.controller.switchLiftWeekForComponent
    },
    dockedItems:[
        new Ext.Toolbar({
            id: 'lift-template-toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: function() {
                        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide',direction:'right'});
                    }
                }
            ]
        })
    ]
});

new Ext.Panel({
    id: 'lift-selector',
    items:[
        new Ext.List({
            xtype: 'list',
            store: wendler.stores.lifts.Lifts,
            itemTpl: '<strong>{name}</strong>',
            onItemDisclosure: true,
            listeners:{
                itemtap: wendler.liftSchedule.controller.viewLift
            }
        })
    ],
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            title: 'Lifts'
        }
    ]
});


wendler.views.LiftSchedule = Ext.extend(Ext.Panel, {
    id: 'lift-schedule',
    title: '5/3/1',
    iconCls: 'time',
    layout: 'card',
    cardSwitchAnimation:'slide',
    listeners: {
        beforeshow: wendler.liftSchedule.controller.updateLiftValues
    },
    items: [Ext.getCmp('lift-selector'), Ext.getCmp('lift-template')]
});