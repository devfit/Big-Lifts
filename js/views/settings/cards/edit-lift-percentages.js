"use strict";
Ext.ns('wendler', 'wendler.views', 'wendler.settings.liftPercentages', 'wendler.controller.settings.liftPercentages');

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

wendler.controller.settings.liftPercentages.editLiftPercentage = function(view, index) {
    var set = index + 1;
    var progressionIndex = wendler.stores.lifts.LiftProgression.findBy(function(r) {
        return r.data.set == set && r.data.week == wendler.settings.liftPercentages.currentWeek;
    });
    var progression = wendler.stores.lifts.LiftProgression.getAt(progressionIndex);
    Ext.Msg.prompt('Percentage', 'Set ' + set, function(button, text) {
        if (button == "ok") {
            progression.set('percentage', parseInt(text));
            progression.save();
        }
    }, this, false, progression.data.percentage);
};

new Ext.TabPanel({
    id: 'edit-percentages-lift-schedule',
    title: 'Lift Percentages',
    defaults: {
        items:[
            {
                id: 'edit-percentages-lift-list',
                xtype: 'list',
                store: wendler.stores.lifts.LiftProgression,
                itemTpl: '<p class="lift-percentage-row">{percentage}</p>',
                listeners: {
                    itemtap: wendler.controller.settings.liftPercentages.editLiftPercentage
                }
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
        beforecardswitch : wendler.controller.settings.liftPercentages.switchLiftWeekForComponent,
        beforeshow: wendler.controller.settings.liftPercentages.updateLiftPercentaqes
    },
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            title: 'Edit Percentages',
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: function() {
                        Ext.getCmp('settings').setActiveItem(Ext.getCmp('settings-form'), {type:'slide',direction:'right'});
                    }
                }
            ]
        }
    ]
});
