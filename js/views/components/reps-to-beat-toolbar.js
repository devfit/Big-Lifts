Ext.define('biglifts.components.RepsToBeatToolbar', {
    extend:"Ext.Toolbar",
    constructor:function () {
        this.callParent(arguments);

        this.repsToBeatPanel = this.add({
            xtype:'component',
            cls:'reps-panel',
            width:'100%',
            tpl:'<table><tr>' +
                '<td width="40%">' +
                'Best: ~{lastEstimate}' +
                '</td>' +
                '<td width="60%" style="text-align:right">' +
                ' <span>Reps to beat: {repsToBeat}</span>' +
                '</td>' +
                '</tr></table>',
            data:{
                lastEstimate:0,
                repsToBeat:0
            }
        });
    },
    updateForLift:function (record) {
        var bestLogRecordOneRepEstimate = null;
        biglifts.stores.LiftLog.each(function (r) {
            if (r.get('liftName') === record.get('name')) {
                var weight = parseFloat(r.get('weight'));
                var reps = r.get('reps');
                var estimateOneRep = util.formulas.estimateOneRepMax(weight, reps);
                if (_.isNull(bestLogRecordOneRepEstimate)) {
                    bestLogRecordOneRepEstimate = estimateOneRep;
                }
                else if (estimateOneRep > bestLogRecordOneRepEstimate) {
                    bestLogRecordOneRepEstimate = estimateOneRep;
                }
            }
        });

        if (!_.isNull(bestLogRecordOneRepEstimate)) {
            var lastSetMax = biglifts.weight.format(
                biglifts.weight.lowerMaxToTrainingMax(biglifts.liftSchedule.currentShowingMax),
                biglifts.stores.lifts.LiftProgression.last().get('percentage'));

            this.show();

            this.repsToBeatPanel.setData({
                lastEstimate:bestLogRecordOneRepEstimate,
                repsToBeat:util.formulas.calculateRepsToBeatWeight(bestLogRecordOneRepEstimate, lastSetMax)
            });
        }
        else {
            this.hide();
        }
    },
    config:{
        ui:'light',
        hidden:true,
        docked:'top',
        cls:'reps-toolbar'
    }
});