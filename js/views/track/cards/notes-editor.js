Ext.ns('wendler.views.log.cards');

wendler.views.log.cards.NotesEditor = Ext.extend(Ext.Panel, {
    _returnCallback:function (notes) {
    },
    layout:'fit',
    listeners:{
        beforeshow:function (c) {
            console.log( c );
            window.test = c;
            wendler.navigation.setBackFunction(function () {
                c._returnCallback();
            });
        }
    },
    dockedItems:{
        xtype:'toolbar',
        title:'Notes',
        items:[
            {
                text:'Back',
                ui:'back',
                handler:this._returnCallback
            }
        ]
    },
    fullscreen:true,
    items:[
        {
            xtype:'formpanel',
            bodyPadding:'5px',
            items:[
                {
                    xtype:'fieldset',
                    cls:'notes-form',
                    items:[
                        {
                            xtype:'textareafield',
                            name:'notes',
                            listeners:{
                                afterrender:function (c) {
                                    var parentHeight = c.up('fieldset').getHeight();
                                    c.el.down('textarea').setHeight(parentHeight - 7);
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});