Ext.ns('wendler.views.log.cards', 'wendler.logList');

wendler.logList.showLogEntry = function (dataview, index, item, e) {
    var logRecord = wendler.stores.LiftLog.getAt(index);
    wendler.logEntry.setupLogEntry(logRecord);
};

wendler.logList.deleteLogEntry = function (dataview, index, item, e) {
    wendler.stores.LiftLog.removeAt(index);
    wendler.stores.LiftLog.sync();
    Ext.getCmp('lift-log-list').refresh();
};

wendler.logList.deleteAssistanceEntry = function (dataview, index, item, e) {
    wendler.stores.assistance.ActivityLog.removeAt(index);
    wendler.stores.assistance.ActivityLog.sync();
    Ext.getCmp('log-assistance-list').refresh();
};

wendler.logList.showExportLog = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('export-log'), {type:'slide', direction:'left'});
};

wendler.logList.sortAndRefreshList = function () {
    var liftLogSort = wendler.stores.LiftLogSort.first();
    wendler.stores.LiftLog.sort(liftLogSort.data.property, liftLogSort.data.ascending ? 'ASC' : 'DESC');
    Ext.getCmp('lift-log-list').refresh();
};
wendler.stores.LiftLog.addListener('beforesync', function () {
    if (wendler.main.started) {
        wendler.logList.sortAndRefreshList();
    }
});

wendler.logList.toggleVisibility = function (component) {
    if (component.isHidden()) {
        component.show();
    }
    else {
        component.hide();
    }
};

wendler.logList.showSortMenu = function () {
    wendler.logList.toggleVisibility(Ext.getCmp('track-sort-toolbar'));
    wendler.logList.updateUiForSortButtons();
};

wendler.logList.changeMovementTypeCalled = function(){
    Ext.getCmp('track-sort-toolbar').hide();
    wendler.logList.toggleVisibility(Ext.getCmp('track-lifts-movement-type-button'));
    wendler.logList.toggleVisibility(Ext.getCmp('track-assistance-movement-type-button'));
};

wendler.logList.changeMovementTypeToLifts = function () {
    wendler.logList.changeMovementTypeCalled();
    Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('lift-log-list'));
};

wendler.logList.changeMovementTypeToAssistance = function () {
    wendler.logList.changeMovementTypeCalled();
    Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('log-assistance-list'));
};

wendler.logList.sortBy = function (selectedProperty) {
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

    wendler.logList.updateUiForSortButtons();
    wendler.logList.sortAndRefreshList();
};

wendler.logList.updateUiForSortButtons = function () {
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

    wendler.logList.updateAscendingText();
};

wendler.logList.PROPERTY_TO_ASCENDING_TEXT = {
    'liftName':{
        'ASC':'A-Z',
        'DESC':'Z-A'
    },
    'timestamp':{
        'ASC':'Oldest',
        'DESC':'Newest'
    }
};

wendler.logList.DEFAULT_PROPERTY_ASCENDING = {
    'liftName':'ASC',
    'timestamp':'DESC'
};

wendler.logList.updateAscendingText = function () {
    var liftLogSort = wendler.stores.LiftLogSort.first();

    var sortNameButton = Ext.getCmp('sort-name-button');
    var sortNameActiveButton = Ext.getCmp('sort-name-button-active');
    var sortDateButton = Ext.getCmp('sort-date-button');
    var sortDateActiveButton = Ext.getCmp('sort-date-button-active');

    var sortProperty = liftLogSort.data.property;
    var sortDirectionText = liftLogSort.data.ascending ? "ASC" : "DESC";
    if (sortProperty === "liftName") {
        sortNameButton.setText(wendler.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);
        sortNameActiveButton.setText(wendler.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);

        var dateText = wendler.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][wendler.logList.DEFAULT_PROPERTY_ASCENDING['timestamp']];
        sortDateButton.setText(dateText);
        sortDateActiveButton.setText(dateText);
    }
    else if (sortProperty === "timestamp") {
        sortDateButton.setText(wendler.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);
        sortDateActiveButton.setText(wendler.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);

        var liftNameText = wendler.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][wendler.logList.DEFAULT_PROPERTY_ASCENDING['liftName']];
        sortNameButton.setText(liftNameText);
        sortNameActiveButton.setText(liftNameText);
    }
};

