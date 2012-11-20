Ext.ns('biglifts.logList');

biglifts.logList.showAssistanceLogEntry = function (dataview, index, item, e) {
    var assistanceLogRecord = biglifts.stores.assistance.ActivityLog.getAt(index);
    Ext.getCmp('edit-assistance-log-entry').setupAssistanceLogEntry(assistanceLogRecord);
};

biglifts.logList.deleteAssistanceEntry = function (dataview, index, item, e) {
    biglifts.stores.assistance.ActivityLog.removeAt(index);
    biglifts.stores.assistance.ActivityLog.sync();
    Ext.getCmp('log-assistance-list').refresh();
};

biglifts.logList.getAssistanceTypeDisplay = function (assistanceType) {
    var displayMapping = {
        'Custom':'Custom',
        'BBB':'5x10'
    };
    var displayType = assistanceType;
    if (displayMapping[assistanceType]) {
        displayType = displayMapping[assistanceType];
    }
    return displayType;
};

biglifts.logList.getWeightDisplay = function (weight) {
    return (weight == 0 || weight == null) ? "[?]" : weight;
};

biglifts.logList.sortAssistance = function (sortProperty, sortDirection) {
    var assistanceProperty = {
        'liftName':'movement',
        'timestamp':'timestamp'
    }[sortProperty];
    biglifts.stores.assistance.ActivityLog.sort(assistanceProperty, sortDirection);
    var logAssistanceList = Ext.getCmp('log-assistance-list');
    if (logAssistanceList) {
        Ext.getCmp('log-assistance-list').refresh();
    }
};

biglifts.logList.assistanceList = {
    id:'log-assistance-list',
    listeners:{
        painted:function () {
            biglifts.components.addSwipeToDelete(
                this,
                biglifts.logList.showAssistanceLogEntry,
                biglifts.logList.deleteAssistanceEntry,
                Ext.emptyFn,
                '.date-week');

            biglifts.stores.assistance.ActivityLog.addListener('beforesync', function () {
                Ext.getCmp('log-assistance-list').refresh();
            });
        }
    },
    xtype:'list',
    selectedCls:'',
    store:biglifts.stores.assistance.ActivityLog,
    itemCls:'lift-log-row',
    itemTpl:'<table><tbody><tr>' +
        '<td width="15%">{[biglifts.logList.getAssistanceTypeDisplay(values.assistanceType)]}</td>' +
        '<td width="25%"><div class="lift-name">{movement}</div><div class="cycle-and-week">Sets: {sets}</div></td>' +
        '<td width="25%"><div>' +
        '<span class="reps">{reps}x</span> ' +
        '<span class="weight">{[biglifts.logList.getWeightDisplay(values.weight)]}</span>' +
        '</div></td>' +
        '<td width="35%" class="date-week">' +
        '<span class="date">{[biglifts.log.formatDate(values.timestamp)]}</span>' +
        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
        '</tr></tbody></table>'
}
;