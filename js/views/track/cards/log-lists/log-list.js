Ext.ns('wendler.views.log.cards', 'wendler.logList');

wendler.logList.showExportLog = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('export-log'), {type:'slide', direction:'left'});
};

wendler.logList.showSortMenu = function () {
    util.components.toggleVisibility(Ext.getCmp('track-sort-toolbar'));
    wendler.logList.updateUiForSortButtons();
};

wendler.logList.changeMovementTypeCalled = function () {
    Ext.getCmp('track-sort-toolbar').hide();
    util.components.toggleVisibility(Ext.getCmp('track-lifts-movement-type-button'));
    util.components.toggleVisibility(Ext.getCmp('track-assistance-movement-type-button'));
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

wendler.logList.showChart = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('graph'));
};

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
                    if (wendler.toggles.Graphs) {
                        this.add({
                            id:'show-chart-button',
                            xtype:'button',
                            iconCls:'chart',
                            iconMask:true,
                            ui:'action',
                            handler:wendler.logList.showChart
                        });
                    }
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
                wendler.logList.liftLogList,
                wendler.logList.assistanceList
            ]
        }
    ]
};