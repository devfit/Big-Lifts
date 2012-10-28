Ext.ns('biglifts.views.liftSchedule.assistance');

Ext.define('BodyweightMovementEditor', {
    extend:'biglifts.views.CustomMovementEditor',
    xtype:'bodyweightmovementeditor',
    assistanceViewId:'bodyweight',
    customMovementStore:biglifts.stores.assistance.Bodyweight
});

biglifts.views.liftSchedule.assistance.BodyweightMovementEditor = {
    xtype:'bodyweightmovementeditor',
    id:'bodyweight-movement-editor',
    assistanceViewId:'bodyweight'
};