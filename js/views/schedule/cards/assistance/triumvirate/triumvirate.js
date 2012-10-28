Ext.ns('biglifts.views.liftSchedule.assistance');

Ext.define("biglifts.views.Triumvirate", {
    extend:'Biglifts.views.Custom',
    xtype:'triumvirateassistance',
    customMovementStore:biglifts.stores.assistance.CustomMovement,
    movementEditor:'custom-movement-editor'
});

biglifts.views.liftSchedule.assistance.Custom = {
    xtype:'triumvirateassistance',
    id:'custom-assistance'
};