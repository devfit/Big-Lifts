Ext.define('biglifts.views.CustomMovementList', {
    extend: "Ext.dataview.List",
    config: {
        tapAction: null,
        itemTpl: new Ext.XTemplate("<table class='assistance-table'><tbody><tr>" +
            "<td width='50%'><span class='name'>{name}</b></td><td width='20%'>{sets} sets</td><td style='text-align:right;' width='30%'>{reps}x " +
            "{[this.getWeightDisplay(values.weight)]}" +
            "{[this.getUnits(values)]}</td>" +
            "</tr></tbody></table>",
            {
                getWeightDisplay: function (weight) {
                    return (weight == 0 || weight == null) ? "" : weight;
                },
                getUnits: function (values) {
                    var weight = values.weight;
                    return weight == 0 || weight == null ? "" : biglifts.stores.GlobalSettings.getUnits();
                }
            }),
        listeners: {
            initialize: function () {
                this.addListener('itemtap', Ext.bind(this.getTapAction(), this));
            }
        }
    }
});