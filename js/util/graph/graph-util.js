Ext.ns('biglifts.util.graph');

biglifts.util.graph.convertLogToGraphStore = function (lift_id) {
    var data = biglifts.util.graph.buildData(lift_id);
    var graphLifts = lift_id === "all" ? biglifts.stores.lifts.Lifts.getUniqueLiftNames() :
        biglifts.stores.lifts.Lifts.findRecord('id', lift_id).get('name');

    return Ext.create('Ext.data.JsonStore', {
        fields:_.flatten([
            'date',
            graphLifts
        ]),
        data:data
    });
};

biglifts.util.graph.buildData = function (lift_id) {
    if (lift_id !== 'all') {
        var name = biglifts.stores.lifts.Lifts.findRecord('id', lift_id).get('name');
        biglifts.stores.LiftLog.filter('liftName', name);
    }

    var data = [];
    biglifts.stores.LiftLog.sort('timestamp', 'ASC');
    biglifts.stores.LiftLog.each(function (r) {
        if (r.get('week') !== 4) {
            biglifts.util.graph.addLogRecordToData(data, r);
        }
    });

    biglifts.stores.LiftLog.clearFilter();
    return data;
};

biglifts.util.graph.addLogRecordToData = function (data, record) {
    var formattedDate = new Date(record.get('timestamp'));
    var graphRecord = {
        date:formattedDate
    };
    graphRecord[record.get('liftName')] = util.formulas.estimateOneRepMax(record.get('weight'), record.get("reps"));
    biglifts.util.graph.extendOrAdd(data, graphRecord);
};

biglifts.util.graph.extendOrAdd = function (data, record) {
    var DATE_FORMAT = 'MM/dd/yyyy';
    var existingData = _.find(data, function (existingData) {
        return existingData.date.toString(DATE_FORMAT) === record.date.toString(DATE_FORMAT);
    });

    if (existingData) {
        _.extend(existingData, record);
    }
    else {
        data.push(record);
    }
};