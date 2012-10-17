Ext.ns('biglifts.logList');

biglifts.logList.sortAndRefreshList = function () {
    var liftLogSort = biglifts.stores.LiftLogSort.first();

    var sortDirection = liftLogSort.data.ascending ? 'ASC' : 'DESC';
    var sortProperty = liftLogSort.data.property;
    biglifts.logList.sortLifts(sortProperty, sortDirection);
    biglifts.logList.sortAssistance(sortProperty, sortDirection);
};

biglifts.logList.sortLifts = function (sortProperty, sortDirection) {
    biglifts.stores.LiftLog.sort(sortProperty, sortDirection);
    Ext.getCmp('lift-log-list').refresh();
};

biglifts.logList.showLogEntry = function (dataview, index, item, e) {
    var logRecord = biglifts.stores.LiftLog.getAt(index);
    biglifts.logEntry.setupLogEntry(logRecord);
};

biglifts.logList.deleteLogEntry = function (dataview, index, item, e) {
    biglifts.stores.LiftLog.removeAt(index);
    biglifts.stores.LiftLog.sync();
    Ext.getCmp('lift-log-list').refresh();
};

biglifts.logList.deloadMarker = function (week) {
    return week === 4 ? "[D]" : "";
};

biglifts.stores.LiftLog.addListener('beforesync', function () {
    if (biglifts.main.started) {
        biglifts.logList.sortAndRefreshList();
    }
});

biglifts.stores.Settings.addListener('beforesync', function () {
    if (biglifts.main.started) {
        Ext.getCmp('lift-log-list').refresh();
    }
});

biglifts.logList.liftLogList = {
    id:'lift-log-list',
    listeners:{
        initialize:function () {
            biglifts.logList.sortAndRefreshList();
            biglifts.components.addSwipeToDelete(this, biglifts.logList.showLogEntry,
                biglifts.logList.deleteLogEntry, Ext.emptyFn, '.date-week');
        }
    },
    xtype:'list',
    selectedCls:'',
    store:biglifts.stores.LiftLog,
    itemCls:'lift-log-row',
    emptyText:'<div id="lift-log-empty-text">To track a lift, use the checkmark in the 5/3/1 view</div>',
    itemTpl:'<table><tbody><tr>' +
        '<td width="32%"><div class="lift-name">{liftName}</div><div class="cycle-and-week">C{cycle} W{week} ' +
        '<span class="deload-indicator">{[biglifts.logList.deloadMarker(values.week)]}</span>' +
        '</div></td>' +
        '<td width="28%"><div><span class="reps">{reps}x</span> <span class="weight">{weight}</span></div>' +
        '<div class="estimated-one-rep">~{[util.formulas.estimateOneRepMax(values.weight,values.reps)]}</div></td>' +
        '<td width="40%" class="date-week">' +
        '<span class="date">{[biglifts.log.formatDate(values.timestamp)]}</span><span class="disclosure-small"></span>' +
        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
        '</tr></tbody></table>'
};