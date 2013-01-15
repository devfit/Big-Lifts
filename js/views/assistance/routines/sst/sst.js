Ext.define('biglifts.views.SimplestStrengthTemplate', {
    extend: 'Biglifts.views.Custom',
    customMovementStore: biglifts.stores.assistance.SSTSets,
    movementEditor: null,
    assistanceType: 'SST',
    listConfig: {
        itemTpl: new Ext.XTemplate("{percentage}")
    },
    filterCustomMovements: function(){
      console.log("WOOT");
    },
    config: {
        id: 'sst'
    }
});