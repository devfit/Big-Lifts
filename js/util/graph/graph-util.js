Ext.ns('wendler.util.graph');

wendler.util.graph.convertLogToGraphStore = function () {
    var data = [];
    wendler.stores.LiftLog.sort('timestamp', 'ASC');
    wendler.stores.LiftLog.each(function (r) {
        wendler.util.graph.addLogRecordToData(data, r);
    });

    return Ext.create('Ext.data.JsonStore', {
        fields:_.flatten([
            'date',
            wendler.stores.lifts.Lifts.getUniqueLiftNames()
        ]),
        data:data
    });
};

wendler.util.graph.addLogRecordToData = function (data, record) {
    var formattedDate = new Date(record.get('timestamp'));
    var graphRecord = {
        date:formattedDate
    };
    graphRecord[record.get('liftName')] = util.formulas.estimateOneRepMax(record.get('weight'), record.get("reps"));

    var existingData = _.find(data, function (existingData) {
        return existingData.date.toString('mm/dd/yyyy') === graphRecord.date.toString('mm/dd/yyyy');
    });

    if (existingData) {
        _.extend(existingData, graphRecord);
    }
    else {
        data.push(graphRecord);
    }
};