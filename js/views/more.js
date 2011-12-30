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
    location.href = util.email.buildEmailLink("wendler531@stefankendall.com", "Wendler 5/3/1: Suggest a Feature");
};

wendler.controller.more.reportProblem = function () {
    location.href = util.email.buildEmailLink("wendler531@stefankendall.com", "Wendler 5/3/1: Report a Problem");
};

wendler.version = null;
wendler.controller.more.setupVersion = function () {
    if (wendler.version !== null) {
        Ext.get('version').setHTML(wendler.version);
    }

    Ext.util.JSONP.request({
        url:'js/version.json?' + new Date().getTime(),
        callbackKey: 'callback',
        callback:function (response) {
            wendler.version = response.version;
            Ext.get('version').setHTML(response.version);
        }
    });
};

wendler.more.listItems = [
    {model:{text:'<span class="text">Version</span><span id="version"></span>'}},
    {model:{text:'<span class="text">Suggest a Feature</span><span class="disclosure"></span>'}, handler:wendler.controller.more.suggestFeature},
    {model:{text:'<span class="text">Report a Problem</span><span class="disclosure"></span>'}, handler:wendler.controller.more.reportProblem}
];
wendler.more.listData = [];
for (var i = 0; i < wendler.more.listItems.length; i++) {
    wendler.more.listData.push(wendler.more.listItems[i].model);
}

Ext.regModel('MoreList', {
    fields:[
        {name:'text', type:'string'}
    ]
});
wendler.more.listStore = new Ext.data.Store({model:'MoreList', data:wendler.more.listData});

wendler.views.More = Ext.extend(Ext.Panel, {
    id:'more',
    title:'More',
    iconCls:'more',
    dockedItems:[
        {
            xtype:'toolbar',
            title:'More'
        }
    ],
    items:[
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
    ],
    listeners:{
        afterlayout:wendler.controller.more.setupVersion
    }
});

