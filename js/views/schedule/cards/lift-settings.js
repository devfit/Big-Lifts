Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftSettings');
wendler.controller.liftSettings.returnToLiftSelectFromSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'up'});
};

wendler.controller.liftSettings.optionButtonPressed = function (option) {
    Ext.Msg.confirm('Are you sure?', 'This will overwrite any manual percentage changes', function(response){
        if( response === 'yes' ){
            util.mask.doWithMask('Loading...', function(){
                var optionIndex = option - 1;
                wendler.stores.lifts.LiftProgression.each(function (c) {
                    wendler.stores.lifts.LiftProgression.remove(c);
                });

                wendler.stores.lifts.LiftProgression.add(wendler.liftProgressions.options[optionIndex]);
                wendler.stores.lifts.LiftProgression.sync();
            });
        }
    });
};

wendler.views.liftSchedule.LiftSettings = {
    id:'lift-settings',
    xtype:'panel',
    bodyPadding:5,
    items:[
        {
            html:'The Wendler 5/3/1 book offers two working-set progression options'
        },
        {
            xtype:'panel',
            layout:'hbox',
            bodyPadding:0,
            defaults:{
                bodyPadding:3,
                flex:1
            },
            items:[
                {
                    html:'<div class="example-percentages">' +
                        '<table>' +
                        '<thead><tr><th>Wk</th><th>%</th></tr></thead>' +
                        '<tbody class="example-percentages-table">' +
                        '<tr><td>1</td><td>65, 75, 85</td></tr>' +
                        '<tr><td>2</td><td>70, 80, 90</td></tr>' +
                        '<tr><td>3</td><td>75, 85, 95</td></tr>' +
                        '<tr><td>4</td><td>40, 50, 60</td></tr></tbody>' +
                        '</table>' +
                        '</div>'
                },
                {
                    html:'<div class="example-percentages">' +
                        '<table>' +
                        '<thead><tr><th>Wk</th><th>%</th></tr></thead>' +
                        '<tbody class="example-percentages-table">' +
                        '<tr><td>1</td><td>75, 80, 85</td></tr>' +
                        '<tr><td>2</td><td>80, 85, 90</td></tr>' +
                        '<tr><td>3</td><td>75, 85, 95</td></tr>' +
                        '<tr><td>4</td><td>40, 50, 60</td></tr></tbody>' +
                        '</table>' +
                        '</div>'
                }
            ]
        },
        {
            xtype:'panel',
            layout:'hbox',
            height:50,
            defaults:{
                xtype:'panel',
                flex:1,
                bodyPadding:3
            },
            items:[
                {
                    items:[
                        {
                            xtype:'button',
                            text:'Option 1',
                            handler:function () {
                                wendler.controller.liftSettings.optionButtonPressed(1);
                            }
                        }
                    ]
                },
                {
                    items:[
                        {
                            xtype:'button',
                            text:'Option 2',
                            handler:function () {
                                wendler.controller.liftSettings.optionButtonPressed(2);
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype:'panel',
            bodyPadding:3,
            items:[
                {
                    xtype:'button',
                    ui:'decline',
                    text:'Manual'
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Config',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.controller.liftSettings.returnToLiftSelectFromSettings
                }
            ]
        }
    ]
};