wendler.stores.Settings.addListener('beforesync', function () {
    if (wendler.main.started) {
        Ext.getCmp('lift-log-list').refresh();
    }
});

wendler.views.log.cards.LogList = {
    id:'log-list',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.unbindBackEvent();
        }
    },
    items:[
        {
            id:'showTypeTrackToolbar',
            docked:'top',
            xtype:'toolbar',
            title:'Track',
            listeners:{
                initialize:function () {
                    this.add(
                        {
                            id:'track-sort-button',
                            xtype:'button',
                            ui:'action',
                            text:'Sort',
                            handler:wendler.logList.showSortMenu
                        }
                    );

                    if (wendler.toggles.Assistance) {
                        this.add({
                            id:'track-lifts-movement-type-button',
                            xtype:'button',
                            text:'Asst.',
                            handler:wendler.logList.changeMovementTypeToAssistance
                        });

                        this.add({
                            id:'track-assistance-movement-type-button',
                            hidden:true,
                            xtype:'button',
                            text:'Lifts',
                            handler:wendler.logList.changeMovementTypeToLifts
                        });
                    }
                    this.add({xtype:'spacer'});
                    this.add({
                        id:'export-log-button',
                        xtype:'button',
                        iconMask:true,
                        iconCls:'action',
                        ui:'action',
                        handler:wendler.logList.showExportLog
                    });
                }
            }
        },
        {
            id:'track-sort-toolbar',
            docked:'top',
            xtype:'toolbar',
            ui:'light',
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
                        wendler.logList.sortBy('liftName');
                    }
                },
                {
                    id:'sort-name-button-active',
                    hidden:true,
                    ui:'confirm',
                    xtype:'button',
                    text:"A-Z",
                    handler:function () {
                        wendler.logList.sortBy('liftName');
                    }
                },
                {
                    id:'sort-date-button',
                    ui:'action',
                    xtype:'button',
                    text:"Newest",
                    handler:function () {
                        wendler.logList.sortBy('timestamp');
                    }
                },
                {
                    id:'sort-date-button-active',
                    hidden:true,
                    ui:'confirm',
                    xtype:'button',
                    text:"Newest",
                    handler:function () {
                        wendler.logList.sortBy('timestamp');
                    }
                }
            ]
        },
        {
            id:'log-list-container',
            xtype:'container',
            layout:'card',
            activeItem:0,
            items:[
                {
                    id:'lift-log-list',
                    listeners:{
                        initialize:function () {
                            wendler.logList.sortAndRefreshList();
                            wendler.components.addSwipeToDelete(this, wendler.logList.showLogEntry,
                                wendler.logList.deleteLogEntry, '.date-week');
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
                        '<span class="date">{[wendler.log.formatDate(values.timestamp)]}</span><span class="disclosure-small"></span>' +
                        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
                        '</tr></tbody></table>'
                },
                {
                    id:'log-assistance-list',
                    listeners:{
                        initialize:function () {
                            wendler.components.addSwipeToDelete(this, Ext.emptyFn, wendler.logList.deleteAssistanceEntry, '.date-week');
                        }
                    },
                    xtype:'list',
                    selectedCls:'',
                    store:wendler.stores.assistance.ActivityLog,
                    itemCls:'lift-log-row',
                    itemTpl:'<table><tbody><tr>' +
                        '<td width="15%">{assistanceType}</td>' +
                        '<td width="25%"><div class="lift-name">{movement}</div><div class="cycle-and-week">Sets: {sets}</div></td>' +
                        '<td width="25%"><div><span class="reps">{reps}x</span> <span class="weight">{weight}</span></div></td>' +
                        '<td width="35%" class="date-week">' +
                        '<span class="date">{[wendler.log.formatDate(values.timestamp)]}</span>' +
                        '</td><td width="40%" class="delete-button-holder hidden"></td>' +
                        '</tr></tbody></table>'
                }
            ]
        }
    ]
};