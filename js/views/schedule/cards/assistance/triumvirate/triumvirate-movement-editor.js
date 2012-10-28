Ext.ns('biglifts.views.liftSchedule.assistance');

Ext.define('TriumvirateMovementEditor', {
    extend:'biglifts.views.CustomMovementEditor',
    xtype:'triumviratemovementeditor',
    assistanceViewId:'custom-assistance',
    customMovementStore:biglifts.stores.assistance.TriumvirateMovement
});

biglifts.views.liftSchedule.assistance.CustomMovementEditor = {
    xtype:'triumviratemovementeditor',
    id:'custom-movement-editor'
};