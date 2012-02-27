Ext.ns('wendler.views.log.cards', 'wendler.controller.log.export');

wendler.controller.log.export.returnToTrackingList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.controller.log.export.exportLog = function(){

};

wendler.views.log.cards.Export = {
    id:'export-log',
    xtype:'formpanel',
    scroll:'vertical',
    style:'padding-top:0px',
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.controller.log.export.returnToTrackingList);
        }
    },
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Export',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Back',
                    handler:wendler.controller.log.export.returnToTrackingList
                },
                {xtype:'spacer'},
                {
                    xtype:'button',
                    ui: 'confirm',
                    text: 'Send',
                    handler:wendler.controller.log.export.exportLog
                }

            ]
        }
    ],
    items:[
        {
            xtype:'fieldset',
            cls:'fieldset-no-margin',
            items:[
                {
                    name:'email',
                    xtype:'emailfield',
                    label:'Email'
                }
            ]
        }
    ]
};