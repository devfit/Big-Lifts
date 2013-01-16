Ext.define('biglifts.views.SimplestStrengthTemplate', {
    extend:'Biglifts.views.Custom',
    customMovementStore:biglifts.stores.assistance.SSTSets,
    assistanceType:'SST',
    listConfig:{
        itemTpl:new Ext.XTemplate("<table class='assistance-table'><tbody><tr>" +
            "<td width='50%'><span class='name'>{[this.getName()]}</b></td><td style='text-align:right;' width='50%'>{reps}x " +
            "{[this.getWeight(values)]}" +
            "{[this.getUnits(values)]}</td>" +
            "</tr></tbody></table>",
            {
                getCurrentLiftId:function () {
                    var currentLiftProperty = Ext.getCmp('assistance-lift-chooser').currentLiftProperty;
                    return biglifts.stores.lifts.Lifts.findRecord('propertyName', currentLiftProperty).get('id');
                },
                getName:function () {
                    return biglifts.stores.assistance.SST.findRecord('lift_id', this.getCurrentLiftId()).get('name');
                },
                getWeight:function (values) {
                    var max = biglifts.stores.assistance.SST.findRecord('lift_id', this.getCurrentLiftId()).get('max');
                    var percentage = values.percentage;
                    return biglifts.weight.format(max, percentage);
                },
                getUnits:function (values) {
                    var weight = this.getWeight(values);
                    return weight == 0 || weight == null ? "" : biglifts.stores.GlobalSettings.getUnits();
                }
            }),
        tapAction:null
    },
    config:{
        customPanelClass:'biglifts.views.SstCustomPanel',
        id:'sst'
    }
});