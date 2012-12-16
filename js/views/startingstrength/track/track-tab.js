Ext.define('biglifts.views.ss.Track', {
    extend: 'Ext.Panel',
    config: {
        id: 'ss-track-tab',
        iconCls: 'bookmarks',
        layout: 'card',
        title: 'Track',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Track'
            }
        ],
        listeners: {
            initialize: function () {
                this.add({
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
            }
        }
    }
});