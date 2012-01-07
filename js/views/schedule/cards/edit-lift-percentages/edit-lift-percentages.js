"use strict";
Ext.ns('wendler.views', 'wendler.settings.liftPercentages', 'wendler.controller.settings.liftPercentages');

wendler.settings.liftPercentages.currentWeek = 1;

wendler.controller.settings.liftPercentages.switchLiftWeekForComponent = function(component, newcard) {
    wendler.settings.liftPercentages.currentWeek = wendler.controller.settings.liftPercentages.getWeekFromComponent(newcard);
    wendler.controller.settings.liftPercentages.updateLiftPercentaqes();
};


wendler.controller.settings.liftPercentages.updateLiftPercentaqes = function() {
    if (wendler.settings.liftPercentages.currentWeek) {
        wendler.stores.lifts.LiftProgression.clearFilter();
        wendler.stores.lifts.LiftProgression.filter("week", wendler.settings.liftPercentages.currentWeek);
    }
};

wendler.controller.settings.liftPercentages.getWeekFromComponent = function(component) {
    if (component === undefined) {
        return 1;
    }

    var title = component.title;
    return parseInt(title.charAt(title.length - 1));
};

wendler.controller.settings.liftPercentages.showEditLiftPercentage = function(view, index) {
    var set = index + 1;
    wendler.controller.liftPercentages.setupAndShowEditLiftPercentages(wendler.settings.liftPercentages.currentWeek, set);
};

wendler.views.EditLiftPercentages = {
    xtype: 'tabpanel',
    id: 'edit-lift-percentages',
    title: 'Percentages',
    defaults: {
        items:[
            {
                id: 'edit-percentages-lift-list',
                xtype: 'list',
                store: wendler.stores.lifts.LiftProgression,
                itemTpl: '<span class="lift-percentage-row">{percentage}%</span><span class="disclosure"></span>',
                listeners: {
                    itemtap: wendler.controller.settings.liftPercentages.showEditLiftPercentage
                }
            }
        ]
    },
    items: [
        {title: 'Wk 1'},
        {title: 'Wk 2'},
        {title: 'Wk 3'},
        {title: 'Wk 4'}
    ],
    listeners: {
        beforecardswitch : wendler.controller.settings.liftPercentages.switchLiftWeekForComponent,
        beforeshow: wendler.controller.settings.liftPercentages.updateLiftPercentaqes
    },
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            title: 'Percentages',
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: function() {
                        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'), {type:'slide',direction:'right'});
                    }
                }
            ]
        }
    ]
};
