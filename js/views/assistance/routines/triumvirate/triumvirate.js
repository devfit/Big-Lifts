Ext.ns('biglifts.views.liftSchedule.assistance');

Ext.define("biglifts.views.Triumvirate", {
    extend:'Biglifts.views.Custom',
    xtype:'triumvirateassistance',
    customMovementStore:biglifts.stores.assistance.TriumvirateMovement,
    movementEditor:'custom-movement-editor',
    assistanceType:'Custom'
});

biglifts.views.liftSchedule.assistance.Custom = {
    xtype:'triumvirateassistance',
    id:'custom-assistance'
};