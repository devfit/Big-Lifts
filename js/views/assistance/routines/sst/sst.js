Ext.define('biglifts.views.SimplestStrengthTemplate', {
    extend:'Biglifts.views.Custom',
    customMovementStore:biglifts.stores.assistance.SSTSets,
    movementEditor:null,
    assistanceType:'SST',
    listConfig:{
        itemTpl:new Ext.XTemplate("<table class='assistance-table'><tbody><tr>" +
            "<td width='50%'><span class='name'>{[this.getName()]}</b></td><td style='text-align:right;' width='50%'>{reps}x " +
            "{[this.getWeight(values)]}" +
            "{[this.getUnits(values)]}</td>" +
            "</tr></tbody></table>",
            {
                getName:function () {
                    var currentLiftProperty = Ext.getCmp('assistance-lift-chooser').currentLiftProperty;
                    var liftId = biglifts.stores.lifts.Lifts.findRecord('propertyName', currentLiftProperty).get('id');
                    return biglifts.stores.assistance.SST.findRecord('lift_id', liftId).get('name');
                },
                getWeight:function (values) {
                    return "";
                },
                getUnits:function (values) {
                    var weight = values.weight;
                    return weight == 0 || weight == null ? "" : biglifts.stores.GlobalSettings.getUnits();
                }
            })
    },
    config:{
        customPanelClass:'biglifts.views.SstCustomPanel',
        id:'sst'
    }
});