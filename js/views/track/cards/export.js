Ext.ns('wendler.views.log.cards', 'wendler.controller.log.export');

wendler.controller.log.export.returnToTrackingList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.controller.log.export.exportLog = function () {
    var data = util.filebackup.generateDataFromStore(wendler.stores.LiftLog);
    wendler.controller.log.export.ajaxEmailRequest('stefankendall@gmail.com', data);
};

wendler.controller.log.export.ajaxEmailRequest = function (email, data) {
    var loadingMask = new Ext.LoadMask(Ext.getCmp('export-log').getEl(), {msg:"Exporting..."});
    loadingMask.show();
    Ext.Ajax.request({
        url:'http://wendler.herokuapp.com/email',
        method:'POST',
        params:{
            email:email,
            data:data
        },
        success:function () {
            Ext.Msg.alert("Success", "Email sent!");
            loadingMask.hide();
        },
        failure:function () {
            Ext.Msg.alert("Error", "Error exporting. Please try again later.");
            loadingMask.hide();
        }
    });
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
                    ui:'confirm',
                    text:'Send',
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
                    label:'Email',
                    value:'stefankendall@gmail.com'
                }
            ]
        }
    ]
};