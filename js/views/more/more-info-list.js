Ext.define('biglifts.views.MoreInfoList', {
    extend:"Ext.dataview.List",
    selectRoutine:function () {
        Ext.getCmp('app').setActiveItem(Ext.getCmp('routine-chooser'));
    },
    getVersionOsInfo:function () {
        var appVersion = "v" + biglifts.version;
        var os = Ext.os.is.Android ? "Android" : "iOS";
        var phoneVersion = window.device.version;
        return appVersion + "-" + os + " " + phoneVersion;
    },
    feedback:function () {
        var proText = biglifts.premium ? " Pro" : "";
        var subject = "Big Lifts" + proText + ": Feedback";
        location.href = util.email.buildEmailLink("biglifts@stefankendall.com", subject
            + this.getVersionOsInfo());
    },
    listItemTapped:function (c, index) {
        this.deselect(index);
        var handler = this.listItems[index].handler;
        if (typeof(handler) !== 'undefined') {
            handler.call();
        }
    },
    hardReset:function () {
        Ext.Msg.confirm('WARNING', 'Reset ALL data and settings?', function (text) {
            if (text === 'yes') {
                util.filebackup.deleteAllStoreFiles(function () {
                    localStorage.clear();
                    location.href = "index.html";
                });
            }
        });
    },
    config:{
        itemCls:'more-info-row',
        listeners:{
            painted:function () {
                biglifts.navigation.unbindBackEvent();
            }
        },
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                title:'More'
            }
        ]
    }
});