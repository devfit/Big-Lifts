Ext.define('biglifts.views.LiftLogList', {
    extend:'Ext.dataview.List',
    deloadMarker:function (week) {
        return week === 4 ? "[D]" : "";
    },
    deleteLogEntry:function (dataview, index, item, e) {
        biglifts.stores.LiftLog.removeAt(index);
        biglifts.stores.LiftLog.sync();
        Ext.getCmp('lift-log-list').refresh();
    },
    showLogEntry:function (dataview, index, item, e) {
        var logRecord = biglifts.stores.LiftLog.getAt(index);
        Ext.getCmp('edit-log-entry').setupLogEntry(logRecord);
    },
    sortLifts:function (sortProperty, sortDirection) {
        biglifts.stores.LiftLog.sortLog(sortProperty, sortDirection);
        this.refresh();
    },
    sortAndRefreshList:function () {
        var liftLogSort = biglifts.stores.LogSort.first();

        var sortDirection = liftLogSort.data.ascending ? 'ASC' : 'DESC';
        var sortProperty = liftLogSort.data.property;
        this.sortLifts(sortProperty, sortDirection);
    },
    config:{
        id:'lift-log-list',
        listeners:{
            painted:function () {
                if (!this._painted) {
                    this.sortAndRefreshList();
                    this._painted = true;
                    biglifts.components.addSwipeToDelete(this, this.showLogEntry,
                        this.deleteLogEntry, Ext.emptyFn, '.date-week');

                    biglifts.stores.LiftLog.addListener('beforesync', Ext.bind(this.sortAndRefreshList, this));
                    biglifts.stores.LogSort.addListener('beforesync', Ext.bind(this.sortAndRefreshList, this));
                    biglifts.stores.w.Settings.addListener('beforesync', Ext.bind(this.refresh, this));
                }
            }
        },
        selectedCls:'',
        store:biglifts.stores.LiftLog,
        itemCls:'lift-log-row',
        emptyText:'<div id="lift-log-empty-text">To track a lift, use the checkmark in the lift view</div>',
        itemTpl:'<table><tbody><tr>' +
            '<td width="32%"><div class="lift-name">{liftName}</div><div class="cycle-and-week">C{cycle} W{week} ' +
            '<span class="deload-indicator">{[Ext.getCmp("lift-log-list").deloadMarker(values.week)]}</span>' +
            '</div></td>' +
            '<td width="28%"><div><span class="reps">{reps}x</span> <span class="weight">{weight}</span></div>' +
            '<div class="estimated-one-rep">~{[util.formulas.estimateOneRepMax(values.weight,values.reps)]}</div></td>' +
            '<td width="40%" class="date-week">' +
            '<span class="date">{[biglifts.log.formatDate(values.timestamp)]}</span><span class="disclosure-small"></span>' +
            '</td><td width="40%" class="delete-button-holder hidden"></td>' +
            '</tr></tbody></table>'
    }
});