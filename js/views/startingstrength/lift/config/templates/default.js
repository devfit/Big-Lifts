Ext.define('biglifts.views.ss.TemplateDefault', {
    extend:"biglifts.views.ss.Template",
    templateName:'Standard',
    templateDescription:"<p>Workout A: 3x5 Squat, 3x5 Bench, 1x5 Deadlift</p>" +
        "<p>Workout B: 3x5 Squat, 3x5 Press, 5x3 Power Clean</p>",
    goBack:function () {
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout'));
    },
    goForward:function () {
        var ssConfig = Ext.getCmp('ss-config');
        ssConfig.setActiveItem(ssConfig.getActiveIndex() + 1);
    }
});