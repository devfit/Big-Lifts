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
    Ext.getCmp('app').setActiveItem(Ext.getCmp('routine-chooser'));
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

biglifts.more.showOneRepCalculator = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('one-rep-max-calculator'));
};

biglifts.more.hardReset = function () {
    Ext.Msg.confirm('WARNING', 'Reset ALL data and settings?', function (text) {
        if (text === 'yes') {
            util.filebackup.deleteAllStoreFiles(function () {
                localStorage.clear();
                location.href = "index.html";
            });
        }
    });
};

var listIndex = 0;
biglifts.more.listItems = [
    {model:{index:listIndex++, text:null}, handler:biglifts.more.selectRoutine, textFn:function () {
        return '<span class="text">Routine: <span id="routine-text">' +
            biglifts.stores.Routine.first().get("name") +
            '</span></span><span class="disclosure"></span>';
    }}
];

if (biglifts.toggles.Assistance) {
    biglifts.more.listItems.push({model:{index:listIndex++, text:'<span class="text">1RM Calculator</span><span class="disclosure"></span>'}, handler:biglifts.more.showOneRepCalculator});
}

biglifts.more.listItems.push({model:{index:listIndex++, text:'<span class="text">Settings</span><span class="disclosure"></span>'}, handler:biglifts.more.showSettings});
biglifts.more.listItems.push({model:{index:listIndex++, text:'<span class="text">Feedback...</span><span class="disclosure"></span>'}, handler:biglifts.more.feedback});
biglifts.more.listItems.push({model:{index:listIndex++, text:'<span class="text">Reset</span><span class="warning"></span>'}, handler:biglifts.more.hardReset});

biglifts.more.listData = [];
for (var i = 0; i < biglifts.more.listItems.length; i++) {
    biglifts.more.listData.push(biglifts.more.listItems[i].model);
}

Ext.define('MoreList', {
    extend:'Ext.data.Model',
    config:{
        fields:[
            {name:'index', type:'int'},
            {name:'text', type:'string'}
        ]
    }
});
biglifts.more.listStore = Ext.create('Ext.data.Store', {
    model:'MoreList',
    data:biglifts.more.listData
});

biglifts.more.getTextForValues = function (values) {
    var textFn = biglifts.more.listItems[values.index].textFn;
    return values.text ? values.text : textFn();
};

biglifts.views.MoreInfoList = {
    xtype:'panel',
    id:'more-info-list-panel',
    layout:'fit',
    listeners:{
        painted:function () {
            biglifts.navigation.unbindBackEvent();
            if (!this._painted) {
                this._painted = true;
                this.add({
                    id:'more-info-list',
                    xtype:'list',
                    itemTpl:'{[biglifts.more.getTextForValues(values)]}',
                    itemCls:'more-info-row',
                    store:biglifts.more.listStore,
                    listeners:{
                        itemtap:biglifts.more.moreInfoForListItem
                    }
                });
            }
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'More'
        }
    ]
};
