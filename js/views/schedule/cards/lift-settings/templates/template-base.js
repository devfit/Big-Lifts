Ext.define('biglifts.views.templates.Base', {
    extend: 'Ext.Panel',
    buildUseToolbar: function (useHandler) {
        var me = this;
        return {
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            items: [
                {xtype: 'spacer'},
                {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Use',
                    handler: useHandler
                }
            ]
        };
    },
    getActiveItemIndex: function (c) {
        return c.items.findIndex('id', c.getActiveItem().id);
    },
    carouselBack: function () {
        var liftSettings = Ext.getCmp('lift-settings');
        liftSettings.setActiveItem(this.getActiveItemIndex(liftSettings) - 1);
    },
    carouselForward: function () {
        var liftSettings = Ext.getCmp('lift-settings');
        liftSettings.setActiveItem(this.getActiveItemIndex(liftSettings) + 1);
    },
    setupLiftScheme: function (scheme) {
        var prebuiltVariation = biglifts.liftProgressions.options[scheme];
        biglifts.stores.lifts.LiftProgression.clearFilter();
        biglifts.stores.lifts.LiftProgression.removeAll();
        biglifts.stores.lifts.LiftProgression.add(prebuiltVariation);
        biglifts.stores.lifts.LiftProgression.sync();

        var template = biglifts.stores.Template.first();
        template.set('name', scheme);
        template.set('hasMeetGoals', scheme === "powerlifting");
        biglifts.stores.Template.sync();

        biglifts.stores.WeekRotation.removeAll();
        biglifts.stores.WeekRotation.sync();

        biglifts.stores.lifts.MeetGoals.syncMeetGoalsToLifts();

        var customMessages = {'powerlifting': 'Meet goals have been defaulted to your 1RM estimates. You can change meet goals on the lifts tab.'};
        var message = _.has(customMessages, scheme) ? customMessages[scheme] : 'The lift scheme has been updated';

        Ext.Msg.alert('Lifts Updated', message, Ext.emptyFn);
    },
    config: {
        padding: 5
    }
});