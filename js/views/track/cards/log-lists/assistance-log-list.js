Ext.ns('wendler.logList');

wendler.logList.showAssistanceLogEntry = function (dataview, index, item, e) {
    var assistanceLogRecord = wendler.stores.assistance.ActivityLog.getAt(index);
    wendler.logEntry.setupAssistanceLogEntry(assistanceLogRecord);
};

wendler.logList.deleteAssistanceEntry = function (dataview, index, item, e) {
    wendler.stores.assistance.ActivityLog.removeAt(index);
    wendler.stores.assistance.ActivityLog.sync();
    Ext.getCmp('log-assistance-list').refresh();
};

wendler.logList.getAssistanceTypeDisplay = function (assistanceType) {
    var displayMapping = {'Triumvirate':'Tri.'};
    var displayType = assistanceType;
    if (displayMapping[assistanceType]) {
        displayType = displayMapping[assistanceType];
    }
    return displayType;
};

wendler.logList.getWeightDisplay = function (weight) {
    return (weight == 0 || weight == null) ? "[?]" : weight;
};

wendler.logList.sortAssistance = function (sortProperty, sortDirection) {
    var assistanceProperty = {
        'liftName':'movement',
        'timestamp':'timestamp'
    }[sortProperty];
    wendler.stores.assistance.ActivityLog.sort(assistanceProperty, sortDirection);
    var logAssistanceList = Ext.getCmp('log-assistance-list');
    if (logAssistanceList) {
        Ext.getCmp('log-assistance-list').refresh();
    }
};

wendler.logList.assistanceList = {
    id:'log-assistance-list',
    listeners:{
        initialize:function () {
            wendler.components.addSwipeToDelete(
                this,
                wendler.logList.showAssistanceLogEntry,
                wendler.logList.deleteAssistanceEntry,
                Ext.emptyFn,
                '.date-week');

            wendler.stores.assistance.ActivityLog.addListener('beforesync', function () {
                Ext.getCmp('log-assistance-list').refresh();
            });
        }
    },
    xtype:'list',
    selectedCls:'',
    store:wendler.stores.assistance.ActivityLog,
    itemCls:'lift-log-row',
    itemTpl:'<table><tbody><tr>' +
        '<td width="15%">{[wendler.logList.getAssistanceTypeDisplay(values.assistanceType)]}</td>' +
        '<td width="25%"><div class="lift-name">{movement}</div><div class="cycle-and-week">Sets: {sets}</div></td>' +
        '<td width="25%"><div>' +
        '<span class="reps">{reps}x</span> ' +
        '<span class="weight">{[wendler.logList.getWeightDisplay(values.weight)]}</span>' +
        '</div></td>' +
        '<td width="35%" class="date-week">' +
        '<span class="date">{[wendler.log.formatDate(values.timestamp)]}</span>' +
        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
        '</tr></tbody></table>'
};