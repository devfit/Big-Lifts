Ext.define("biglifts.views.Triumvirate", {
    extend:'Biglifts.views.Custom',
    customMovementStore:biglifts.stores.assistance.TriumvirateMovement,
    movementEditor:'custom-movement-editor',
    assistanceType:'Custom',
    config:{
        id:'custom-assistance'
    }
});