Ext.define('TriumvirateMovementEditor', {
    extend:'biglifts.views.CustomMovementEditor',
    assistanceViewId:'custom-assistance',
    customMovementStore:biglifts.stores.assistance.TriumvirateMovement,
    config:{
        id:'custom-movement-editor'
    }
});