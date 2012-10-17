Ext.ns('biglifts.views.log.cards', 'biglifts.logList');

biglifts.logList.showExportLog = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('export-log'), {type:'slide', direction:'left'});
};

biglifts.logList.showSortMenu = function () {
    util.components.toggleVisibility(Ext.getCmp('track-sort-toolbar'));
    biglifts.logList.updateUiForSortButtons();
};

biglifts.logList.changeMovementTypeCalled = function () {
    Ext.getCmp('track-sort-toolbar').hide();
    util.components.toggleVisibility(Ext.getCmp('track-lifts-movement-type-button'));
    util.components.toggleVisibility(Ext.getCmp('track-assistance-movement-type-button'));
};

biglifts.logList.changeMovementTypeToLifts = function () {
    biglifts.logList.changeMovementTypeCalled();
    Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('lift-log-list'));
};

biglifts.logList.changeMovementTypeToAssistance = function () {
    biglifts.logList.changeMovementTypeCalled();
    Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('log-assistance-list'));
};

biglifts.logList.sortBy = function (selectedProperty) {
    var liftLogSort = biglifts.stores.LiftLogSort.first();
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

    biglifts.logList.updateUiForSortButtons();
    biglifts.logList.sortAndRefreshList();
};

biglifts.logList.updateUiForSortButtons = function () {
    var liftLogSort = biglifts.stores.LiftLogSort.first();

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

    biglifts.logList.updateAscendingText();
};

biglifts.logList.PROPERTY_TO_ASCENDING_TEXT = {
    'liftName':{
        'ASC':'A-Z',
        'DESC':'Z-A'
    },
    'timestamp':{
        'ASC':'Oldest',
        'DESC':'Newest'
    }
};

biglifts.logList.DEFAULT_PROPERTY_ASCENDING = {
    'liftName':'ASC',
    'timestamp':'DESC'
};

biglifts.logList.updateAscendingText = function () {
    var liftLogSort = biglifts.stores.LiftLogSort.first();

    var sortNameButton = Ext.getCmp('sort-name-button');
    var sortNameActiveButton = Ext.getCmp('sort-name-button-active');
    var sortDateButton = Ext.getCmp('sort-date-button');
    var sortDateActiveButton = Ext.getCmp('sort-date-button-active');

    var sortProperty = liftLogSort.data.property;
    var sortDirectionText = liftLogSort.data.ascending ? "ASC" : "DESC";
    if (sortProperty === "liftName") {
        sortNameButton.setText(biglifts.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);
        sortNameActiveButton.setText(biglifts.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);

        var dateText = biglifts.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][biglifts.logList.DEFAULT_PROPERTY_ASCENDING['timestamp']];
        sortDateButton.setText(dateText);
        sortDateActiveButton.setText(dateText);
    }
    else if (sortProperty === "timestamp") {
        sortDateButton.setText(biglifts.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);
        sortDateActiveButton.setText(biglifts.logList.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);

        var liftNameText = biglifts.logList.PROPERTY_TO_ASCENDING_TEXT['liftName'][biglifts.logList.DEFAULT_PROPERTY_ASCENDING['liftName']];
        sortNameButton.setText(liftNameText);
        sortNameActiveButton.setText(liftNameText);
    }
};

biglifts.logList.showChart = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('graph'));
};

biglifts.views.log.cards.LogList = {
    id:'log-list',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.navigation.unbindBackEvent();
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
                            handler:biglifts.logList.showSortMenu
                        }
                    );

                    if (biglifts.toggles.Assistance) {
                        this.add({
                            id:'track-lifts-movement-type-button',
                            xtype:'button',
                            text:'Asst.',
                            handler:biglifts.logList.changeMovementTypeToAssistance
                        });

                        this.add({
                            id:'track-assistance-movement-type-button',
                            hidden:true,
                            xtype:'button',
                            text:'Lifts',
                            handler:biglifts.logList.changeMovementTypeToLifts
                        });
                    }
                    this.add({xtype:'spacer'});
                    if (biglifts.toggles.Graphs) {
                        this.add({
                            id:'show-chart-button',
                            xtype:'button',
                            iconCls:'chart',
                            iconMask:true,
                            ui:'action',
                            handler:biglifts.logList.showChart
                        });
                    }
                    this.add({
                        id:'export-log-button',
                        xtype:'button',
                        iconMask:true,
                        iconCls:'action',
                        ui:'action',
                        handler:biglifts.logList.showExportLog
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
                        biglifts.logList.sortBy('liftName');
                    }
                },
                {
                    id:'sort-name-button-active',
                    hidden:true,
                    ui:'confirm',
                    xtype:'button',
                    text:"A-Z",
                    handler:function () {
                        biglifts.logList.sortBy('liftName');
                    }
                },
                {
                    id:'sort-date-button',
                    ui:'action',
                    xtype:'button',
                    text:"Newest",
                    handler:function () {
                        biglifts.logList.sortBy('timestamp');
                    }
                },
                {
                    id:'sort-date-button-active',
                    hidden:true,
                    ui:'confirm',
                    xtype:'button',
                    text:"Newest",
                    handler:function () {
                        biglifts.logList.sortBy('timestamp');
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
                biglifts.logList.liftLogList,
                biglifts.logList.assistanceList
            ]
        }
    ]
};