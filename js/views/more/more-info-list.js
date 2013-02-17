Ext.define('biglifts.views.MoreInfoList', {
    extend: "Ext.dataview.List",
    selectRoutine: function () {
        Ext.getCmp('app').setActiveItem(Ext.getCmp('setup'));
    },
    getVersionOsInfo: function () {
        var appVersion = "v" + biglifts.version;
        var os = Ext.os.is.Android ? "Android" : "iOS";
        var phoneVersion = window.device.version;
        var routine = biglifts.stores.Routine.first().get('name');
        return appVersion + "-" + os + " " + routine + " " + phoneVersion;
    },
    feedback: function () {
        var proText = biglifts.premium ? " Pro" : "";
        var subject = "Big Lifts" + proText + ": Feedback";
        location.href = util.email.buildEmailLink("biglifts@stefankendall.com", subject + " " + this.getVersionOsInfo());
    },
    listItemTapped: function (c, index) {
        this.deselect(index);
        var handler = this.listItems[index].handler;
        if (typeof(handler) !== 'undefined') {
            handler.call();
        }
    },
    showReset: function () {
        this.getParent().showReset();
    },
    config: {
        itemCls: 'more-info-row',
        listeners: {
            painted: function () {
                biglifts.navigation.unbindBackEvent();
            }
        },
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'More'
            }
        ]
    }
});