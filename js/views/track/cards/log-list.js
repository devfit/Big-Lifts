Ext.ns('wendler.views.log.cards', 'wendler.controller.logList');

wendler.controller.logList.showLogEntry = function (dataview, index, item, e) {
    var logRecord = wendler.stores.LiftLog.getAt(index);
    wendler.controller.logEntry.setupLogEntry(logRecord);
};

wendler.controller.logList.deleteLogEntry = function (dataview, index, item, e) {
    wendler.stores.LiftLog.removeAt(index);
    wendler.stores.LiftLog.sync();
    Ext.getCmp('lift-log-list').refresh();
};

wendler.controller.logList.showExportLog = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('export-log'), {type:'slide', direction:'left'});
};

wendler.controller.logList.sortAndRefreshList = function () {
    var liftLogSort = wendler.stores.LiftLogSort.first();
    wendler.stores.LiftLog.sort(liftLogSort.data.property, liftLogSort.data.ascending ? 'ASC' : 'DESC');
    Ext.getCmp('lift-log-list').refresh();
};
wendler.stores.LiftLog.addListener('update', wendler.controller.logList.sortAndRefreshList);

wendler.controller.logList.showSortMenu = function () {
    var sortToolbar = Ext.getCmp('track-sort-toolbar');

    if (sortToolbar.isHidden()) {
        sortToolbar.show();
    } else {
        sortToolbar.hide();
    }

    wendler.controller.logList.updateUiForSortButtons();
};

wendler.controller.logList.sortBy = function (selectedProperty) {
    var liftLogSort = wendler.stores.LiftLogSort.first();
    var property = liftLogSort.get('property');
    if (property === selectedProperty) {
        liftLogSort.set('ascending', !liftLogSort.data.ascending);
    }
    else {
        var defaultAscending = {
            'timestamp':false,
            'liftName':true
        };

        liftLogSort.set('property', selectedProperty);
        liftLogSort.set('ascending', defaultAscending[selectedProperty]);
    }
    liftLogSort.save();

    wendler.controller.logList.updateUiForSortButtons();
    wendler.controller.logList.sortAndRefreshList();
};

wendler.controller.logList.updateUiForSortButtons = function () {
    var liftLogSort = wendler.stores.LiftLogSort.first();

    var sortNameButton = Ext.getCmp('sort-name-button');
    var sortNameActiveButton = Ext.getCmp('sort-name-button-active');
    var sortDateButton = Ext.getCmp('sort-date-button');
    var sortDateActiveButton = Ext.getCmp('sort-date-button-active');

    if (liftLogSort.data.property === "liftName") {
        sortNameButton.hide();
        sortNameActiveButton.show();

        sortDateActiveButton.hide();
        sortDateButton.show();
    }
    else if (liftLogSort.data.property == "timestamp") {
        sortNameActiveButton.hide();
        sortNameButton.show();

        sortDateButton.hide();
        sortDateActiveButton.show();
    }

    wendler.controller.logList.updateAscendingText();
};

wendler.controller.logList.PROPERTY_TO_ASCENDING_TEXT = {
    'liftName':{
        'ASC':'A-Z',
        'DESC':'Z-A'
    },
    'timestamp':{
        'ASC':'Oldest',
        'DESC':'Newest'
    }
};

wendler.controller.logList.DEFAULT_PROPERTY_ASCENDING = {
    'liftName':'ASC',
    'timestamp':'DESC'
};

