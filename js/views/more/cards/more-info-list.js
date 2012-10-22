"use strict";
Ext.ns('biglifts.views', 'biglifts.more', 'biglifts.more');
biglifts.more.moreInfoForListItem = function (c, index) {
    Ext.getCmp('more-info-list').deselect(index);
    var handler = biglifts.more.listItems[index].handler;
    if (typeof(handler) !== 'undefined') {
        handler.call();
    }
};

biglifts.more.feedback = function () {
    var proText = biglifts.premium ? " Pro" : "";
    var subject = "Big Lifts" + proText + ": Feedback";
    location.href = util.email.buildEmailLink("biglifts@stefankendall.com", subject
        + biglifts.more.getVersionOsInfo());
};

biglifts.more.selectRoutine = function () {
    Ext.getCmp('app').setActiveItem(Ext.getCmp('first-time-launch'));
};

biglifts.more.getVersionOsInfo = function () {
    var appVersion = "v" + biglifts.version;
    var os = Ext.os.is.Android ? "Android" : "iOS";
    var phoneVersion = window.device.version;
    return appVersion + "-" + os + " " + phoneVersion;
};

biglifts.more.showSettings = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('settings'), {type:'slide', direction:'left'});
};

biglifts.more.hardReset = function () {
    Ext.Msg.confirm('WARNING', 'Reset ALL data and settings?', function (text) {
        if (text === 'yes') {
            util.filebackup.deleteAllStoreFiles();
            localStorage.clear();
            location.href = "index.html";
        }
    });
};

biglifts.more.listItems = [
    {model:{text:'<span class="text">Routine: <span id="routine-text"></span></span><span class="disclosure"></span>'}, handler:biglifts.more.selectRoutine},
    {model:{text:'<span class="text">Settings</span><span class="disclosure"></span>'}, handler:biglifts.more.showSettings},
    {model:{text:'<span class="text">Feedback...</span><span class="disclosure"></span>'}, handler:biglifts.more.feedback},
    {model:{text:'<span class="text">Reset</span><span class="warning"></span>'}, handler:biglifts.more.hardReset}
];
biglifts.more.listData = [];
for (var i = 0; i < biglifts.more.listItems.length; i++) {
    biglifts.more.listData.push(biglifts.more.listItems[i].model);
}

Ext.define('MoreList', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'text', type:'string'}
        ]
    }
});
biglifts.more.listStore = Ext.create('Ext.data.Store', {
    model:'MoreList',
    data:biglifts.more.listData
});

biglifts.views.MoreInfoList = {
    xtype:'panel',
    id:'more-info-list-panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.navigation.unbindBackEvent();
        },
        painted:function () {
            util.withLoadedStore(biglifts.stores.Routine, function () {
                var routine = biglifts.stores.Routine.first().get("name");
                Ext.get('routine-text').setHtml(routine);
            });
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
            store:biglifts.more.listStore,
            listeners:{
                itemtap:biglifts.more.moreInfoForListItem
            }
        }
    ]
};
