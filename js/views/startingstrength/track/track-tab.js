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
    bindListeners: function () {
        biglifts.stores.ss.Log.addListener('beforesync', this.sortAndRefreshList, this);
        biglifts.stores.LogSort.addListener('beforesync', this.sortAndRefreshList, this);
        biglifts.stores.w.Settings.addListener('beforesync', this.refreshLoglist, this);
    },
    destroyListeners: function () {
        biglifts.stores.ss.Log.removeListener('beforesync', this.sortAndRefreshList, this);
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
                    itemTpl: new Ext.XTemplate("<table class='ss-workout'><tbody>" +
                        "{[this.buildRowsForWorkout(values)]}" +
                        "</tbody></table>", {
                        buildRowsForWorkout: function (values) {
                            var convertTimestamp = function (timestamp) {
                                return new Date(timestamp).toString(biglifts.stores.w.Settings.first().get('dateFormat'));
                            };

                            biglifts.stores.ss.Log.filter('workout_id', values.workout_id);
                            var rows = "";
                            var i = 0;
                            biglifts.stores.ss.Log.each(function (r) {
                                var timeStampColumn = "<td width='23%' class='timestamp last'>";
                                timeStampColumn += i == 1 ? convertTimestamp(r.get('timestamp')) : "";
                                timeStampColumn += "</td>";
                                rows += "<tr>" +
                                    "<td width='30%' class='name'>" + r.get('name') + "</td>" +
                                    "<td width='23%'><span class='sets'>" + r.get('sets') + "x</span> " + r.get('reps') + "</td>" +
                                    "<td width='23%'>" + r.get('weight') + r.get('units') + "</td>" +
                                    timeStampColumn +
                                    "</tr>";
                                i++;
                            });
                            biglifts.stores.ss.Log.clearFilter();

                            return rows;
                        }
                    })
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