wendler.controller.logList.updateAscendingText = function () {
    var liftLogSort = wendler.stores.LiftLogSort.first();

    var sortNameButton = Ext.getCmp('sort-name-button');
    var sortNameActiveButton = Ext.getCmp('sort-name-button-active');
    var sortDateButton = Ext.getCmp('sort-date-button');
    var sortDateActiveButton = Ext.getCmp('sort-date-button-active');

    var sortProperty = liftLogSort.data.property;
    var sortDirectionText = liftLogSort.data.ascending ? "ASC" : "DESC";
    if (sortProperty === "liftName") {
        sortNameButton.setText(wendler.controller.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);
        sortNameActiveButton.setText(wendler.controller.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);

        var dateText = wendler.controller.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][wendler.controller.logList.DEFAULT_PROPERTY_ASCENDING['timestamp']];
        sortDateButton.setText(dateText);
        sortDateActiveButton.setText(dateText);
    }
    else if (sortProperty === "timestamp") {
        sortDateButton.setText(wendler.controller.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);
        sortDateActiveButton.setText(wendler.controller.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);

        var liftNameText = wendler.controller.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][wendler.controller.logList.DEFAULT_PROPERTY_ASCENDING['liftName']];
        sortNameButton.setText(liftNameText);
        sortNameActiveButton.setText(liftNameText);
    }
};

wendler.stores.Settings.addListener('beforesync',function(){
    Ext.getCmp('lift-log-list').refresh();
});

wendler.views.log.cards.LogList = {
    id:'log-list',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.resetBack();
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Track',
            items:[
                {
                    id:'track-sort-button',
                    xtype:'button',
                    ui:'action',
                    text:'Sort...',
                    handler:wendler.controller.logList.showSortMenu
                },
                {xtype:'spacer'},
                {
                    id:'export-log-button',
                    xtype:'button',
                    iconMask:true,
                    iconCls:'action',
                    ui:'action',
                    handler:wendler.controller.logList.showExportLog
                }
            ]
        },
        {
            docked:'top',
            id:'track-sort-toolbar',
            xtype:'toolbar',
            hidden:true,
            showAnimation:{
                type:'slide',
                direction:'down'
            },
            items:[
                {
                    id:'sort-name-button',
                    ui:'action',
                    xtype:'button',
                    text:"A-Z",
                    handler:function () {
                        wendler.controller.logList.sortBy('liftName');
                    }
                },
                {
                    id:'sort-name-button-active',
                    hidden:true,
                    ui:'confirm',
                    xtype:'button',
                    text:"A-Z",
                    handler:function () {
                        wendler.controller.logList.sortBy('liftName');
                    }
                },
                {
                    id:'sort-date-button',
                    ui:'action',
                    xtype:'button',
                    text:"Newest",
                    handler:function () {
                        wendler.controller.logList.sortBy('timestamp');
                    }
                },
                {
                    id:'sort-date-button-active',
                    hidden:true,
                    ui:'confirm',
                    xtype:'button',
                    text:"Newest",
                    handler:function () {
                        wendler.controller.logList.sortBy('timestamp');
                    }
                }
            ]
        },
        {
            id:'lift-log-list',
            listeners:{
                initialize:function () {
                    wendler.controller.logList.sortAndRefreshList();
                    wendler.components.addSwipeToDelete(this, wendler.controller.logList.showLogEntry,
                        wendler.controller.logList.deleteLogEntry, '.date-week');
                }
            },
            xtype:'list',
            selectedCls:'',
            store:wendler.stores.LiftLog,
            itemCls:'lift-log-row',
            emptyText:'<div id="lift-log-empty-text">To track a lift, use the checkmark in the 5/3/1 view</div>',
            itemTpl:'<table><tbody><tr>' +
                '<td width="30%"><div class="lift-name">{liftName}</div><div class="cycle-and-week">C{cycle} W{week}</div></td>' +
                '<td width="30%"><div><span class="reps">{reps}x</span> <span class="weight">{weight}</span></div>' +
                '<div class="estimated-one-rep">~{[util.formulas.estimateOneRepMax(values.weight,values.reps)]}</div></td>' +
                '<td width="40%" class="date-week">' +
                '<span class="date">{[wendler.controller.log.formatDate(values.timestamp)]}</span><span class="disclosure-small"></span>' +
                '</td><td width="40%" class="delete-button-holder hidden"></td>' +
                '</tr></tbody></table>'
        }
    ]
};