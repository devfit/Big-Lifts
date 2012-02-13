Ext.ns('wendler.views.log.cards', 'wendler.controller.logList');

wendler.controller.logList.findLogRowWithDeleteButton = function (list) {
    var deleteContainers = list.query('.delete-button-holder');
    for (var i = 0; i < deleteContainers.length; i++) {
        var deleteContainer = deleteContainers[i];
        if (!Ext.get(deleteContainer).hasCls('hidden')) {
            return Ext.get(deleteContainer).up('.lift-log-row');
        }
    }
    return null;
};

wendler.controller.logList.tappingDelete = function (tapTarget) {
    return tapTarget.hasCls('delete-button') || tapTarget.up('.delete-button') !== null;
};

wendler.controller.logList.showEditLogEntry = function (dataview, index, item, e) {
    var tapTarget = Ext.get(e.target);

    var logRowWithDelete = wendler.controller.logList.findLogRowWithDeleteButton(tapTarget.up('.x-list-parent'));
    if (wendler.controller.logList.tappingDelete(tapTarget)) {
        wendler.stores.LiftLog.removeAt(index);
        wendler.stores.LiftLog.sync();
        Ext.getCmp('lift-log-list').refresh();
    }
    else if (logRowWithDelete !== null) {
        wendler.controller.logList.showHideDeleteButton(logRowWithDelete, index);
    }
    else {
        var logRecord = wendler.stores.LiftLog.getAt(index);
        wendler.controller.logEntry.setupLogEntry(logRecord);
    }
};

wendler.controller.logList.sortAndRefreshList = function () {
    wendler.stores.LiftLog.sort('timestamp', 'DESC');
    Ext.getCmp('lift-log-list').refresh();
};

wendler.controller.logList.onItemSwipe = function (dataview, index, item) {
    wendler.controller.logList.showHideDeleteButton(item, index);
};

wendler.controller.logList.showHideDeleteButton = function (row, index) {
    var dateWeek = Ext.get(row).down('.date-week');
    var deleteButton = Ext.get(row).down('.delete-button-holder');
    if (dateWeek.hasCls('hidden')) {
        dateWeek.removeCls('hidden');
        deleteButton.addCls('hidden');
    }
    else if (deleteButton.hasCls('hidden')) {
        wendler.controller.logList.showDeleteButtonForDom(deleteButton, index);
        dateWeek.addCls('hidden');
    }
};

wendler.controller.logList.showDeleteButtonForDom = function (container, index) {
    container.removeCls('hidden');
    container.addCls('fade-in');

    if (container.down('.delete-button') === null) {
        new Ext.Button({
            cls:'delete-button',
            ui:'decline',
            text:'Delete',
            renderTo:container
        });
    }
};

wendler.stores.LiftLog.addListener('update', wendler.controller.logList.sortAndRefreshList);

wendler.views.log.cards.LogList = {
    id:'log-list',
    xtype:'panel',
    layout:'fit',
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Track',
            items:[
            ]
        }
    ],
    items:[
        {
            id:'lift-log-list',
            listeners:{
                afterrender:wendler.controller.logList.sortAndRefreshList,
                itemswipe:wendler.controller.logList.onItemSwipe,
                itemtap:wendler.controller.logList.showEditLogEntry
            },
            xtype:'list',
            selectedItemCls: '',
            store:wendler.stores.LiftLog,
            itemCls:'lift-log-row',
            emptyText:'<div id="lift-log-empty-text">To track a lift, use the checkmark in the 5/3/1 view</div>',
            itemTpl:'<table><tbody><tr>' +
                '<td width="30%"><span class="lift-name">{liftName}</span></td>' +
                '<td width="30%"><span class="reps">{reps}x</span> <span class="weight">{weight}</span></td>' +
                '<td width="40%" class="date-week">' +
                '<span class="date">{[wendler.controller.log.formatDate(values.timestamp)]}</span><span class="disclosure-small"></span>' +
                '</td><td width="40%" class="delete-button-holder hidden"></td>' +
                '</tr></tbody></table>'
        }
    ]
};