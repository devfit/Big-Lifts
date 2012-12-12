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
                    store: biglifts.stores.ss.Log,
                    itemTpl: new Ext.XTemplate("<table class='ss-workout'><tbody><tr>" +
                        "<td width='30%' class='name'>{name}</td>" +
                        "<td width='23%'><span class='sets'>{sets}x</span> {reps}</td>" +
                        "<td width='23%'>{weight}{units}</td>" +
                        "<td width='23%' class='timestamp last'>{[this.convertTimestamp(values.timestamp)]}</td>" +
                        "</tr></tbody></table>", {
                        convertTimestamp: function (timestamp) {
                            return new Date(timestamp).toString(biglifts.stores.w.Settings.first().get('dateFormat'));
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