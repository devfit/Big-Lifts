Ext.ns('wendler.maxes.barSetup', 'wendler.maxes.controller');

wendler.maxes.barSetup.backButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
};

wendler.maxes.barSetup.BarSetup = {
    xtype:'panel',
    id:'bar-plate-setup-panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.maxes.barSetup.backButtonPressed);
        }
    },
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Bar/Plates",
            items:[
                {
                    id:'bar-setup-back-button',
                    text:'Back',
                    handler:wendler.maxes.barSetup.backButtonPressed,
                    ui:'back'
                }
            ]
        },
        {
            xtype:'formpanel',
            id:'bar-setup-form',
            items:[
                {
                    xtype:'fieldset',
                    style:'margin-top: 0',
                    defaults:{
                        autoCapitalize:false,
                        autoCorrect:false,
                        autoComplete:false,
                        labelWidth:'50%'
                    },
                    items:[
                        {
                            xtype:'numberfield',
                            name:'barWeight',
                            label:'Bar Weight'
                        }
                    ]
                },
                {
                    xtype:'fieldset',
                    cls:'fieldset-title-no-margin',
                    style:'margin-top: 0',
                    title:'Plates',
                    defaults:{
                        autoCapitalize:false,
                        autoCorrect:false,
                        autoComplete:false,
                        labelWidth:'50%'
                    },
                    listeners:{
                        initialize:function () {
                            this.add(
                                {
                                    xtype:'numberfield',
                                    name:'bar3Weight',
                                    label:'Bar3Weight'
                                }
                            );
                        }
                    }
                }
            ]
        }
    ]
};