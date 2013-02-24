Ext.define('BodyweightMovementEditor', {
    extend:'biglifts.views.CustomMovementEditor',
    xtype:'bodyweightmovementeditor',
    assistanceViewId:'bodyweight',
    customMovementStore:biglifts.stores.assistance.BodyweightMovement,
    config:{
        id:'bodyweight-movement-editor',
        assistanceViewId:'bodyweight'
    }
});