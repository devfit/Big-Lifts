Ext.define('biglifts.views.LiftSettings', {
    extend: 'Ext.Panel',
    returnToLiftSelectFromSettings: function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    },
    carouselBack: function () {
        var liftSettings = Ext.getCmp('lift-settings');
        liftSettings.setActiveItem(liftSettings.getActiveIndex() - 1);
    },
    carouselForward: function () {
        var liftSettings = Ext.getCmp('lift-settings');
        liftSettings.setActiveItem(liftSettings.getActiveIndex() + 1);
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

        biglifts.stores.lifts.MeetGoals.removeAll();
        biglifts.stores.lifts.syncMeetGoalsToLifts();

        var customMessages = {'powerlifting': 'Meet goals have been defaulted to your 1RM estimates. You can change meet goals on the lifts tab.'};
        var message = _.has(customMessages, scheme) ? customMessages[scheme] : 'The lift scheme has been updated';

        Ext.Msg.alert('Lifts Updated', message, Ext.emptyFn);
    },
    config: {
        id: 'lift-settings',
        layout: 'card',
        activeItem: 0,
        listeners: {
            painted: function () {
                biglifts.navigation.setBackFunction(biglifts.liftSettings.returnToLiftSelectFromSettings);
            }
        },
        defaults: {
            xtype: 'formpanel',
            scroll: 'vertical'
        },
        items: [
            biglifts.liftSettings.templates.fresher,
            biglifts.liftSettings.templates.heavier,
            biglifts.liftSettings.templates.powerlifting,
            biglifts.liftSettings.templates.rotating,
            biglifts.liftSettings.templates.custom
        ]
    }
});