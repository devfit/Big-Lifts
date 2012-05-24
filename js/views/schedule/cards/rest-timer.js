Ext.ns('wendler.views.liftSchedule', 'wendler.restTimer.controller');
wendler.restTimer.controller.returnToLiftTemplate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
};

wendler.views.liftSchedule.RestTimer = {
    id:'rest-timer',
    xtype:'panel',
    layout: 'fit',
    items:[
        {
            xtype:'toolbar',
            title:'Rest',
            docked:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.restTimer.controller.returnToLiftTemplate
                }
            ]
        },
        {
            xtype:'container',
            cls:'rest-timer-panel',
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[
                {
                    xtype:'container',
                    flex:1,
                    layout: 'vbox',
                    items:[
                        {
                            html:'Minutes',
                            padding:'3 5'
                        },
                        {
                            xtype:'container',
                            layout:{
                                type:'hbox'
                            },
                            defaults:{
                                width:'20%',
                                ui:'action'
                            },
                            listeners:{
                                initialize:function () {
                                    for (var minute = 1; minute <= 5; minute++) {
                                        var button = {
                                            xtype:'button',
                                            padding:'10 0',
                                            ui:'action',
                                            width:'100%',
                                            text:minute
                                        };

                                        var buttonContainer = {
                                            xtype:'container',
                                            padding:'0 5 5 5',
                                            items:[button]
                                        };

                                        this.add(buttonContainer);
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype:'panel',
                    flex:1,
                    padding:'0 5',
                    html:'<div class="rest-timer-time">0:00</div>'
                }
            ]
        }
    ]
};