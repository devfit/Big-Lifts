Ext.ns('biglifts.views.liftSchedule.assistance');

Ext.define('biglifts.views.BodyWeight', {
    extend:'Biglifts.views.Custom',
    xtype:'bodyweightassistance',
    customMovementStore: biglifts.stores.assistance.BodyweightMovement,
    movementEditor:'bodyweight-movement-editor'
});

biglifts.views.liftSchedule.assistance.Bodyweight = {
    xtype:'bodyweightassistance',
    id:'bodyweight'
};