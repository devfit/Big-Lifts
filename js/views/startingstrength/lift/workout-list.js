Ext.define('biglifts.views.ss.WorkoutList', {
    extend: "Ext.dataview.List",
    config: {
        workoutName: null,
        title: 'A',
        store: biglifts.stores.ss.WorkoutStore,
        itemCls: 'workout-item',
        itemTpl: new Ext.XTemplate(
            '<table class="ss-workout {[values.warmup ? "warmup" : ""]}"><tbody><tr>' +
                '<td class="name" width="50%">{[this.getLiftName(values.lift_id)]}</td>' +
                '<td width="25%"><span class="sets">{sets}x </span>{reps}</td>' +
                '<td class="last" width="25%">{[this.getWeight(values.lift_id, values.percentage)]}{[this.getUnits()]}</td>' +
                '</tr></tbody></table>' +

                (biglifts.toggles.BarLoading ?
                    '<p class="bar-loader-breakdown">{[util.plates.getFormattedPlateList(' +
                        'this.getWeight(values.lift_id, values.percentage),this.getLift(values.lift_id))]}</p>' : ''), {
                getLiftName: function (lift_id) {
                    return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('name');
                },
                getLift: function (lift_id) {
                    return biglifts.stores.lifts.Lifts.findRecord('id', lift_id);
                },
                getWeight: function (lift_id, percentage) {
                    var weight = biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('weight');
                    if (percentage === 0) {
                        return biglifts.stores.BarWeight.first().get('weight');
                    }
                    else {
                        return biglifts.weight.format(weight, percentage);
                    }
                },
                getUnits: function () {
                    return biglifts.stores.GlobalSettings.getUnits();
                }
            })
    }
});