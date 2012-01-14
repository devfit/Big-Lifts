"use strict";
Ext.ns('wendler.views', 'wendler.controller.settings');

wendler.controller.settings.backToMore = function () {
    Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list-panel'), {type:'slide', direction:'right'});
};

wendler.views.Settings = Ext.extend(Ext.Panel, {
    id:'settings',
    iconCls:'settings',
    layout:'card',
    cardSwitchAnimation:'slide',
    listeners: {
      beforeshow: function(){
          wendler.navigation.setBackFunction(wendler.controller.settings.backToMore);
      }
    },
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Settings',
            items:[
                {
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    handler:wendler.controller.settings.backToMore
                }
            ]
        }
    ],
    items:[
        Ext.getCmp('settings-form')
    ]
});