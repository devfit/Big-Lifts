Ext.ns('biglifts.liftSettings');

biglifts.liftSettings.returnToLiftSelectFromSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

biglifts.liftSettings.carouselBack = function () {
    var liftSettings = Ext.getCmp('lift-settings');
    liftSettings.setActiveItem(liftSettings.getActiveIndex() - 1);
};

biglifts.liftSettings.carouselForward = function () {
    var liftSettings = Ext.getCmp('lift-settings');
    liftSettings.setActiveItem(liftSettings.getActiveIndex() + 1);
};

biglifts.liftSettings.setupLiftScheme = function (scheme) {
    //TODO: Figure out weird saving behavior. On the very first load, and only on mobile safari, if the records
    //being saved are the *same* as those that exist, on page reload, the count of the store will be 0.
    //It's almost as if the records are marked to be deleted twice.
    var prebuiltVariation = biglifts.liftProgressions.options[scheme];
    biglifts.stores.lifts.LiftProgression.clearFilter();
    biglifts.stores.lifts.LiftProgression.removeAll();
    biglifts.stores.lifts.LiftProgression.add(prebuiltVariation);
    biglifts.stores.lifts.LiftProgression.sync();

    var template = biglifts.stores.Template.first();
    template.set('name', scheme);
    template.set('hasMeetGoals', scheme === "powerlifting");
    biglifts.stores.Template.sync();

    biglifts.stores.lifts.MeetGoals.removeAll();
    biglifts.stores.lifts.syncMeetGoalsToLifts();

    var customMessages = {'powerlifting':'Meet goals have been defaulted to your 1RM estimates. You can change meet goals on the lifts tab.'};
    var message = _.has(customMessages, scheme) ? customMessages[scheme] : 'The lift scheme has been updated';

    Ext.Msg.alert('Lifts Updated', message, Ext.emptyFn);
};