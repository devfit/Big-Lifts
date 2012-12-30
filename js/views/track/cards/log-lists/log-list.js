Ext.define('biglifts.views.LogList', {
    extend: 'Ext.Panel',
    changeMovementTypeToLifts: function () {
        this.changeMovementTypeCalled();
        Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('lift-log-list'));
    },
    changeMovementTypeToAssistance: function () {
        this.changeMovementTypeCalled();
        Ext.getCmp('log-list-container').setActiveItem(Ext.getCmp('log-assistance-list'));
    },
    changeMovementTypeCalled: function () {
        this.sortToolbar.hide();
        util.components.toggleVisibility(this.liftMovementTypeButton);
        util.components.toggleVisibility(this.asstMovementTypeButton);
    },
    showChart: function () {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('graph'));
    },
    showSortMenu: function () {
        util.components.toggleVisibility(this.sortToolbar);
    },
    showExportLog: function () {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('export-log'));
    },
    getCycleOptions: function () {
        var liftCycles, assistanceCycles;
        util.withNoFilters(biglifts.stores.LiftLog, function () {
            util.withNoFilters(biglifts.stores.assistance.ActivityLog, function () {
                liftCycles = _.map(biglifts.stores.LiftLog.getRange(), function (record) {
                    return record.get('cycle');
                });

                assistanceCycles = _.map(biglifts.stores.assistance.ActivityLog.getRange(), function (record) {
                    return record.get('cycle');
                });
            });
        });

        var cycles = _.unique(_.union(liftCycles, assistanceCycles));
        cycles = _.sortBy(cycles, function (cycle) {
            return -cycle;
        });
        cycles = _.union(['All'], cycles);

        var options = [];
        _.each(cycles, function (cycle) {
            options.push({value: cycle});
        });

        return options;
    },
    updateCycleOptions: function () {
        Ext.getCmp('log-cycle-select').setOptions(this.getCycleOptions());
    },
    logCycleChanged: function (select, cycle, oldValue) {
        if (oldValue) {
            if (cycle === 'All') {
                biglifts.stores.LiftLog.clearFilter();
                biglifts.stores.assistance.ActivityLog.clearFilter(true);
                biglifts.stores.assistance.ActivityLog.filterOutNoneEntries();
            }
            else {
                biglifts.stores.LiftLog.clearFilter(true);
                biglifts.stores.assistance.ActivityLog.clearFilter(true);
                biglifts.stores.assistance.ActivityLog.filterOutNoneEntries();

                biglifts.stores.LiftLog.filter('cycle', cycle);
                biglifts.stores.assistance.ActivityLog.filter('cycle', cycle);
            }
        }
    },
    config: {
        id: 'log-list',
        layout: 'fit',
        listeners: {
            painted: function () {
                var me = this;
                biglifts.navigation.unbindBackEvent();
                if (!this._painted) {
                    this._painted = true;
                    biglifts.stores.LiftLog.addListener('beforesync', Ext.bind(me.updateCycleOptions, me));
                    biglifts.stores.assistance.ActivityLog.addListener('beforesync', Ext.bind(me.updateCycleOptions, me));
                }
            },
            initialize: function () {
                var me = this;
                me.add([
                    {
                        id: 'showTypeTrackToolbar',
                        docked: 'top',
                        xtype: 'toolbar',
                        title: 'Track',
                        listeners: {
                            initialize: function () {
                                this.add(
                                    {
                                        xtype: 'button',
                                        ui: 'action',
                                        text: 'Sort',
                                        handler: Ext.bind(me.showSortMenu, me)
                                    }
                                );

                                if (biglifts.toggles.Assistance) {
                                    me.asstMovementTypeButton = this.add({
                                        xtype: 'button',
                                        text: 'Asst.',
                                        handler: Ext.bind(me.changeMovementTypeToAssistance, me)
                                    });

                                    me.liftMovementTypeButton = this.add({
                                        hidden: true,
                                        xtype: 'button',
                                        text: 'Lifts',
                                        handler: Ext.bind(me.changeMovementTypeToLifts, me)
                                    });
                                }
                                this.add({xtype: 'spacer'});
                                if (biglifts.toggles.Graphs) {
                                    this.add({
                                        xtype: 'button',
                                        iconCls: 'chart',
                                        iconMask: true,
                                        ui: 'action',
                                        handler: Ext.bind(me.showChart, me)
                                    });
                                }
                                this.add({
                                    cls: 'send-button',
                                    xtype: 'button',
                                    iconMask: true,
                                    iconCls: 'action',
                                    ui: 'action',
                                    handler: Ext.bind(me.showExportLog, me)
                                });
                            }
                        }
                    }
                ]);

                me.sortToolbar = me.add(Ext.create('biglifts.components.SortToolbar'));

                me.add([
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        items: [
                            {xtype: 'spacer'},
                            {
                                id: 'log-cycle-select',
                                name: 'cycle',
                                xtype: 'selectfield',
                                label: 'Cycle',
                                displayField: 'value',
                                valueField: 'value',
                                options: [],
                                listeners: {
                                    change: Ext.bind(me.logCycleChanged, me)
                                }
                            }
                        ],
                        listeners: {
                            initialize: Ext.bind(me.updateCycleOptions, me)
                        }
                    },
                    {
                        id: 'log-list-container',
                        xtype: 'container',
                        layout: 'card',
                        activeItem: 0,
                        items: [
                            Ext.create('biglifts.views.LiftLogList'),
                            Ext.create('biglifts.views.LogAssistanceList')
                        ]
                    }
                ]);
            }
        }
    }
});