Ext.define('biglifts.views.LogList', {
    extend:'Ext.Panel',
    xtype:'loglist',
    DEFAULT_PROPERTY_ASCENDING:{
        'liftName':'ASC',
        'timestamp':'DESC'
    },
    PROPERTY_TO_ASCENDING_TEXT:{
        'liftName':{
            'ASC':'A-Z',
            'DESC':'Z-A'
        },
        'timestamp':{
            'ASC':'Oldest',
            'DESC':'Newest'
        }
    },
    changeMovementTypeToLifts:function () {
        this.changeMovementTypeCalled();
        Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('lift-log-list'));
    },
    changeMovementTypeToAssistance:function () {
        this.changeMovementTypeCalled();
        Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('log-assistance-list'));
    },
    changeMovementTypeCalled:function () {
        Ext.getCmp('track-sort-toolbar').hide();
        util.components.toggleVisibility(Ext.getCmp('track-lifts-movement-type-button'));
        util.components.toggleVisibility(Ext.getCmp('track-assistance-movement-type-button'));
    },
    showChart:function () {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('graph'));
    },
    showSortMenu:function () {
        util.components.toggleVisibility(Ext.getCmp('track-sort-toolbar'));
        this.updateUiForSortButtons();
    },
    showExportLog:function () {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('export-log'), {type:'slide', direction:'left'});
    },
    updateUiForSortButtons:function () {
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

        this.updateAscendingText();
    },
    updateAscendingText:function () {
        var liftLogSort = biglifts.stores.LiftLogSort.first();

        var sortNameButton = Ext.getCmp('sort-name-button');
        var sortNameActiveButton = Ext.getCmp('sort-name-button-active');
        var sortDateButton = Ext.getCmp('sort-date-button');
        var sortDateActiveButton = Ext.getCmp('sort-date-button-active');

        var sortProperty = liftLogSort.data.property;
        var sortDirectionText = liftLogSort.data.ascending ? "ASC" : "DESC";
        if (sortProperty === "liftName") {
            sortNameButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);
            sortNameActiveButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);

            var dateText = this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][this.DEFAULT_PROPERTY_ASCENDING['timestamp']];
            sortDateButton.setText(dateText);
            sortDateActiveButton.setText(dateText);
        }
        else if (sortProperty === "timestamp") {
            sortDateButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);
            sortDateActiveButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);

            var liftNameText = this.PROPERTY_TO_ASCENDING_TEXT['liftName'][this.DEFAULT_PROPERTY_ASCENDING['liftName']];
            sortNameButton.setText(liftNameText);
            sortNameActiveButton.setText(liftNameText);
        }
    },
    sortBy:function (selectedProperty) {
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
        biglifts.stores.LiftLogSort.sync();
    },
    updateCycleOptions:function () {
        var cycles = _.unique(_.map(biglifts.stores.LiftLog.getRange(), function (record) {
            return record.get('cycle');
        }));
        cycles = _.union(['All'], cycles);

        var options = [];
        _.each(cycles, function (cycle) {
            options.push({value:cycle});
        });
        this.down('[name="cycle"]').setOptions(options);
    },
    config:{
        layout:'fit',
        listeners:{
            show:function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize:function () {
                var me = this;
                me.add([
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
                                        handler:Ext.bind(me.showSortMenu, me)
                                    }
                                );

                                if (biglifts.toggles.Assistance) {
                                    this.add({
                                        id:'track-lifts-movement-type-button',
                                        xtype:'button',
                                        text:'Asst.',
                                        handler:Ext.bind(me.changeMovementTypeToAssistance, me)
                                    });

                                    this.add({
                                        id:'track-assistance-movement-type-button',
                                        hidden:true,
                                        xtype:'button',
                                        text:'Lifts',
                                        handler:Ext.bind(me.changeMovementTypeToLifts, me)
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
                                        handler:Ext.bind(me.showChart, me)
                                    });
                                }
                                this.add({
                                    id:'export-log-button',
                                    xtype:'button',
                                    iconMask:true,
                                    iconCls:'action',
                                    ui:'action',
                                    handler:Ext.bind(me.showExportLog, me)
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
                                    me.sortBy('liftName');
                                }
                            },
                            {
                                id:'sort-name-button-active',
                                hidden:true,
                                ui:'confirm',
                                xtype:'button',
                                text:"A-Z",
                                handler:function () {
                                    me.sortBy('liftName');
                                }
                            },
                            {
                                id:'sort-date-button',
                                ui:'action',
                                xtype:'button',
                                text:"Newest",
                                handler:function () {
                                    me.sortBy('timestamp');
                                }
                            },
                            {
                                id:'sort-date-button-active',
                                hidden:true,
                                ui:'confirm',
                                xtype:'button',
                                text:"Newest",
                                handler:function () {
                                    me.sortBy('timestamp');
                                }
                            }
                        ]
                    },
                    {
                        xtype:'toolbar',
                        docked:'bottom',
                        items:[
                            {xtype:'spacer'},
                            {
                                name:'cycle',
                                xtype:'selectfield',
                                label:'Cycle',
                                displayField:'value',
                                valueField:'value',
                                options:[]
                            }
                        ],
                        listeners:{
                            initialize:function () {
                                me.updateCycleOptions.call(this);
                            }
                        }
                    },
                    {
                        id:'log-list-container',
                        xtype:'container',
                        layout:'card',
                        activeItem:0,
                        items:[
                            {
                                xtype:'liftloglist'
                            },
                            biglifts.logList.assistanceList
                        ]
                    }
                ]);
            }
        }
    }
});

biglifts.stores.LiftLogSort.addListener('beforesync', function () {
    if (Ext.getCmp('log-list')) {
        Ext.getCmp('log-list').updateUiForSortButtons();
        biglifts.logList.sortAndRefreshList();
    }
});

biglifts.stores.LiftLog.addListener('beforesync', function () {
    if (Ext.getCmp('log-list')) {
        Ext.getCmp('log-list').updateCycleOptions();
    }
});

biglifts.views.log.cards.LogList = {
    xtype:'loglist',
    id:'log-list'
};