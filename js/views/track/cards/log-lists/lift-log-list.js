Ext.ns('wendler.logList');

wendler.logList.sortAndRefreshList = function () {
    var liftLogSort = wendler.stores.LiftLogSort.first();

    var sortDirection = liftLogSort.data.ascending ? 'ASC' : 'DESC';
    var sortProperty = liftLogSort.data.property;
    wendler.logList.sortLifts(sortProperty, sortDirection);
    wendler.logList.sortAssistance(sortProperty, sortDirection);
};

wendler.logList.sortLifts = function (sortProperty, sortDirection) {
    wendler.stores.LiftLog.sort(sortProperty, sortDirection);
    Ext.getCmp('lift-log-list').refresh();
};

wendler.logList.showLogEntry = function (dataview, index, item, e) {
    var logRecord = wendler.stores.LiftLog.getAt(index);
    wendler.logEntry.setupLogEntry(logRecord);
};

wendler.logList.deleteLogEntry = function (dataview, index, item, e) {
    wendler.stores.LiftLog.removeAt(index);
    wendler.stores.LiftLog.sync();
    Ext.getCmp('lift-log-list').refresh();
};

wendler.logList.deloadMarker = function (week) {
    return week === 4 ? "[D]" : "";
};

wendler.stores.LiftLog.addListener('beforesync', function () {
    if (wendler.main.started) {
        wendler.logList.sortAndRefreshList();
    }
});

wendler.stores.Settings.addListener('beforesync', function () {
    if (wendler.main.started) {
        Ext.getCmp('lift-log-list').refresh();
    }
});

wendler.logList.liftLogList = {
    id:'lift-log-list',
    listeners:{
        initialize:function () {
            wendler.logList.sortAndRefreshList();
            wendler.components.addSwipeToDelete(this, wendler.logList.showLogEntry,
                wendler.logList.deleteLogEntry, Ext.emptyFn, '.date-week');
        }
    },
    xtype:'list',
    selectedCls:'',
    store:wendler.stores.LiftLog,
    itemCls:'lift-log-row',
    emptyText:'<div id="lift-log-empty-text">To track a lift, use the checkmark in the 5/3/1 view</div>',
    itemTpl:'<table><tbody><tr>' +
        '<td width="32%"><div class="lift-name">{liftName}</div><div class="cycle-and-week">C{cycle} W{week} ' +
        '<span class="deload-indicator">{[wendler.logList.deloadMarker(values.week)]}</span>' +
        '</div></td>' +
        '<td width="28%"><div><span class="reps">{reps}x</span> <span class="weight">{weight}</span></div>' +
        '<div class="estimated-one-rep">~{[util.formulas.estimateOneRepMax(values.weight,values.reps)]}</div></td>' +
        '<td width="40%" class="date-week">' +
        '<span class="date">{[wendler.log.formatDate(values.timestamp)]}</span><span class="disclosure-small"></span>' +
        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
        '</tr></tbody></table>'
};