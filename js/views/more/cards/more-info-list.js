"use strict";
Ext.ns('wendler.views', 'wendler.controller.more', 'wendler.more');
wendler.controller.more.moreInfoForListItem = function (c, index) {
    Ext.getCmp('more-info-list').deselect(index);
    var handler = wendler.more.listItems[index].handler;
    if (typeof(handler) !== 'undefined') {
        handler.call();
    }
};

wendler.controller.more.suggestFeature = function () {
    location.href = util.email.buildEmailLink("wendler531@stefankendall.com", "Wendler 5/3/1: Suggest a Feature, "
        + wendler.controller.more.getVersionOsInfo());
};

wendler.controller.more.reportProblem = function () {
    location.href = util.email.buildEmailLink("wendler531@stefankendall.com", "Wendler 5/3/1: Report a Problem, " +
        wendler.controller.more.getVersionOsInfo());
};

wendler.controller.more.getVersionOsInfo = function () {
    var appVersion = "v" + wendler.version;
    var os = Ext.os.is.Android ? "Android" : "iOS";
    var phoneVersion = window.device.version;
    return appVersion + "-" + os + " " + phoneVersion;
};

wendler.controller.more.showSettings = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('settings'), {type:'slide', direction:'left'});
};

wendler.controller.more.hardReset = function () {
    Ext.Msg.confirm('WARNING', 'Reset ALL data and settings?', function (text) {
        if (text === 'yes') {
            util.filebackup.deleteAllStoreFiles();

            setTimeout(function () {
                Ext.getCmp('main-tab-panel').add({
                    masked:{
                        xtype:'loadmask',
                        message:'Resetting...'
                    }
                });
            }, 500);

            setTimeout(function () {
                localStorage.clear();
                device.exitApp();
            }, 2000);
        }
    });
};

wendler.more.listItems = [
    {model:{text:'<span class="text">Version</span><span class="version">' + wendler.version + '</span>'}},
    {model:{text:'<span class="text">Settings</span><span class="disclosure"></span>'}, handler:wendler.controller.more.showSettings},
    {model:{text:'<span class="text">Suggest a Feature</span><span class="disclosure"></span>'}, handler:wendler.controller.more.suggestFeature},
    {model:{text:'<span class="text">Report a Problem</span><span class="disclosure"></span>'}, handler:wendler.controller.more.reportProblem},
    {model:{text:'<span class="text">Reset</span><span class="warning"></span>'}, handler:wendler.controller.more.hardReset}
];
wendler.more.listData = [];
for (var i = 0; i < wendler.more.listItems.length; i++) {
    wendler.more.listData.push(wendler.more.listItems[i].model);
}

Ext.define('MoreList', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'text', type:'string'}
        ]
    }
});
wendler.more.listStore = Ext.create('Ext.data.Store', {
    model:'MoreList',
    data:wendler.more.listData
});

wendler.views.MoreInfoList = {
    xtype:'panel',
    id:'more-info-list-panel',
    layout:'fit',
    listeners:{
        show: function(){
            wendler.navigation.resetBack();
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'More'
        },
        {
            id:'more-info-list',
            xtype:'list',
            itemTpl:'{text}',
            itemCls:'more-info-row',
            store:wendler.more.listStore,
            listeners:{
                itemtap:wendler.controller.more.moreInfoForListItem
            }
        }
    ]
};
