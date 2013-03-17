Ext.define('biglifts.views.ss.Track', {
    extend: 'Ext.Panel',
    showSortMenu: function () {
        util.components.toggleVisibility(this.sortToolbar);
    },
    sortLifts: function (sortProperty, sortDirection) {
        biglifts.stores.LiftLog.sort(sortProperty, sortDirection);
        this.logList.refresh();
    },
    sortAndRefreshList: function () {
        var liftLogSort = biglifts.stores.LogSort.first();
        var sortDirection = liftLogSort.get('ascending') ? 'ASC' : 'DESC';
        var sortProperty = liftLogSort.get('property');
        this.sortLifts(sortProperty, sortDirection);
    },
    refreshLoglist: function () {
        this.logList.refresh();
    },
    deleteEntry: function (dataview, index, item, e) {
        var combinedLog = biglifts.stores.ss.CombinedLog.getAt(index);
        var logs = JSON.parse(combinedLog.get('logs'));

        _.each(logs, function (log_id) {
            var logStore = biglifts.stores.ss.Log;
            logStore.remove(logStore.findRecord('id', log_id));
        });
        biglifts.stores.ss.Log.sync();
    },
    bindListeners: function () {
        biglifts.stores.ss.CombinedLog.addListener('beforesync', this.sortAndRefreshList, this);
        biglifts.stores.LogSort.addListener('beforesync', this.sortAndRefreshList, this);
        biglifts.stores.w.Settings.addListener('beforesync', this.refreshLoglist, this);
    },
    destroyListeners: function () {
        biglifts.stores.ss.CombinedLog.removeListener('beforesync', this.sortAndRefreshList, this);
        biglifts.stores.LogSort.removeListener('beforesync', this.sortAndRefreshList, this);
        biglifts.stores.w.Settings.removeListener('beforesync', this.refreshLoglist, this);
    },
    config: {
        id: 'ss-track-tab',
        iconCls: 'bookmarks',
        layout: 'card',
        title: 'Track',
        listeners: {
            initialize: function () {
                var me = this;
                this.topToolbar = this.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: 'Track',
                    items: [
                        {
                            xtype: 'button',
                            ui: 'action',
                            text: 'Sort',
                            handler: Ext.bind(this.showSortMenu, this)
                        }
                    ]
                });

                this.sortToolbar = this.add(Ext.create('biglifts.components.SortToolbar', {alphaEnabled: false}));

                this.logList = this.add({
                    xtype: 'list',
                    store: biglifts.stores.ss.CombinedLog,
                    itemTpl: new Ext.XTemplate("<div class='{[this.getSyncedClass(values)]}'><table class='ss-workout'><tbody>" +
                        "{[this.buildRowsForWorkout(values)]}" +
                        "</tbody></table></div>", {
                        buildRowsForWorkout: function (values) {
                            var convertTimestamp = function (timestamp) {
                                return new Date(timestamp).toString(biglifts.stores.w.Settings.first().get('dateFormat'));
                            };

                            biglifts.stores.ss.Log.filter('workout_id', values.workout_id);
                            var rows = "";
                            var i = 0;
                            biglifts.stores.ss.Log.each(function (r) {
                                var timeStampColumn = i == 1 ?
                                    "<td width='30%' class='timestamp last'>" + convertTimestamp(r.get('timestamp')) + "</td>" : "";

                                var deleteColumn = i == 1 ? '<td width="30%" class="delete-button-holder hidden"></td>' : "";

                                rows += "<tr>" +
                                    "<td width='30%' class='name'>" + r.get('name') + "</td>" +
                                    "<td width='20%'><span class='sets'>" + r.get('sets') + "x</span> " + r.get('reps') + "</td>" +
                                    "<td width='20%'>" + r.get('weight') + r.get('units') + "</td>" +
                                    timeStampColumn + deleteColumn +
                                    "</tr>";
                                i++;
                            });
                            biglifts.stores.ss.Log.clearFilter();
                            return rows;
                        },
                        getSyncedClass: function (values) {
                            biglifts.stores.ss.Log.filter('workout_id', values.workout_id);
                            var synced = true;
                            biglifts.stores.ss.Log.each(function (r) {
                                synced = synced && r.get('synced');
                            });
                            biglifts.stores.ss.Log.clearFilter();
                            return synced ? "synced" : "unsynced";
                        }
                    }),
                    listeners: {
                        painted: function () {
                            biglifts.components.addSwipeToDelete(this, Ext.emptyFn, me.deleteEntry, Ext.emptyFn, '.timestamp');
                        }
                    }
                });

                this.setActiveItem(0);
            },
            painted: function () {
                biglifts.navigation.unbindBackEvent();

                if (!this._painted) {
                    this._painted = true;
                    this.sortAndRefreshList();
                    this.bindListeners();
                }
            },
            destroy: function () {
                this.destroyListeners();
            }
        }
    }
});