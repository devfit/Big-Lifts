"use strict";
Ext.ns('wendler.views', 'wendler.controller.more', 'wendler.more');

wendler.controller.more.moreInfoForListItem = function (c, index) {
    wendler.more.listItems[index].handler.call();
};

wendler.controller.more.suggestFeature = function () {
    location.href = util.email.buildEmailLink("wendler531@stefankendall.com", "Wendler 5/3/1: Suggest a Feature");
};

wendler.controller.more.reportProblem = function () {
    location.href = util.email.buildEmailLink("wendler531@stefankendall.com", "Wendler 5/3/1: Report a Problem");
};

wendler.more.listItems = [
    {model:{text:'Suggest a Feature'}, handler:wendler.controller.more.suggestFeature},
    {model:{text:'Report a Problem'}, handler:wendler.controller.more.reportProblem}
];
Ext.regModel('MoreList', {
    fields:[
        {name:'text', type:'string'}
    ]
});
wendler.more.listStore = new Ext.data.Store(
    {model:'MoreList',
        data:[
            wendler.more.listItems[0].model,
            wendler.more.listItems[1].model
        ]
    });

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
            xtype:'list',
            itemTpl:'{text}',
            onItemDisclosure:true,
            store:wendler.more.listStore,
            listeners:{
                itemtap:wendler.controller.more.moreInfoForListItem
            }
        }
    ]
});

