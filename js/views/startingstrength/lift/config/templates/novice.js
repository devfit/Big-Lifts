Ext.define('biglifts.views.ss.NoviceTemplate', {
    extend:"biglifts.views.ss.Template",
    templateName:'Novice',
    templateDescription:"<p>Workout A: 3x5 Squat, 3x5 Bench, 1x5 Deadlift</p>" +
        "<p>Workout A: 3x5 Squat, 3x5 Bench, 1x5 Deadlift</p>",
    goBack:function () {
        var ssConfig = Ext.getCmp('ss-config');
        ssConfig.setActiveItem(ssConfig.getActiveIndex() - 1);
    }
});