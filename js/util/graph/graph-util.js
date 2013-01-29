Ext.ns('biglifts.util.graph');

biglifts.util.graph.convertLogToGraphStore = function () {
    var data = [];
    biglifts.stores.LiftLog.sort('timestamp', 'ASC');
    biglifts.stores.LiftLog.each(function (r) {
        if (r.get('week') !== 4) {
            biglifts.util.graph.addLogRecordToData(data, r);
        }
    });

    return Ext.create('Ext.data.JsonStore', {
        fields:_.flatten([
            'date',
            biglifts.stores.lifts.Lifts.getUniqueLiftNames()
        ]),
        data:data
    });
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